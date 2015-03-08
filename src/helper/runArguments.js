module.exports = (function () {
    var _ = require('underscore');
        argv = process.argv;

    return {
        bootstrapData: function () {
            return _.contains(argv, '--bootstrap-data');
        }
    }
}());
