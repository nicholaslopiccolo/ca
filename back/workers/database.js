const DB_CONF = require('./base_dati').DB_CONF

const { Pool } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool(DB_CONF)

module.exports = {
    query: (sql, values, callback) => {
      const start = Date.now()
      return pool.query(sql, values,(err, res) => {
        const duration = Date.now() - start
        console.log('executed query', { sql, duration })
        callback(err, res)
      })
    }
}