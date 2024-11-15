const axios = require('axios');
const dbUtils = require('../../src/dao/db-utils');

const foods = require('../testjson/Foodjson.json');
const fs = require('fs');
function applyMultiplier(foods, location) {
    let multiplier;
    switch(location){
        case 'IE':
            multiplier = 1.23;
            break;
        case 'US-NC':
            multiplier = 1.08;
            break;
        case 'IN':
            multiplier = 1.18;
            break;
        default:
            throw Error("Invalid location " + loc);
    }
    return foods.map(food => ({
        ...food,
        price: parseFloat((parseFloat(food.price) * multiplier).toFixed(2))
    }));
}
describe("RESTful controller integration tests for Foods", () => {
    const url = 'http://localhost:3032/food/all/';
    const location = 'IE'
    let baseUrl = ''
    beforeEach(async () => {
        await initDb();
        baseUrl = url + location;
    })

    async function initDb(){
        const stmts = [
            "delete from food",
            "INSERT INTO food VALUES ('The Original Sandwich', 'Oreo', '303g', 405, 2.85)",
            "INSERT INTO food VALUES ('Peanut Butter', 'KRAFT', '2000g', 726, 9.39)",
            "INSERT INTO food VALUES ('Beef Ravioli', 'Chef Boyardee', '425g', 250, 2.45)",
            "INSERT INTO food VALUES ('Medium Cheddar Cheese', 'MOON CHEESE', '57g', 525, 5.87)"
        ];
        await dbUtils.executeDml(stmts);
    }

    describe("retrieve all foods",() => {
        it("succeeds", async () => {
            const rowCount = await dbUtils.countRowsInTable('food');

            const response = await axios.get(baseUrl);
            const expectedFoods = applyMultiplier(foods, location);
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.length).toEqual(rowCount);
            expect(response.data).toEqual(expectedFoods);
        })

        it("fails", async () => {
            const rowCount = await dbUtils.countRowsInTable('food');
            const response = null;
            try{
                response = await axios.get('http://localhost:3032/food/all/abc');
            }catch(axiosError){
                expect(axiosError.response.status).toBe(500);
                expect(response).toBeFalsy();
            }
        })
    })
})