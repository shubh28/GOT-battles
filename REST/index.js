var express = require('express');
var app= express();
var router = express.Router();
var morgan = require('morgan');

var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods',    'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type,Authorization");
    if (req.method == 'OPTIONS') {
        res.status(200);
        res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
        res.end();
    } else {
        next();
    }
});
require('./routes')(app);

app.get('/',function(req,res){
    res.status(200).json({message:"all started"});
});

app.listen(port,function(){
	console.log('Magic Happens at port '+port);	
});
