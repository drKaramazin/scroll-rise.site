declare var LIB_PATH: string | undefined;

import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Sticky Platforms Scene: move motion test (short)', 'should have correct X, Y coords in changing X');
  import(`${LIB_PATH}/../../../scroll-rise/src/specs/move/sps-move-short.spec.ts`);
});