const express = require('express');

const TransactionManager = require('../dao/transaction-manager');
const BikeDao = require('../dao/bike-dao')


class BikeRestController{
    constructor() { 
        this.port = process.env.PORT || 3031;
        this.onlyDigitsRegExp = /^\d+$/;

        this.app = express();
        // Configure Express to populate a request body from JSON input
        this.app.use(express.json());


        // this.app.use(cors());

        const router = express.Router();
        router.get('/bikes/all/:location', this.getAllBikes.bind(this));
        router.get('/bikes/team', this.getTeam.bind(this));
        // router.get('/bikes/:location/:name', this.getBike.bind(this));
        // router.post('/widgets', this.addWidget.bind(this));
        // router.put('/widgets', this.updateWidget.bind(this));
        // router.delete('/widgets/:id', this.deleteWidget.bind(this));

        this.app.use('/', router);

        this.transactionManager = new TransactionManager();
        this.bikeDao = new BikeDao(this.transactionManager);
    }

    start() {
        this.app.listen(this.port, 
            () => console.log(`Service for product CRUD operations listening on port ${this.port}`))
    }

    async getAllBikes(req, res) {
        const location = req.params.location.toUpperCase();
        console.log(location);
        try {
            await this.transactionManager.startTransaction();

            const bikes = await this.bikeDao.queryForAllBike(location);

            res.json(bikes);
        }
        catch (err) {
            console.error(`error on GET bikes: ${err}`);
            res.status(500).json({error: err});
        }
        finally {
            await this.transactionManager.rollbackTransaction();
        }
    }
    async getTeam(req, res) {
        const team = {
            teamName: "Your Team Name",
            members: ["Member1", "Member2", "Member3"]
        };
        res.json(team);
    }
}
module.exports = BikeRestController;

if (require.main === module) {
    const controller = new BikeRestController();
    controller.start();
}
