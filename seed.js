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
        name:"Sophie",
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
        name: "Lachie",
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
        name: "Narissa",
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
}

module.exports = seedDB;