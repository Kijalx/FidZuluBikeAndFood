const FoodRestController = require('../../src/service/food-controller');

console.error = arg => {}

const testFood = require('../testjson/Foodjson.json')

describe('RESTful controller unit tests for Food operations:', () => {
    let controller;
    let mockDao;
    let mockHttpResponse;
    let mockTransactionManager;

    beforeEach(() => {
        mockDao = jasmine.createSpyObj('mockDao', ['queryForAllFood']);

        mockTransactionManager = jasmine.createSpyObj('mockTransactionManager',['startTransaction', 'commitTransaction', 'rollbackTransaction']);

        controller = new FoodRestController();
        controller.foodDao = mockDao;
        controller.TransactionManager = mockTransactionManager;
        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);
        mockHttpResponse.status.and.returnValue(mockHttpResponse);
    });

    describe('retrieve all food', () => {
        it('succeeds', async () => {
            mockDao.queryForAllFood.and.returnValue(testFood);
            const req = { params: { location: 'ie' } };

            await controller.getAllFoods(req, mockHttpResponse);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testFood);
        });

        it('fails due to a DAO exception', async () => {
            mockDao.queryForAllFood.and.throwError('error');
            const req = { params: { location: 'ie' } };

            await controller.getAllFoods(req, mockHttpResponse);
                
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });
    describe('retrieve team', () => {
        it('succeeds', async () => {
            const req = {};
            const res = { teamName: 'Group 2', members: [ 'Agata', 'Alessio', 'Aleks' ] };
            await controller.getTeam(req, mockHttpResponse);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(res);
        });
    });
})