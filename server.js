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
  res.render('routes/list',{ transactions: [{sender: "sender1", receiver: "receiver1", filepath: "file1",timestamp: "1"},{sender: "sender2", receiver: "receiver2", filepath: "file2",timestamp: "2"}]});
});

app.get('/transactions/search', function (req, res) {
  res.render('routes/search', {transaction: {sender: "sender1", receiver: "receiver1", filepath: "file1",timestamp: "1"}});
});

app.get('/transactions/create', function (req, res) {
  res.render('routes/create');
});

// Back End Requests
app.post('/transactions/new', upload.single('uploadFile'), function (req, res) {
  // Create file
  var file_path = file_system.load_buffer_file(req.file.buffer, req.file.originalname);
  // Send file from the database
  mongodb.write(file_path,req.file.originalname);
  res.redirect('/transactions/create');
});

// Listening Port
app.listen(3000, function () {
  console.log('Listening on port http://localhost:3000');
});
