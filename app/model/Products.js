function Products(connection) {
    this._connection = connection;
}

Products.prototype.findAll = function(callback){
    this._connection.query('select * from products', callback);
}

module.exports = function(){
    return Products;
};