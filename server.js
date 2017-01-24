var express = require('express');
var app = express();
var path = require('path');

var __projectRoot = __dirname + '/';

app.use(express.static(__projectRoot));

app.get('*', function(req, res) {
    if(req.url.split('.').length === 1){
        res.sendFile(path.join(__projectRoot + '/index.html'));
    } else {
        res.sendFile(path.join(__projectRoot + req.url));
    }
});

app.listen(process.env.NODE_ENV || 8089);