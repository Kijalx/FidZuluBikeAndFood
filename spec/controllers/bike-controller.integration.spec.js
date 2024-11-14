const axios = require('axios');
const dbUtils = require('../../src/dao/db-utils');

const bikes = require('../testjson/Bikejson.json');
let bikesLocation;
const location = 'ie';
const fs = require('fs');
function changeLocation(){
    const fileContents = fs.readFileSync(bikes, 'utf-8');
    let multi;
    this.bikesLocation = JSON.parse(fileContents);
    switch(location){
        case 'ie':
            multi = 1.23;
            break;
        case 'us-nc':
            multi = 1.08;
            break;
        case 'india':
            multi = 1.18;
            break;
        default:
            throw Error("Invalid location " + loc);
    }
    while () {
        const bike = new Bike(row.NAME, row.BRAND, row.COLOR, parseFloat((row.PRICE * multi).toFixed(2)));
        bikes.push(bike);
    }
}

describe("RESTful controller integration tests for Bikes", () => {
    const url = 'http://localhost:3031/bikes/all/';
    
    let baseUrl = '';
    beforeEach(async () => {
        await initDb();
        baseUrl = url + location;
        changeLocation();
    })

    async function initDb(){
        const stmts = [
            "delete from bike",
            "INSERT INTO bike VALUES ('Mamba Sport 12\" Balance Bike', 'Mamba Bikes', 'black', '75.88')",
            "INSERT INTO bike VALUES ('Kobe Aluminum Balance', 'Kobe', 'blue', '88.56')",
            "INSERT INTO bike VALUES ('Pomona Men\s Cruiser Bike', 'Northwoods', 'silver', '221.36')",
            "INSERT INTO bike VALUES ('DJ Fat Bike 500W', 'DJ Bikes', 'grey', '1599.86')"
        ];
        await dbUtils.executeDml(stmts);
    }

    describe("retrieve all bikes",() => {
        it("succeeds", async () => {
            const rowCount = await dbUtils.countRowsInTable('bike');

            const response = await axios.get(baseUrl);

            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.length).toEqual(rowCount);
            expect(response.data).toEqual(bikes);
        })
    })
})