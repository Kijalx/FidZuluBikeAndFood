const BikeRestController = require('../../src/service/bike-controller');

console.error = arg => {}

const testBike = require('../testjson/Bikejson.json')


describe('RESTful controller unit tests for Bike operations:', () => {
    let controller;
    let mockDao;
    let mockHttpResponse;
    let mockTransactionManager;

    beforeEach(() => {
        mockDao = jasmine.createSpyObj('mockDao', ['queryForAllBike']);

        mockTransactionManager = jasmine.createSpyObj('mockTransactionManager',['startTransaction', 'commitTransaction', 'rollbackTransaction']);

        controller = new BikeRestController();
        controller.bikeDao = mockDao;
        controller.TransactionManager = mockTransactionManager;
        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);
        mockHttpResponse.status.and.returnValue(mockHttpResponse);
    });

    describe('retrieve all bikes', () => {
        it('succeeds', async () => {
            mockDao.queryForAllBike.and.returnValue(testBike);
            const req = { params: { location: 'ie' } };

            await controller.getAllBikes(req, mockHttpResponse);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testBike);
        });

        it('fails due to a DAO exception', async () => {
            mockDao.queryForAllBike.and.throwError('error');
            const req = { params: { location: 'ie' } };

            await controller.getAllBikes(req, mockHttpResponse);
                
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