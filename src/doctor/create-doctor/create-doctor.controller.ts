import * as express from 'express';
import * as knex from 'knex';
import RouteController from "../../route-controller.interface";

import { createDoctor } from "./create-doctor.dao";

class CreateDoctorController implements RouteController {
    public router = express.Router({mergeParams: true});
    public db: knex;
    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post("/", this.createDoctor);       
    }

    createDoctor = async (request: express.Request, response: express.Response) => {
        const doctor = request.body;
        const doctorId = await createDoctor(this.db, doctor);
        return response.status(201).send({recordId: doctorId[0]});
    }



}

export default CreateDoctorController;