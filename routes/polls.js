var _und = require('underscore');
exports.list = function(req, res){
    var azure= require('azure');
//    var tableService = azure.createTableService();
//    tableService.createTableIfNotExists('polls', function(error){
//        if(!error){
//            var poll = {
//                PartitionKey : 'polls',
//                RowKey : '1',
//                Name: 'Rails Models vs. ASP.net MVC Models'
//            };
//            console.log("polls created");
//            tableService.insertEntity('polls', poll, function(error){
//                if(!error){
//                    console.log("inserted");
//                }
//                else{
//                    console.log(error);
//                }
//            });
//        }
//        else{
//         console.log(error);
//        }
//    });
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    var tableService = azure.createTableService().withFilter(retryOperations);
    var query = azure.TableQuery
        .select()
        .from('polls')
        .where('PartitionKey eq ?', 'polls');
    tableService.queryEntities(query, function(error, entities){
        if(!error){
            res.send(_und.map(entities, function(item) { return {id: item.RowKey, name: item.Name} }));
        }
    });
};
exports.htmlList = function(req, res){
    res.render('polls', { env: process.env.NODE_ENV});
};
exports.htmlDetail = function(req, res){
    res.render('poll', { env: process.env.NODE_ENV});
};