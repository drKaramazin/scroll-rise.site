declare var LIB_PATH: string | undefined;

import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: move motion test (short)', 'should have correct X, Y coords in changing Y');
  import(`${LIB_PATH}/../../../scroll-rise/src/specs/move/fas-move-short.spec.ts`);
});