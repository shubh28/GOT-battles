var con = require('../config');
var _ = require('lodash');

module.exports = function(app){
	app.get('/battles/:name',function(req,res){
    var name = req.params.name;
    var query = "SELECT name,attacker_king,defender_king,location,region,battle_type,attacker_outcome,attacker_size,defender_size,attacker_commander,defender_commander FROM battles WHERE attacker_king LIKE '%"+name+"%' OR defender_king LIKE '%"+name+"%'";
    con.query(query,function(err,rows){
        if(err) throw err;
        else{
            if(_.includes(rows[0].attacker_king,name)){
                name = rows[0].attacker_king
            }
            else if(_.includes(rows[0].defender_king,name)){
                name = rows[0].defender_king
            }
            rows.map(function(key){
                if(key.attacker_king === name && key.attacker_outcome == "win"){
                    key.outcome = "won";
                }
                else if(key.attacker_king === name && key.attacker_outcome == "loss"){
                    key.outcome = "loss";   
                }
                else if(key.defender_king === name && key.attacker_outcome == "win"){
                    key.outcome = 'loss';
                }
                else if(key.defender_king === name && key.attacker_outcome == "loss"){
                    key.outcome = 'won';
                }
            });
            res.status(200).json(rows);
        }
    });
});
}