
const Bike = require('../model/bike');
const dbUtils = require('./db-utils')
class BikeDao {
    constructor(connectionProvider) {  
        this.connectionProvider = connectionProvider;
    }

    async queryForAllBike(loc){
        const sql = `
            select name, brand, color, price 
              from bike
             order by price
        `;
        const bikes = [];

        const result = await this.connectionProvider.connection.execute(sql, {}, dbUtils.executeOpts);
        const rs = result.resultSet;
        let multi;
        let row;
        switch(loc){
            case 'IE':
                multi = 1.23;
                break;
            case 'US-NC':
                multi = 1.08;
                break;
            case 'INDIA':
                multi = 1.18;
                break;
            default:
                throw Error("Invalid location " + loc);
        }
        while ((row = await rs.getRow())) {
            const bike = new Bike(row.NAME, row.BRAND, row.COLOR, parseFloat((row.PRICE * multi).toFixed(2)));
            bikes.push(bike);
        }

        await rs.close();
        return bikes;
    }
}

module.exports = BikeDao;