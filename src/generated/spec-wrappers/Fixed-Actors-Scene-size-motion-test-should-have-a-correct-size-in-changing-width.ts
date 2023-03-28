import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: size motion test', 'should have a correct size in changing width');
  import('../../../../scroll-rise/src/specs/fas-size.motion.spec');
});