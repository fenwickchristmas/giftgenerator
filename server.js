var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
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

var tableCalculated = false;

app.get('/', function(req, res){
    var date = new Date();
    var month = date.getMonth();
    res.render('index', {month: month});
});

app.listen(port, ip, function() {
    console.log("The server has started successfully");
});