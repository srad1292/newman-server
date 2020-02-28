import * as knex from "knex";

export const getAllDoctors = (db: knex) => {
    return db.select("*").from("doctor");
};

export const getDoctor = (db: knex, doctorId: number) => {
    return db.select("*").from("doctor").where("doctor", doctorId);
};
