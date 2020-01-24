

let knex = require('knex')({
    client: 'pg',
    searchPath: ['public', 'newman'],
    connection: {
      host : 'localhost',
      port : '5432',
      user : 'postgres',
      password : 'mcbrother1292',
      database : 'postgres'
    }
});

getDoctors();


// const db = require('knex')(knex(configOptions));

async function getDoctors() {
    const doctors = await knex.select("*").from("doctor");
    console.log(doctors);
}