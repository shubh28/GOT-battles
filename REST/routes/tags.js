var con = require('../config');
var _ = require('lodash');
module.exports = function(app){
    app.get('/battles/filter/tags',function(req,res){
    var query = "SELECT battle_type FROM battles";
    con.query(query,function(err,rows){
        if(err) throw err;
        else{
            //res.json(rows);
            var tags = []; 
            rows.map(key=>{
                tags.push(key.battle_type);
            })
            tags = _.uniqWith(tags, _.isEqual);
            res.status(200).json(tags);
        }
    });
});
}