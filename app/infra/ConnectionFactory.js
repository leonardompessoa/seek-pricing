var mysql = require('mysql');
var  fs = require('fs');

function createDbConnection() {
    var connectionProperties = JSON.parse(fs.readFileSync('connection.json'));
    console.log(connectionProperties);
    var connection = mysql.createConnection(connectionProperties);
    return connection;
}

module.exports = function() {
    return createDbConnection;
}

