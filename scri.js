


require('dotenv').config();

const { 
    DATABASE,
    SCHEMA,
    DB_USERNAME,
    PORT,
    PASSWORD
} = process.env;

console.log({ 
    DATABASE,
    SCHEMA,
    DB_USERNAME,
    PORT,
    PASSWORD
} );

let knex = require('knex')({
    client: 'pg',
    searchPath: ['public', SCHEMA],
    connection: {
      host : 'localhost',
      port : PORT,
      user : DB_USERNAME,
      password : PASSWORD,
      database : DATABASE
    }
});

// let knex2 = require('knex')({
//     client: 'pg',
//     searchPath: ['public', 'newman'],
//     connection: {
//       host : 'localhost',
//       port : '5432',
//       user : 'postgres',
//       password : 'mcbrother1292',
//       database : 'postgres'
//     }
// });

// const db = require('knex')(knex(configOptions));


async function main() {
    await getDoctors();
    // await createTables();
    // await fdciMigrations();
    process.exit(); 
}


async function getDoctors() {
    const doctors = await knex.select("*").from("doctor");
    console.log(doctors);
}

main(); 
