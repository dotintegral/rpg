(function () {

    var logger,
        config, 
        orm,
        db,
        battle;


    logger = require('log4js').getLogger('game');
    config = require('./config');
    orm = require('orm');

    logger.info('Staring game');

    db = orm.connect(config.dburl);
    battle = require('./battle/simpleBattle');

    db.on('connect', function (err) {
        if (err) {
            logger.fatal('could not connect to DB');
            return;
        }

        battle.run();
    });

    db.on('error', function (err) {
        logger.error('DBERR', err);
    });

    db.load('./data/model', function (err) {
        logger.debug('loaded models');
    });

}());
