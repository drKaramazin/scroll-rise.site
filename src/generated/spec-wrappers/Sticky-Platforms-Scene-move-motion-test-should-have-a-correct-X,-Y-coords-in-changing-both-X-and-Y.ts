declare var LIB_PATH: string | undefined;

import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: move motion test', 'should have a correct X, Y coords in changing both X and Y');
  import(`${LIB_PATH}/../../../scroll-rise/src/specs/sps-move.motion.spec`);
});