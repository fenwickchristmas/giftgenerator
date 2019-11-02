const express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require('./seed'),
    people = require('./models/people'),
    tables = require('./models/tables');

var connectUrl = process.env.DATABASE || "mongodb://localhost:27017/fenwick_christmas";
mongoose.connect(connectUrl, {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';


//seedDB();

app.get('/', function(req, res) {
    var date = new Date();
    var month = date.getMonth(); 
    var year = date.getFullYear();
    var previousYear = date.getFullYear() - 1;
    if (month == 9 || month == 10 || month == 11) 
    {
        tables.find({year: year}, function(err, data){
            if (err) {
                console.log(err);
            } else {
                if (data.length === 0) 
                { 
                    // TODO calculate new table
                    var peopleList = [];
                    var familyPool = {
                        family0: [],
                        family1: [],
                        family2: [], 
                        family3: []
                    };
                    var newTable = []
                    people.find({}, function(err, data){
                        if (err) {
                            console.log(err);
                        } else {
                            tables.find({year: previousYear}, function(err, previousData){
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(previousData);
                                    data.forEach(person => {
                                        peopleList.push(person);
                                        switch (person.familyId) {
                                            case 0:
                                                familyPool.family1.push(person);
                                                familyPool.family2.push(person);
                                                familyPool.family3.push(person);
                                                break;
                                            case 1:
                                                familyPool.family0.push(person);
                                                familyPool.family2.push(person);
                                                familyPool.family3.push(person);
                                                break;
                                            case 2:
                                                familyPool.family0.push(person);
                                                familyPool.family1.push(person);
                                                familyPool.family3.push(person);
                                                break
                                            case 3:
                                                familyPool.family0.push(person);
                                                familyPool.family1.push(person);
                                                familyPool.family2.push(person);
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                    data.forEach(person => {
                                        switch(person.familyId) {
                                            case 0:
                                                var continueLoop = true;
                                                while(continueLoop)
                                                {
                                                    var randomIndex = Math.floor(Math.random() * familyPool.family0.length);
                                                    var randomPerson = familyPool.family0[randomIndex];
                                                    previousData.forEach(prePerson => {
                                                        console.log("pregiving: " + prePerson.giving);
                                                        console.log("prereceiving: " + prePerson.receiving);
                                                        console.log("newgiving: " + person.name);
                                                        console.log(randomPerson);
                                                        if (prePerson.giving == person.name) {
                                                            if (!(prePerson.receiving == randomPerson.name))
                                                            {
                                                                familyPool.family0.splice(randomIndex, 1);
                                                                familyPool.family1 = familyPool.family1.filter(e => e !== randomPerson);
                                                                familyPool.family2 = familyPool.family2.filter(e => e !== randomPerson);
                                                                familyPool.family3 = familyPool.family3.filter(e => e !== randomPerson);
                                                                newTable.push({giving: person.name, receiving: randomPerson.name, year: year});
                                                                continueLoop = false;
                                                            } else if (familyPool.family0.length == 1) {
                                                                return res.redirect('/');
                                                            }
                                                        } 
                                                    });
                                                }
                                                break;
                                            case 1:
                                                var continueLoop = true;
                                                while (continueLoop) {
                                                    var randomIndex = Math.floor(Math.random() * familyPool.family1.length);
                                                    var randomPerson = familyPool.family1[randomIndex];
                                                    previousData.forEach(prePerson => {
                                                        console.log("pregiving: " + prePerson.giving);
                                                        console.log("prereceiving: " + prePerson.receiving);
                                                        console.log("newgiving: " + person.name);
                                                        console.log(randomPerson);
                                                        if (prePerson.giving === person.name) {
                                                            if (!(prePerson.receiving === randomPerson.name))
                                                            {
                                                                familyPool.family1.splice(randomIndex, 1);
                                                                familyPool.family0 = familyPool.family0.filter(e => e !== randomPerson);
                                                                familyPool.family2 = familyPool.family2.filter(e => e !== randomPerson);
                                                                familyPool.family3 = familyPool.family3.filter(e => e !== randomPerson);
                                                                newTable.push({giving: person.name, receiving: randomPerson.name, year: year});
                                                                continueLoop = false;
                                                            } else if (familyPool.family1.length == 1) {
                                                                return res.redirect('/');
                                                            }
                                                        }
                                                    });
                                                } 
                                                break;                                             
                                            case 2:
                                                var continueLoop = true;
                                                while (continueLoop) {
                                                    var randomIndex = Math.floor(Math.random() * familyPool.family2.length);
                                                    var randomPerson = familyPool.family2[randomIndex];
                                                    previousData.forEach(prePerson => {
                                                        console.log("pregiving: " + prePerson.giving);
                                                        console.log("prereceiving: " + prePerson.receiving);
                                                        console.log("newgiving: " + person.name);
                                                        console.log(randomPerson);
                                                        if (prePerson.giving === person.name) {
                                                            if (!(prePerson.receiving === randomPerson.name))
                                                            {
                                                                familyPool.family2.splice(randomIndex, 1);
                                                                familyPool.family1 = familyPool.family1.filter(e => e !== randomPerson);
                                                                familyPool.family0 = familyPool.family0.filter(e => e !== randomPerson);
                                                                familyPool.family3 = familyPool.family3.filter(e => e !== randomPerson);
                                                                newTable.push({giving: person.name, receiving: randomPerson.name, year: year});
                                                                continueLoop = false;
                                                            } else if (familyPool.family2.length == 1) {
                                                                return res.redirect('/');
                                                            }
                                                        }
                                                    });
                                                }
                                                break;
                                            case 3:
                                                var continueLoop = true;
                                                while (continueLoop) {
                                                    var randomIndex = Math.floor(Math.random() * familyPool.family3.length);
                                                    var randomPerson = familyPool.family3[randomIndex];
                                                    previousData.forEach(prePerson => {
                                                        console.log("pregiving: " + prePerson.giving);
                                                        console.log("prereceiving: " + prePerson.receiving);
                                                        console.log("newgiving: " + person.name);
                                                        console.log(randomPerson);
                                                        if (prePerson.giving === person.name) {
                                                            if (!(prePerson.receiving === randomPerson.name))
                                                            {
                                                                familyPool.family3.splice(randomIndex, 1);
                                                                familyPool.family1 = familyPool.family1.filter(e => e !== randomPerson);
                                                                familyPool.family2 = familyPool.family2.filter(e => e !== randomPerson);
                                                                familyPool.family0 = familyPool.family0.filter(e => e !== randomPerson);
                                                                newTable.push({giving: person.name, receiving: randomPerson.name, year: year});
                                                                continueLoop = false;
                                                            } else if (familyPool.family3.length == 1) {
                                                                return res.redirect('/');
                                                            }
                                                        }
                                                    });
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                    newTable.forEach(entry => {
                                        tables.create(entry, function(err, createdEntry){
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log(createdEntry);
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    tables.find({year: year}, function(err, data){
        if (err) {
            console.log(err);
        } else {
            tables.find({year: previousYear}, function(err, previousData){
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', {table: data, year: year, previousTable: previousData, previousYear: previousYear});
                }
            })
        }
    });
});

app.listen(port, ip, function() {
    console.log("The server has started successfully");
});