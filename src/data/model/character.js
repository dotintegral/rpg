module.exports = function (db, cb) {

    var Id, Integer;
    
    Id = {
        type: 'serial',
        key: true
    };

    Integer = {
        type: 'integer'
    };

    db.define('character', {
        id: Id,

        // Metadata
        name: String,
/*        level: Integer,
        strenght: Integer,
        speed: Integer,
        technique: Integer,
        combo: Integer,
        
        // Character's current status
        health: Integer,
        energy: Integer,
        tachion: Integer,
        weapon: Object,

        // Character's max parameters
        maxHealth: Integer,
        maxEnergy: Integer,
        maxTachion: Integer,

        // Character's collections
        effects: Object,
        physicalAttacks: Object,
        energyAttacks: Object,
        tachionAttacks: Object,
        weapons: Object,
        items: Object
*/
    }, {
        methods: {

        }
    });

    return cb();
};
