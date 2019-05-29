var express = require('express');
var app = express();

// Handling multipart/form-data from /transactions/new
const multer = require('multer');
const upload = multer();

app.use(express.static(__dirname+'/view'));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/view/routes/dashboard.html');
});

app.get('/transactions/list', function (req, res) {
  res.sendFile(__dirname+'/view/routes/list.html');
});

app.get('/transactions/create', function (req, res) {
  res.sendFile(__dirname+'/view/routes/create.html');
});

app.post('/transactions/new', upload.any(), function (req, res) {
  console.log(req.body);
  console.log(req.files);
  res.redirect('/transactions/create')
});

app.listen(3000, function () {
  console.log('Listening on port http://localhost:3000');
});
