module.exports = (function (db) {

    var modelDir = __dirname + "/model/",
        logger = require('log4js').getLogger('db');
        orm = require('orm'),
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

    function load(name, cb) {
        db.load(modelDir + name, function (err) {
            cb(err, db.models);
        });
    }

    return {
        connect: connect,
        load: load
    }
}());
