
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', env: process.env.NODE_ENV});
};