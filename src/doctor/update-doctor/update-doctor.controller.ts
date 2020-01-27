import * as express from 'express';
import * as knex from 'knex';
import RouteController from "../../route-controller.interface"; 

import { updateDoctor } from "./update-doctor.dao";

class UpdateDoctorController implements RouteController{
    public router: express.Router = express.Router({mergeParams: true});
    public db: knex;
    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.put("/:doctorId", this.updateDoctor);     
    }


    updateDoctor = async (request: express.Request, response: express.Response) => {
        const doctorId = +request.params.doctorId;
        const doctor = request.body;
        
        await updateDoctor(this.db, doctorId, doctor);
        return response.status(200).send();
    }

}

export default UpdateDoctorController;