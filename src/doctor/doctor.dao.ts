import * as knex from "knex";

export const createDoctor = (db: knex, record: any) => {
    return db.table('doctor').insert(record).returning("doctor");
};

export const updateDoctor = (db: knex, doctorId: number, record: any) => {
    return db.table('doctor').update(record).where("doctor", doctorId);
};

export const getAllDoctors = (db: knex) => {
    return db.select("*").from("doctor");
};

export const getDoctor = (db: knex, doctorId: number) => {
    return db.select("*").from("doctor").where("doctor", doctorId);
};
