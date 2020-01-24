import * as knex from "knex";

export const createVisit = (db: knex, record: any) => {
    return db.table('visit').insert(record).returning("visit");
};

export const updateVisit = (db: knex, visitId: number, record: any) => {
    return db.table('visit').update(record).where("visit", visitId);
};

export const getAllVisits = (db: knex, patientId: number) => {
    return db
    .select("*")
    .from("visit")
    .where("patient", patientId)
    .orderBy("created_on", "desc");
};

export const getVisit = (db: knex, visitId: number) => {
    return db.select("*").from("visit").where("visit", visitId);
};
