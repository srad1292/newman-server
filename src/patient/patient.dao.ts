import * as knex from "knex";

export const createPatient = (db: knex, record: any) => {
    return db.table('patient').insert(record).returning("patient");
};

export const updatePatient = (db: knex, patientId: number, record: any) => {
    return db.table('patient').update(record).where("patient", patientId);
};

export const getAllPatients = (db: knex) => {
    return db.select("*").from("patient");
};

export const getPatient = (db: knex, patientId: number) => {
    return db.select("*").from("patient").where("patient", patientId);
};
