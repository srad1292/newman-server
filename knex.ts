import knex from "knex";
import * as pg from './knexfile';

const env = 'development';
const configOptions = pg[env];
const db: knex = knex(configOptions);
export default db;