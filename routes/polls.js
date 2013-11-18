var _und = require('underscore');
exports.list = function(req, res){
    var azure= require('azure');
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    var tableService = azure.createTableService().withFilter(retryOperations);
    var query = azure.TableQuery
        .select()
        .from('polls');
    tableService.queryEntities(query, function(error, entities){
        if(!error){
            res.send(_und.map(entities, function(item) { return {id: item.RowKey, name: item.name} }));
        }
    });
};

exports.add = function(req, res)
{
    var name = req.params.name;
    var azure= require('azure');
    var tableService = azure.createTableService();

    tableService.createTableIfNotExists('polls', function(error){
        if(!error){
            var poll = {
                PartitionKey : 'polls',
                RowKey : req.body.name
            };
            console.log(req.body);
            poll = _und.extend(poll, req.body);

            console.log("polls created: ");
            console.log(poll);
            tableService.insertEntity('polls', poll, function(error){
                if(!error){
                    console.log("inserted");
                }
                else{
                    console.log(error);
                }
            });
        }
        else{
         console.log(error);
        }
    });
    res.send(true);
}

exports.details = function(req, res){
    var azure= require('azure');
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    var tableService = azure.createTableService().withFilter(retryOperations);
    console.log(req.params[0]);
    var query = azure.TableQuery.select().from('polls').where('RowKey eq ?', req.params[0]);
    tableService.queryEntities(query, function(error, entities){
       var entity = entities[0];
       if(entity && entity._)
           delete entity._;
       entity.options = new Array();
       for(var i = 0; i<8; i++)
       {
           if(entity["optionName" + i])
            entity.options.push({name: entity["optionName" + i],
                                 key: entity["optionKey" + i],
                                 value: entity["optionValue" + i] || 0});
       }
       res.send(entity);
    });
};

exports.htmlList = function(req, res){
    res.render('polls', { env: process.env.NODE_ENV});
};
exports.htmlDetail = function(req, res){
    res.render('poll', { env: process.env.NODE_ENV});
};
exports.htmlAdd = function(req, res){
    res.render('add', { env: process.env.NODE_ENV});
};