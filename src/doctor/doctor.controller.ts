import * as express from 'express';
import * as knex from 'knex';

import GetDoctorController from "./get-doctor/get-doctor.controller";
import CreateDoctorController from "./create-doctor/create-doctor.controller";
import UpdateDoctorController from "./update-doctor/update-doctor.controller";


class DoctorController {
    public path = "/doctor";
    public router = express.Router();
    public db: knex;
    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        [
            new GetDoctorController(this.db),
            new CreateDoctorController(this.db),
            new UpdateDoctorController(this.db)
        ].forEach((controller: any) => {
            this.router.use("/", controller.router);
        });
    }


}

export default DoctorController;