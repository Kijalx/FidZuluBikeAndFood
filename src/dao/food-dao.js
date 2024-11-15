
const Food = require('../model/food');
const dbUtils = require('./db-utils')
class FoodDao {
    constructor(connectionProvider) {  
        this.connectionProvider = connectionProvider;
    }

    async queryForAllFood(loc){
        const sql = `
            select name, brand, weight, calories, price 
              from food
        `;
        const foods = [];

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
            const food = new Food(row.NAME, row.BRAND, row.WEIGHT, row.CALORIES, parseFloat((row.PRICE * multi).toFixed(2)));
            foods.push(food);
        }

        await rs.close();
        return foods;
    }
}

module.exports = FoodDao;