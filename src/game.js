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
    run = require('./helper/runtime');

    logger.info('Staring game');

    dao = require('./data/dao');
    battle = require('./battle/simple_battle');

    dao.connect(config, function (err) {
        if (run.bootstrapData()) {
            require('./data/data_populator').populate(function (err, result) {
                battle.run();
            });
        } else {
            battle.run();
        }

    });

}());
