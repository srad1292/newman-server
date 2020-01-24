import * as express from 'express';
import * as knex from 'knex';

import { createVisit, updateVisit, getAllVisits, getVisit } from "./visit.dao";

class VisitController {
    public path = "/visit";
    public router = express.Router();
    public db: knex;

    constructor(db: any) {
        this.db = db;
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post("/", this.createVisit);
        this.router.put("/:visitId", this.updateVisit);
        this.router.get("/:patientId", this.getAllVisits);
        this.router.get("/:visitId", this.getVisit);
        
    }

    createVisit = async (request: express.Request, response: express.Response) => {
        const visit = request.body;
        const visitId = await createVisit(this.db, visit);
        return response.status(201).send({recordId: visitId[0]});
    }

    updateVisit = async (request: express.Request, response: express.Response) => {
        const visitId = +request.params.visitId;
        const visit = request.body;
        
        await updateVisit(this.db, visitId, visit);
        return response.status(200).send();
    }

    getAllVisits = async (request: express.Request, response: express.Response) => {
        const patientId = +request.params.patientId;
        const visits = await getAllVisits(this.db, patientId);
        const status = visits && visits.length ? 200 : 204;
        return response.status(status).send(visits || []);
    }

    getVisit = async (request: express.Request, response: express.Response) => {
        const visitId: number = +request.params.visitId;
        const visit = await getVisit(this.db, visitId);
        if(visit && visit.length) {
            return response.status(200).send(visit[0]);
        }

        return response.status(404).send();
        
    }

}

export default VisitController;