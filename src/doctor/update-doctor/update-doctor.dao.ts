import * as knex from "knex";

export const updateDoctor = (db: knex, doctorId: number, record: any) => {
    return db.table('doctor').update(record).where("doctor", doctorId);
};
