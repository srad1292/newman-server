import * as express from 'express';
import * as knex from 'knex';

import { createSymptom, updateSymptom, getAllSymptoms, getSymptom } from "./symptom.dao";

class SymptomController {
    public path = "/symptom";
    public router = express.Router();
    public db: knex;

    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post("/", this.createSymptom);
        this.router.put("/:symptomId", this.updateSymptom);
        this.router.get("/:visitId", this.getAllSymptoms);
        this.router.get("/:symptomId", this.getSymptom);
        
    }

    createSymptom = async (request: express.Request, response: express.Response) => {
        const symptom = request.body;
        const symptomId = await createSymptom(this.db, symptom);
        return response.status(201).send({recordId: symptomId[0]});
    }

    updateSymptom = async (request: express.Request, response: express.Response) => {
        const symptomId = +request.params.symptomId;
        const symptom = request.body;
        
        await updateSymptom(this.db, symptomId, symptom);
        return response.status(200).send();
    }

    getAllSymptoms = async (request: express.Request, response: express.Response) => {
        const visitId = +request.params.visitId;
        const symptoms = await getAllSymptoms(this.db, visitId);
        const status = symptoms && symptoms.length ? 200 : 204;
        return response.status(status).send(symptoms || []);
    }

    getSymptom = async (request: express.Request, response: express.Response) => {
        const symptomId: number = +request.params.symptomId;
        const symptom = await getSymptom(this.db, symptomId);
        if(symptom && symptom.length) {
            return response.status(200).send(symptom[0]);
        }

        return response.status(404).send();
        
    }

}

export default SymptomController;