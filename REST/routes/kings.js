var con = require('../config');
var _ = require('lodash');

module.exports = function(app){
app.get('/kings',function(req,res){
    var query = "SELECT attacker_king,defender_king from battles"
    con.query(query,function(err,rows){
        if(err) throw err;
        else{ 
            //console.log(rows.length);
            var attacker_king = [];
            var defender_king = [];
            rows.map(function(key){
                attacker_king.push(key.attacker_king);
                defender_king.push(key.defender_king);
            });

            attacker_king = _.uniqWith(attacker_king, _.isEqual);
            defender_king = _.uniqWith(defender_king, _.isEqual);
            var kings = [];
            kings = _.without(_.union(attacker_king,defender_king),'');
            var kingData = [];
            for (var i=0 ;i<kings.length;i++){
                var img ;
                if(kings[i] === 'Joffrey/Tommen Baratheon'){
                    img = "http://vignette3.wikia.nocookie.net/gameofthrones/images/4/4c/JoffreyBaratheon-Profile.PNG/revision/latest?cb=20160626094917";
                }
                else if(kings[i] === 'Robb Stark'){
                    img = "http://assets.viewers-guide.hbo.com/larges2-ep1-people-profilepic-stark-robb-800x800.jpg";
                }
                else if(kings[i] === 'Balon/Euron Greyjoy'){
                    img = "http://got2016.nocompany1458150561.netdna-cdn.com/People/balon-greyjoy-d400.jpg"
                }
                else if(kings[i] === 'Stannis Baratheon'){
                    img = "http://data1.ibtimes.co.in/cache-img-0-450/en/full/574343/1433940375_game-thrones.png"
                }
                else if(kings[i] === 'Renly Baratheon'){
                    img = "https://www.gameofthronesquote.com/images/renly-baratheon/renly-baratheon-jzt.jpg";
                }
                else if(kings[i] === "Mance Rayder"){
                    img = "http://assets.viewers-guide.hbo.com/larges3-ep1-people-profilepic-rayder-mance-800x800.jpg";
                }
                kingData.push({name:kings[i],img_url:img});
            }
            res.status(200).json(kingData);
        }
    });
});

}