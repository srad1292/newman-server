import * as express from 'express';
import * as knex from 'knex';

import { createDoctor, updateDoctor, getAllDoctors, getDoctor } from "./doctor.dao";

class DoctorController {
    public path = "/doctor";
    public router = express.Router();
    public db: knex;

    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post("/", this.createDoctor);
        this.router.put("/:doctorId", this.updateDoctor);
        this.router.get("/", this.getAllDoctors);
        this.router.get("/:doctorId", this.getDoctor);
        
    }

    createDoctor = async (request: express.Request, response: express.Response) => {
        const doctor = request.body;
        const doctorId = await createDoctor(this.db, doctor);
        return response.status(201).send({recordId: doctorId[0]});
    }

    updateDoctor = async (request: express.Request, response: express.Response) => {
        const doctorId = +request.params.doctorId;
        const doctor = request.body;
        
        await updateDoctor(this.db, doctorId, doctor);
        return response.status(200).send();
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

export default DoctorController;