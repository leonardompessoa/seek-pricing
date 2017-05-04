function PricingRules(connection) {
    this._connection = connection;
}

PricingRules.prototype.findByClient = function(clientName, callback){
    this._connection.query('select a.* from pricing_rules as a inner join clients as b on a.client_id = b.id where b.name = ?', [clientName], callback);
}

module.exports = function() { return PricingRules};