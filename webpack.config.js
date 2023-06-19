const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require('path');
const fs = require('fs');

const pages = [
  {
    name: '4-seasons-example',
    template: 'examples/4-seasons-example/4-seasons-example.html',
    ts: 'examples/4-seasons-example/4-seasons-example.ts',
  },
  {
    name: 'earth-demo',
    template: 'examples/earth-demo/earth-demo.html',
    ts: 'examples/earth-demo/earth-demo.ts',
  },
  {
    name: 'sps-simple-demo',
    template: 'examples/sps-simple-demo/sps-simple-demo.html',
    ts: 'examples/sps-simple-demo/sps-simple-demo.ts',
  },
  {
    name: 'fixed-actors-scene-demo',
    template: 'examples/fixed-actors-scene-demo/fixed-actors-scene-demo.html',
    ts: 'examples/fixed-actors-scene-demo/fixed-actors-scene-demo.ts',
  },
  {
    name: 'fas-offset-demo',
    template: 'examples/fas-offset-demo/fas-offset-demo.html',
    ts: 'examples/fas-offset-demo/fas-offset-demo.ts',
  },
  {
    name: 'sticky-platform-scene-demo',
    template: 'examples/sticky-platform-scene-demo/sticky-platform-scene-demo.html',
    ts: 'examples/sticky-platform-scene-demo/sticky-platform-scene-demo.ts',
  },
];

const specsPath = path.resolve(__dirname, 'src', 'generated', 'spec-wrappers');
const specs = fs.readdirSync(specsPath);

function entries() {
  let entries = pages.reduce((acc, page) => {
    acc[page.name] = path.resolve(__dirname, 'src', 'docs', page.ts);
    return acc;
  }, {});
  entries.index = path.resolve(__dirname, 'src', 'docs', 'main.ts');

  entries = {
    ...entries,
    ...specs.reduce((acc, spec) => {
      acc[spec] = path.resolve(specsPath, spec);
      return acc;
    }, {}),
  };

  return entries;
}

function htmlPlugins() {
  let htmlPlugins = pages.map(entry => new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'docs', entry.template),
    filename: `${entry.name}.html`,
    chunks: [entry.name],
    scriptLoading: 'module',
  }));

  htmlPlugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'docs', 'index.mustache'),
    filename: 'index.html',
    chunks: ['index'],
    scriptLoading: 'module',
    inject: 'body',
  }));

  htmlPlugins = [
    ...htmlPlugins,
    ...specs.map(spec => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'spec-examples-generator', 'spec.html'),
      filename: `${spec}.html`,
      chunks: [spec],
      scriptLoading: 'module',
      title: spec,
    })),
  ];

  return htmlPlugins;
}

module.exports = env => ({
  entry: entries(),
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      }],
      test: /\.ts?$/,
      exclude: /node_modules/,
    }, {
      test: /index\.mustache$/,
      loader: 'mustache-loader',
      options: {
        tiny: true,
        render: {
          specs: specs.map(fileName => {
            const label = fileName.replaceAll('-', ' ');
            return {
              fileName,
              label: label.slice(-3) === '.ts' ? label.slice(0, -3) : label,
            };
          }),
        },
      },
    }],
  },
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'site'),
  },
  plugins: [
    ...htmlPlugins(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'docs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, env['lib-path'], 'scroll-rise', 'src', 'specs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'src', 'docs', 'assets'), to: 'assets' },
      ],
    }),
    new webpack.DefinePlugin({
      LIB_PATH: JSON.stringify(env['lib-path']),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src', 'docs'),
    },
    compress: false,
    port: 9000,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    outputModule: true,
  },
});
