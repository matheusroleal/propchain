var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/transactions/list', function (req, res) {
  res.send('List Transactions from one user');
});

app.get('/transactions/create', function (req, res) {
  res.send('Create a transaction');
});

app.listen(3000, function () {
  console.log('Listening on port localhost:3000');
});
