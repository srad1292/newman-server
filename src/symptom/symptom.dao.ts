import * as knex from "knex";

export const createSymptom = (db: knex, record: any) => {
    return db.table('symptom').insert(record).returning("symptom");
};

export const updateSymptom = (db: knex, symptomId: number, record: any) => {
    return db.table('symptom').update(record).where("symptom", symptomId);
};

export const getAllSymptoms = (db: knex, visitId: number) => {
    return db
    .select("symptom.*", "dp.id as duration_id", "dp.name as duration_period")
    .from("symptom")
    .leftJoin("duration_period as dp", "dp.id", "symptom.duration_period")
    .where("symptom.visit", visitId)
    .orderBy("symptom.created_on", "desc");
};

export const getSymptom = (db: knex, symptomId: number) => {
    return db
    .select("*", "dp.id as duration_id", "dp.name as duration_period")
    .from("symptom")
    .leftJoin("duration_period as dp", "dp.id", "symptom.duration_period")
    .where("symptom", symptomId);
};
