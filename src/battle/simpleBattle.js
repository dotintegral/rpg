module.exports = (function () {
    
    var logger;

    logger = require('log4js').getLogger('battle');

    return {
        run: function () {
            logger.info('starting battle')
        }
    }
    
}());
