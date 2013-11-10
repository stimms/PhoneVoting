exports.list = function(req, res){
    res.send([{name: "poll one"}, {name: "poll two"}]);
};