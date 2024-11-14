const axios = require('axios');
const dbUtils = require('../../src/dao/db-utils');

const bikes = require('../testjson/Bikejson.json');

describe("RESTful controller integration tests for Bikes", () => {
    const baseUrl = 'http://localhost:3031/bikes';

    beforeEach(async () => {
        await initDb();
    })

    async function initDb(){
        const stmts = [
            "delete from bike",
            "INSERT INTO bike VALUES ('Mamba Sport 12\" Balance Bike', 'Mamba Bikes', 'black', '75.88')",
            "INSERT INTO bike VALUES ('DJ Fat Bike 500W', 'DJ Bikes', 'grey', '1599.86')",
            "INSERT INTO bike VALUES ('Kobe Aluminum Balance', 'Kobe', 'blue', '88.56')",
        ];
        await dbUtils.executeDml(stmts);
    }
})