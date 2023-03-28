import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: move motion test', 'should have a correct X, Y coords in changing Y');
  import('../../../../scroll-rise/src/specs/fas-move.motion.spec');
});