import * as express from 'express';
import * as knex from 'knex';
import RouteController from "../../route-controller.interface";

import { getAllDoctors, getDoctor } from "../doctor.dao";

class GetDoctorController implements RouteController {
    public router = express.Router({mergeParams: true});
    public db: knex;

    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get("/", this.getAllDoctors);
        this.router.get("/:doctorId", this.getDoctor);        
    }

    getAllDoctors = async (request: express.Request, response: express.Response) => {
        const doctors = await getAllDoctors(this.db);
        const status = doctors && doctors.length ? 200 : 204;
        return response.status(status).send(doctors || []);
    }

    getDoctor = async (request: express.Request, response: express.Response) => {
        const doctorId: number = +request.params.doctorId;
        const doctor = await getDoctor(this.db, doctorId);
        if(doctor && doctor.length) {
            return response.status(200).send(doctor[0]);
        }

        return response.status(404).send();
        
    }

}

export default GetDoctorController;