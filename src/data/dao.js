module.exports = (function (db) {

    var logger = require('log4js').getLogger('db');
        orm = require('orm'),
        async = require('async'),

        modelDir = __dirname + "/model/",
        db = null;
    

    function connect(config, cb) {
        db = orm.connect(config.dburl);

        db.on('connect', function (err) {
            if (err) {
                logger.fatal('could not connect to DB');
                return;
            }

            cb();
        });

        db.on('error', function (err) {
            logger.error('DBERR', err);
        });
    }

    function load(names, cb) {
        var tasks = names.map(function (name) {
            return function (onLoad) {
                db.load(modelDir + name, function (err) {
                    onLoad(err);
                });
            };
        });

        async.parallel(tasks, function (err) {
            cb(err, db.models);
        });
    }

    return {
        connect: connect,
        load: load
    }
}());
