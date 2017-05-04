module.exports = function(app) {
    app.post('/addItem', function(request, response){
        console.log(request.body);
        prepareCheckout(app, request, response);            
    });
}

function prepareCheckout(app, request, response) {
    var connection = new app.infra.ConnectionFactory();
    var products = new app.model.Products(connection);
    products.findAll(function(err, results){
        if(err) {
            console.log(err);
            throw err;
        }
        console.log('Products: ' + results);
        applyPricing(app, connection, results, request, response);
    });
}

function applyPricing(app, connection, products, request, response) {
    var pricingRules = new app.model.PricingRules(connection);
    var client = request.body.client;
    console.log(products);
    var selectedProduct; 
    products.map(function(value){ 
        console.log('MAP' + value.id);
        if(request.body.product == value.id){
            selectedProduct = value;
        }
    });

    pricingRules.findByClient(client, function(err, results) {
        if(err){
            console.log(err);
            throw err;
        }
        if(results) {
            createOrUpdateCart(app, selectedProduct, results, client, connection, request, response);    
        } 
        
    });
}


function createOrUpdateCart(app, product, pricingRules, client, connection, request, response) {
    console.log(request.body);
    var cartId = request.body.cartId;
    var carts = new app.model.Carts(connection);    
    var cart = null;
    if(cartId) {
        carts.findCartItensById(cartId, function(err, results) {
            if(err){
                throw err;
            }
            var total = product.price;
            results.map(function(value){
                total+= value.product_value;
            });
            console.log('TOTAL: ' + total);            
            cart = {
                id: cartId,
                product: product,
                total: total
            };
            carts.update()
        });    
    } else {
        carts.cartsCount(function(err, results) {
            if(err) {
                console.log(err);
                throw err;
            }
            if(results.length > 0) {
                var cartId = results[0].count + 1;
                cart = {
                    id: cartId,
                    client: client,
                    product: product,
                    total: product.price
                 };
                 console.log(product);
                 carts.create(cart, function(err, results){
                     if(err){
                         console.log(err);
                        throw err;
                     }
                     response.send(cart);
                     response.end();
                     connection.end();    
                 });
            } else {
                throw new Error();
            }
              
        });

    }

}