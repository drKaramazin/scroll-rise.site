declare var LIB_PATH: string | undefined;

import('../../spec-examples-generator/spec-jit-proxy').then((proxy) => {
  proxy.runTest('Fixed Actors Scene: offset test (short)', 'should have correct X, Y coords in changing both X and Y');
  import(`${LIB_PATH}/../../../scroll-rise/src/specs/offset/fas-offset-short.spec.ts`);
});