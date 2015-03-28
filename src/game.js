(function () {
    "use strict";

    var logger,
        loggerDB,
        config, 
        dao,
        run,
        battle;

    logger = require('log4js').getLogger('game');
    config = require('./config');
    run = require('./helper/runArguments');

    logger.info('Staring game');

    dao = require('./data/dao');
    battle = require('./battle/simpleBattle');

    dao.connect(config, function (err) {
        if (run.bootstrapData()) {
            require('./data/dataPopulator').populate(dao);
        }

        battle.run(dao);
    });

}());
