var mongo = require('mongodb');
var umxUtils = { sendError : 

function(req, res, error) {
console.log(error);
res.writeHead(500, {
'Content-Type' : 'text/html'
});
var str = error.toJSON ? error.toJSON() : '' + error;
res.write('<!doctype html>\n');
res.write('<html><head>');
res.write('<title>500 - Internal Server Error</title>\n');
res.write('</head><body>\n');
res.write('<h1>500 - Internal Server Error</h1>');
res.write('<pre>');
res.write(str);
res.write('</pre>');
res.write('</body>');
res.write('</html>');
}

};

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect : true
});
db = new Db('saviors', server, {
    safe : true
});

db
        .open(function(err, db) {
            if (!err) {
                console.log("Connected to 'saviors' database");
                db
                        .collection(
                                'saviorlist',
                                {
                                    safe : true
                                },
                                function(err, collection) {
                                    if (err) {
                                        console
                                                .log("The 'saviorlist' collection doesn't exist. Creating it with sample data...");
                                        //populateDB();
                                    }
                                });
            }
        });



exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving node: ' + id);
    db.collection('saviorlist', function(err, collection) {
        collection.findOne({
            '_id' : new BSON.ObjectID(id)
        }, function(err, item) {
            res.send(item);
        });
    });
};



/**
 * @param first
 *            an array containing lat/lng of the first point of the area
 * @param second
 *            an array containing lat/lng of the second point of the area
 */
function getRect(first, second) {
    var max = {
        lat : Math.max(first[0], second[0]),
        lng : Math.max(first[1], second[1])
    }
    var min = {
        lat : Math.min(first[0], second[0]),
        lng : Math.min(first[1], second[1])
    }
    var result = [ [ max.lat, min.lng ], [ max.lat, max.lng ],
            [ min.lat, max.lng ], [ min.lat, min.lng ], [ max.lat, min.lng ] ];
    return result;
}







//*******************************       DB FIND         ***************************//

exports.findUsers = function(req, res) {
    db.collection('users', function(err, collection) {
        var query = {};
//        var dirty = req.query.dirty;
//        dirty = ('' + dirty).toLowerCase();
//        if (dirty === 'true' || dirty === '1') {
//            query = {
//                dirty : true
//            };
//        } else if (dirty === 'all') {
//            query = {};
//        } else {
//            query = {
//                dirty : false
//            }
//        }
        collection.find(query).toArray(function(err, items) {
            res.send(items);
        });
    });
};


exports.findLabos = function(req, res) {
    db.collection('labos', function(err, collection) {
        var query = {};
//        var dirty = req.query.dirty;
//        dirty = ('' + dirty).toLowerCase();
//        if (dirty === 'true' || dirty === '1') {
//            query = {
//                dirty : true
//            };
//        } else if (dirty === 'all') {
//            query = {};
//        } else {
//            query = {
//                dirty : false
//            }
//        }
        collection.find(query).toArray(function(err, items) {
            res.send(items);
        });
    });
};



//*******************************       DB ADD         ***************************//


exports.adduser = function(req, res) {
    var node = { "node" : req.body } ;
    //node.name = node ;
//    var coords = node.geometry.coordinates = node.geometry.coordinates
//            || [];
    var ok = false;
//    if (coords) {
//        var len = coords.length || 0;
//        for ( var i = 0; i < len; i++) {
//            coords[i] = parseFloat(coords[i]);
//        }
//    }
    node.dirty = true;
    console.log('Adding node: ' + JSON.stringify(node));
    db.collection('users', function(err, collection) {
        collection.insert(node, {
            safe : true
        }, function(err, result) {
            if (err) {
                umxUtils.sendError(req, res, err);
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


exports.addLabo = function(req, res) {
    var node = { "node" : req.body } ;
    //node.name = node ;
//    var coords = node.geometry.coordinates = node.geometry.coordinates
//            || [];
    var ok = false;
//    if (coords) {
//        var len = coords.length || 0;
//        for ( var i = 0; i < len; i++) {
//            coords[i] = parseFloat(coords[i]);
//        }
//    }
    node.dirty = true;
    console.log('Adding node: ' + JSON.stringify(node));
    db.collection('labos', function(err, collection) {
        collection.insert(node, {
            safe : true
        }, function(err, result) {
            if (err) {
                umxUtils.sendError(req, res, err);
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}











exports.updatenode = function(req, res) {
    var id = req.params.id;
    var node = req.body;
    delete node._id;
    console.log('Updating node: ' + id);
    console.log(JSON.stringify(node));
    db.collection('saviorlist', function(err, collection) {
        collection.update({
            '_id' : new BSON.ObjectID(id)
        }, {
            $set : node
        }, {
            safe : true
        }, function(err, result) {
            if (err) {
                umxUtils.sendError(req, res, err);
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(node);
            }
        });
    });
}

exports.deletenode = function(req, res) {
    var id = req.params.id;
    console.log('Deleting node: ' + id);
    db.collection('saviorlist', function(err, collection) {
        collection.remove({
            '_id' : new BSON.ObjectID(id)
        }, {
            safe : true
        }, function(err, result) {
            if (err) {
                umxUtils.sendError(req, res, err);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}




/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the
// application is started.
// You'd typically not find this code in a real-life app, since the database
// would already exist.

var populateDB = function() {

    var fs = require('fs');
    var file = __dirname + '/data.json';

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var data = JSON.parse(data);
        var list = data.features;
        var len = list && list.length ? list.length : 0;
        for ( var i = 0; i < len; i++) {
            var item = list[i];
            item.dirty = false;
        }
        console.dir(data);
        
        
        //POPULATE DB FUNCTION
        
//        db.collection('saviorlist', function(err, collection) {
//            collection.ensureIndex({
//                "geometry.coordinates" : "2dsphere"
//            });
//
//            console.log('[' + data.features.length + '] items to insert.');
//            collection.insert(data.features, {
//                safe : true
//            }, function(err, result) {
//                if (err) {
//                    console.log("ERROR!", err);
//                } else {
//                    console.log('[' + data.features.length + '] items were inserted.');
//                }
//            });
//        });

    });

};