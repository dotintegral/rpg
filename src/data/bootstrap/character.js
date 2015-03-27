module.exports = (function () {

    var data = {
        id: 1,
        name: "John"
    }
    
    function create(db) {

        db.load("../model/character", function (err) {
            if (err) {
                console.log("Err", err);
            }

            var model = db.models.character;

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
