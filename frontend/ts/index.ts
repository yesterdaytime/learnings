


const testing = ['Testing', 'Testing1'] as const;

type testingType = typeof testing[number]


const testingObj = {
    a: 'Testing2',
    b: 'Testing3',
} as const;

type testingObjKeyType = keyof typeof testingObj;
type testingObjValType = typeof testingObj[keyof typeof testingObj];


