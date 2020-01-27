import * as knex from "knex";

export const createDoctor = (db: knex, record: any) => {
    return db.table('doctor').insert(record).returning("doctor");
};
