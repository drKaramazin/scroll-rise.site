import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: opacity motion test', 'should have a correct opacity');
  import('../../../../scroll-rise/src/specs/fas-opacity.motion.spec');
});