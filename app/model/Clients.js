function Clients(connection) {
    this._connection = connection;
}

Clients.prototype.findByName = function(name, callback){
    this._connection.query('select * from clients where name = ?', [name], callback);
}

module.exports = function(){
    return Clients;
};