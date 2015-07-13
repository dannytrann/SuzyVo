// Server.js
//This is where i'll configure all my back end setup

// Setup ===========================================
var express = require('express');
var app = express(); //Create our app with express
var mongoose = require('mongoose'); // mongod glue
var morgan = require('morgan'); // logs request to the console
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuration ===========================================
mongoose.connect('mongodb://localhost/dannyhaitran');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('DB Status: Connected')// yay!
});
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

// Define model ======================================
var Project = mongoose.model('project', {
    projectName: String,
    projectDescription: String,
    projectUrl: String,
    projectType: String
});

var Image = mongoose.model('image', {
    project_id: Number,
    link: String
});

// Routes ======================================
app.get('/', function (req, res) {
    res.render('index.jade', {});
});

//API

//Get all projects
app.get('/api/projects', function (req, res) {

    // use mongoose to get all projects in the database
    Project.find(function (err, projects) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(projects); // return all todos in JSON format
    });
});
// create todo and send back all todos after creation
app.post('/api/projects', function (req, res) {

    Project.create({
        text: req.body.text,
        done: false
    }, function (err, project) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Project.find(function (err, projects) {
            if (err)
                res.send(err)
            res.json(projects);
        });
    });

});
// delete a project
app.delete('/api/projects/:project_id', function (req, res) {
    Project.remove({
        _id: req.params.todo_id
    }, function (err, project) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Project.find(function (err, projects) {
            if (err)
                res.send(err)
            res.json(projects);
        });
    });
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
