var express = require('express');
var app = express();

// Upload local modules
var file_system = require('./utils/file_system.js')

// Handling multipart/form-data from /transactions/new
const multer = require('multer');
const upload = multer();

app.use(express.static(__dirname+'/view'));

// Front End Requests
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/view/routes/dashboard.html');
});

app.get('/transactions/list', function (req, res) {
  res.sendFile(__dirname+'/view/routes/list.html');
});

app.get('/transactions/search', function (req, res) {
  res.sendFile(__dirname+'/view/routes/search.html');
});

app.get('/transactions/create', function (req, res) {
  res.sendFile(__dirname+'/view/routes/create.html');
});

// Back End Requests
app.post('/transactions/new', upload.any(), function (req, res) {
  console.log(req.body);
  console.log(req.files);
  var file_path = file_system.load_buffer_file(req.files[0].buffer, req.files[0].originalname);
  res.redirect('/transactions/create')
});

// Listening Port
app.listen(3000, function () {
  console.log('Listening on port http://localhost:3000');
});
