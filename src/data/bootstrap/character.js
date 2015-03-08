module.exports = (function () {
    
    function create (db) {
        var logger;
            
        logger = require('log4js').getLogger('db');
        logger.debug('creating Character data');
    }

    return {
        create: create
    }
}());
