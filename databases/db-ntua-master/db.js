const mysql = require('mysql');
const config = require('./config/dbConfig')

// Actual connection
const db = mysql.createConnection(config.conn_bundle)

const query = (sql,bind ,res) => {
    db.query(sql,bind, (err, result) => {
        if (err) {
            res.status(500).send()
        };
        console.log(result)
        if (result.length > 0){
            res.status(200).send(result)
        }
        else 
            res.status(404).send()
   });
}

const queryEmpty = (sql,bind ,res) => {
    db.query(sql,bind, (err, result) => {
        if (err) {
            res.status(500).send()
        };
        console.log(result)
        if (result){
            res.status(200).send(result)
        }
   });
}

module.exports = {db , query, queryEmpty};

