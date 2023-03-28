import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: move motion test', 'should have a correct X, Y coords in changing Y');
  import('../../../../scroll-rise/src/specs/sps-move.motion.spec');
});