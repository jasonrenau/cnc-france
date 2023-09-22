// recuperation de la librairie pg
const { Pool } = require('pg');

// creation d'une instance de pool
const pool = new Pool({ ssl: process.env.NODE_ENV === 'production' });

// export de la methode query du pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
