var connect = require('connect');
var serveStatic = require('serve-static');
var port = normalizePort(process.env.PORT || '3002');
connect().use(serveStatic(__dirname)).listen(port, function(){
    console.log('Server running on 8080...');
});