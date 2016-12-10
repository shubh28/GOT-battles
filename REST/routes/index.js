module.exports = function(app){
	require('./tags')(app);
	require('./kings')(app);
	require('./battles')(app);
	require('./all')(app);
};