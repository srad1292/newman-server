import * as express from 'express';
import * as knex from 'knex';

import { createPatient, updatePatient, getAllPatients, getPatient } from "./patient.dao";

class PatientController {
    public path = "/patient";
    public router = express.Router();
    public db: knex;

    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post("/", this.createPatient);
        this.router.put("/:patientId", this.updatePatient);
        this.router.get("/", this.getAllPatients);
        this.router.get("/:patientId", this.getPatient);
        
    }

    createPatient = async (request: express.Request, response: express.Response) => {
        const patient = request.body;
        const patientId = await createPatient(this.db, patient);
        return response.status(201).send({recordId: patientId[0]});
    }

    updatePatient = async (request: express.Request, response: express.Response) => {
        const patientId = +request.params.patientId;
        const patient = request.body;
        
        await updatePatient(this.db, patientId, patient);
        return response.status(200).send();
    }

    getAllPatients = async (request: express.Request, response: express.Response) => {
        const patients = await getAllPatients(this.db);
        const status = patients && patients.length ? 200 : 204;
        return response.status(status).send(patients || []);
    }

    getPatient = async (request: express.Request, response: express.Response) => {
        const patientId: number = +request.params.patientId;
        const patient = await getPatient(this.db, patientId);
        if(patient && patient.length) {
            return response.status(200).send(patient[0]);
        }

        return response.status(404).send();
        
    }

}

export default PatientController;