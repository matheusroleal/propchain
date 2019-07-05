var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var app = express();

// Upload local modules
var file_system = require('./utils/file_system.js');
var mongodb = require('./utils/mongodb.js');

// Handling multipart/form-data from /transactions/new
const multer = require('multer');
const upload = multer();

app.use(express.static(__dirname+'/public'));

// Setting EJS as our engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}))

// Front End Requests
app.get('/', function (req, res) {
  res.render('routes/dashboard');
});

app.get('/transactions/list', function (req, res) {
  res.render('routes/list');
});

app.get('/transactions/search', function (req, res) {
  res.render('routes/search', {transaction: {sender: "sender1", receiver: "receiver1", filepath: "DevOps Goals.jpg",timestamp: "1"}});
});

app.get('/transactions/create', function (req, res) {
  res.render('routes/create', {randomId: mongodb.randomID()});
});

app.get('/proposal/countdown', function (req, res) {
  res.render('routes/countdown', {date: "Jul 5, 2019 12:50:00"});
});

app.get('/error', function (req, res) {
  res.render('routes/error');
});

// Back End Requests
app.post('/transactions/new', upload.single('uploadFile'), function (req, res) {
  // Check if is Connected to Web3
  isWeb3Connected = req.body.isWConn

  if (isWeb3Connected == 'True'){

    var docId = req.body.fileId;
    console.log(docId);

    // Send file from the database
    mongodb.uploadFile(docId,req,res);

    res.redirect('/transactions/create');

  } else{
    res.redirect('/error');
  }
});

app.post('/transactions/get', upload.any(), function(req, res){
  console.log("bateu");

  var docId = req.body.fileId;
  console.log(req.body);
  console.log(docId);

  // Get file from the database
  mongodb.downloadFile(docId,req,res);
});

// Listening Port
app.listen(3000, function () {
  console.log('Listening on port http://localhost:3000');
});
