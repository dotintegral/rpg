module.exports = (function () {

    var data = {
        id: 7,
        name: "John"
    }
    
    function create(dao) {

        dao.load("character", function (err, models) {
            if (err) {
                console.log("Err", err);
            }

            var model = models.character;

            model.create(data, function (err, result) {
                if (err) {
                    console.log(err);
                }

                console.log(result);
            });

        })
    };

    return {
        create: create
    }
}());
