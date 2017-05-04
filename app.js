var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
app.listen(3000, function(){
    console.log('app rodando');

});

load('infra', {cwd : 'app'})
    .then('routes')
    .then('model')
    .into(app);