import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: size motion test', 'should have a correct size in changing width');
  import('../../../../scroll-rise/src/specs/sps-size.motion.spec');
});