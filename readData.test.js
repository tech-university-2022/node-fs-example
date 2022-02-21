
const fileSystem = require('./readData');
describe('fileReader function', () => {
        it('should give the fruits and vegetables file content in object', async()=> {
            const file = await fileSystem.fileReader();
            obj={fruits: [ 'mango', 'banana', 'orange', 'apple' ],
                vegetables: [
                'carrot',
                'beans',
                'potato',
                'spinach',
                'brocolli',
                'capsicum',
                'beetroot'
                ]
            }
            expect(file).toStrictEqual(obj);
        });
        it('should only give the fruits and vegetables file content with the specific firstLetter in object', async()=> {
            const file = await fileSystem.fileReader('a');
            obj={fruits: ['apple' ],
                vegetables: []
            }
            expect(file).toStrictEqual(obj);
        });
});

describe('fileReader function', () => {
    it('should give the fruits and vegetables file content in object', async()=> {
        const file = await fileSystem.appendFiles('./seed/beverages.txt','tea','hot chocolate','coffee');
        const beverages=[ 'tea', 'hot chocolate', 'coffee' ]
        let beverageData=await fileSystem.getData('./seed/beverages.txt')
        expect(beverageData).toStrictEqual(beverages);
    });
    
});

describe('removeC function', () => {
    it('should give the vegetables starting with letters other than c', async()=> {
        const file = await fileSystem.removeC('./seed/vegetables.txt');
        const vegetables={
            vegetables: [
              'carrot',
              'beans',
              'potato',
              'spinach',
              'brocolli',
              'capsicum',
              'beetroot'
            ]
          }
        let vegetableData=await fileSystem.getData('./seed/vegetables.txt')
        expect(vegetableData).toStrictEqual(vegetables);
    });
    
});
// ./node_modules/.bin/jest.cmd ./readData.test.js