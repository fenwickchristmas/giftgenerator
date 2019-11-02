var mongoose = require('mongoose'),
    People = require('./models/people'),
    Tables = require('./models/tables');

var peopleData = [
    {
        name: "Nathan",
        familyId: 0
    },
    {
        name: "Emma",
        familyId: 0
    },
    {
        name: "Connor",
        familyId: 0
    },
    {
        name: "Kelly",
        familyId: 1
    },
    {
        name: "Sophie",
        familyId: 1
    },
    {
        name: "Kevin",
        familyId: 2
    },
    {
        name: "Vicki",
        familyId: 2
    },
    {
        name: "Loki",
        familyId: 2
    },
    {
        name: "Mitch",
        familyId : 2
    },
    {
        name: "Baxter",
        familyId: 2
    },
    {
        name: "Narrissa",
        familyId: 2
    },
    {
        name: "Neil",
        familyId: 3
    },
    {
        name: "Rebecca",
        familyId: 3
    },
    {
        name: "Sian",
        familyId: 3
    },
    {
        name: "Beth",
        familyId: 3
    },
    {
        name: "Daniel",
        familyId: 3
    }
]

var tableData2018 = [
    {
        giving: "Kelly",
        receiving: "Narrissa",
        year: "2018"
    },
    {
        giving: "Sophie",
        receiving: "Neil",
        year: "2018"
    },
    {
        giving: "Brayden",
        receiving: "Vicki",
        year: "2018"
    },
    {
        giving: "Kevin",
        receiving: "Beth",
        year: "2018"
    },
    {
        giving: "Vicki",
        receiving: "Nathan",
        year: "2018"
    },
    {
        giving: "Loki",
        receiving: "Brayden",
        year: "2018"
    },
    {
        giving: "Narrissa",
        receiving: "Sian",
        year: "2018"
    },
    {
        giving: "Mitch",
        receiving: "Kelly",
        year: "2018"
    },
    {
        giving: "Baxter",
        receiving: "Sophie",
        year: "2018"
    },
    {
        giving: "Neil",
        receiving: "Loki",
        year: "2018"
    },
    {
        giving: "Rebecca",
        receiving: "Emma",
        year: "2018"
    },
    {
        giving: "Sian",
        receiving: "Connor",
        year: "2018"
    },
    {
        giving: "Beth",
        receiving: "Kevin",
        year: "2018"
    },
    {
        giving: "Daniel",
        receiving: "Baxter",
        year: "2018"
    },
    {
        giving: "Nathan",
        receiving: "Mitch",
        year: "2018"
    },
    {
        giving: "Emma",
        receiving: "Daniel",
        year: "2018"
    },
    {
        giving: "Connor",
        receiving: "Rebecca",
        year: "2018"
    }
]

function seedDB() {
    // Remove all people
    People.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("People removed");
            peopleData.forEach(function(person){
                People.create(person, function(err, createdPerson){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a person: " + createdPerson);
                    }
                });
            });
        }
    });

    Tables.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Tables removed");
            tableData2018.forEach(function(entry){
                (function(entry) {
                    Tables.create(entry, function(err, createdEntry){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(createdEntry);
                        }
                    });
                })(entry);
            });
        }
    });
}

module.exports = seedDB;