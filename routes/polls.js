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

exports.recordVote = function(req, res)
{
    console.log(req.body);
    console.log(req.params);
    var pollKey = req.body.pollKey;
    console.log("poll key: " + pollKey);
    var optionKey = req.body.optionKey;
    console.log("option key: " + optionKey);

    var azure= require('azure');
    var tableService = azure.createTableService();

    tableService.createTableIfNotExists('polls', function(error){
        if(!error){
            var query = azure.TableQuery.select().from('polls').where("key eq ?", pollKey);
            tableService.queryEntities(query, function(error, entities){
                if(entities.length ==1 ){
                    var entity = entities[0];
                    console.log(entity);
                    var updatingEntity = { RowKey: entity.RowKey, PartitionKey: entity.PartitionKey};
                    for(var i = 0; i<8; i++)
                    {
                        if(entity["optionKey" + i] && entity["optionKey" + i] == optionKey)
                        {
                            updatingEntity["optionValue" + i] = entity["optionValue" + i] || 0;
                            updatingEntity["optionValue" + i] += 1;
                        }
                    }
                    tableService.mergeEntity('polls', updatingEntity, function(error){
                        console.log(error);
                    });
                }
            });
        }
    });
}

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

exports.delete = function(req, res)
{
    var azure= require('azure');
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    var tableService = azure.createTableService().withFilter(retryOperations);
    var id = req.query["id"];
    console.log(id);
    tableService.deleteEntity('polls', {PartitionKey:'polls', RowKey: id + ""}, function(error){
       if(!error)
           console.log("deleted");
        else
            console.log(error);

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