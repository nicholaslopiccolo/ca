//mongosh 'mongodb+srv://cluster0.6xusc.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority' --tlsCertificateKeyFile E:\progetti\NodeJS\controllo-alimentare\back\X509-cert-5745468912406390787.pem
//Mongo Connection credentials
const CONNECTION_URL = process.env.CONNECTION_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(CONNECTION_URL);

let _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, client) {
            if(err){console.log(err)}
            _db = client.db(DATABASE_NAME);
            console.log('Connected to database: ' + DATABASE_NAME);
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};