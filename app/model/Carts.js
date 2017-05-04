function Carts(connection) {
    this._connection = connection;
}

Carts.prototype.findById = function(id, callback){
    this._connection.query('select * from carts where id = ?', [id], callback);
}

Carts.prototype.findCartItensById = function (id, callback) {
    this._connection.query('select * from items where cart_id = ? ', [id], callback);
}

Carts.prototype.cartsCount = function(callback) {
    this._connection.query('select count(*) as count from carts', callback);
}

Carts.prototype.create = function(cart, callback) {
    var data = [[cart.id, cart.client, cart.total]];
    this._connection.query('insert into carts(id, client_name, total) values (?)', data, function(err, results) {
        if(err) {
            throw err;
        }
        var itemData = [[cart.id, cart.product.id, cart.product.price]];
        console.log(itemData);
        this._connection.query('insert into items(cart_id, product_id, product_value) values (?)', itemData, callback);
    });
}

Carts.prototype.update = function(cart, callback) {

    var data = [{ total: cart.total }, { id: cart.id }];
    this._connection.query('update carts set total = ? where id = ?', data, callback);
}   

module.exports = function(){
    return Carts;
};