const express = require('express');

const TransactionManager = require('../dao/transaction-manager');
const FoodDao = require('../dao/food-dao')


class FoodRestController{
    constructor() { 
        this.port = process.env.PORT || 3032;
        this.onlyDigitsRegExp = /^\d+$/;

        this.app = express();
        // Configure Express to populate a request body from JSON input
        this.app.use(express.json());


        // this.app.use(cors());

        const router = express.Router();
        router.get('/foods/all/:location', this.getAllFoods.bind(this));
        router.get('/foods/team', this.getTeam.bind(this));
        // router.get('/foods/:location/:name', this.getfood.bind(this));
        // router.post('/widgets', this.addWidget.bind(this));
        // router.put('/widgets', this.updateWidget.bind(this));
        // router.delete('/widgets/:id', this.deleteWidget.bind(this));

        this.app.use('/', router);

        this.transactionManager = new TransactionManager();
        this.foodDao = new FoodDao(this.transactionManager);
    }

    start() {
        this.app.listen(this.port, 
            () => console.log(`Service for product CRUD operations listening on port ${this.port}`))
    }

    async getAllFoods(req, res) {
        const location = req.params.location.toUpperCase();
        console.log(location);
        try {
            await this.transactionManager.startTransaction();

            const foods = await this.foodDao.queryForAllFood(location);

            res.json(foods);
        }
        catch (err) {
            console.error(`error on GET foods: ${err}`);
            res.status(500).json({error: err});
        }
        finally {
            await this.transactionManager.rollbackTransaction();
        }
    }
    async getTeam(req, res) {
        const team = {
            teamName: "Group 2",
            members: ["Agata", "Alessio", "Aleks"]
        };
        res.json(team);
    }
}
module.exports = FoodRestController;

if (require.main === module) {
    const controller = new FoodRestController();
    controller.start();
}
