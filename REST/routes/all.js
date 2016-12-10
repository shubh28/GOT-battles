var con = require('../config');
module.exports = function(app){
	app.get('/start',function(req,res){
	    var query = "SELECT * FROM battles"
	    con.query(query,function(err,rows){
	        if(err) throw err;
	        else{ 
	            res.status(200).json(rows);
	        }
	    });
	});
}