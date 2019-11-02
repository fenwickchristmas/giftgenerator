var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require('./seed'),
    people = require('./models/people'),
    tables = require('./models/tables'),
    seedDb

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

app.get('/', function(req, res){
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
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
                    people.find({}, function(err, data){
                        if (err) {
                            console.log(err);
                        } else {
                            data.forEach(person => {
                                console.log(person);
                                peopleList.push(person);
                            });
                            console.log(peopleList);
                        }
                    });
                }
            }
        });
    }
    res.render('index', {month: month});
});

app.listen(port, ip, function() {
    console.log("The server has started successfully");
});