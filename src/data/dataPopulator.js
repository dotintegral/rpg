module.exports = (function () {

    var fs,
        dao,
        async,
        logger,
        directory;


    fs = require('fs');
    async = require('async');
    logger = require('log4js').getLogger('db');

    directory = __dirname + "/bootstrap";
    
    function loadData(file, cb) {
        var data = require(directory + "/" + file);
        logger.info("- loading", file);

        dao.load([data.name], function (err, models) {
            if (err) {
                logger.error("Cannot load ", data.name, err);
                return cb(err);
            }

            var model = models[data.name];

            model.create(data.data, function (err, result) {
                if (err) {
                    logger.error("Cannot save ", data.name, err.toString());
                    return cb(err);
                }

                cb(null, result);
            });
        });

    }   

    function filterJSON(file) {
        return /^.*\.json$/.test(file);
    }

    function populate(cb) {
        logger.info('bootstraping sample data');

        dao = require('./dao');
        
        fs.readdir(directory, function (err, files) {
            if (err) {
                logger.error("Cannot read directory", err);
                return cb(err);
            }

            var dataFiles,
                tasks;

            dataFiles = files.filter(filterJSON);
            tasks = dataFiles.map(function (file) {
                return loadData.bind(null, file);
            });

            async.parallel(tasks, function (err) {
                if (err) {
                    return cb(err);
                }

                logger.info("sample data loaded");
                cb();
            });
        });
    }

    return {
        populate: populate
    }

}());
