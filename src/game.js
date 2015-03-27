(function () {
    "use strict";

    var logger,
        loggerDB,
        config, 
        orm,
        db,
        run,
        battle;

    logger = require('log4js').getLogger('game');
    loggerDB = require('log4js').getLogger('db');
    config = require('./config');
    run = require('./helper/runArguments');
    orm = require('orm');

    logger.info('Staring game');

    db = orm.connect(config.dburl);
    battle = require('./battle/simpleBattle');


    db.on('connect', function (err) {
        if (err) {
            loggerDB.fatal('could not connect to DB');
            return;
        }

        if (run.bootstrapData()) {
            require('./data/dataPopulator').populate(db);
        }

        battle.run(db);
    });


    db.on('error', function (err) {
        loggerDB.error('DBERR', err);
    });

}());
