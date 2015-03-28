module.exports = (function () {
    
    function populate(dao) {
        var fs,
            logger,
            directory,
            files;
            
        logger = require('log4js').getLogger('db');
        logger.info('bootstraping sample data');

        fs = require('fs');
        directory = __dirname + "/bootstrap";

        
        fs.readdirSync(directory)
            .filter(function (file) {
                return /^.*\.js$/.test(file);
            })
            .forEach(function (file) {
                var data = require(directory + "/" + file);
                data.create(dao);
            });
    }

    return {
        populate: populate
    }

}());
