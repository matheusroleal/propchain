var fs = require('fs');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var assert = require('assert');

// Upload local modules
var file_system = require('./file_system.js')

// Connection URL
const url = 'mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT+'';

// Database Name
const dbName = process.env.MONGODB_DATABASENAME;

exports.randomID = function(){
  return mongoose.Types.ObjectId();
}

exports.uploadFile = function(docId,req, res){
  const MongoClient = mongo.MongoClient;
  var client = new MongoClient(url);
  // Create file
  var file_path = file_system.load_buffer_file(req.file.buffer, req.file.originalname);
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var gfs = Grid(db, mongo);

    // SetUp mongodb file
    var filename = req.file.originalname;

    if(!req.file) return res.send({result: 'NO_FILE_UPLOADED'});

    var writestream = gfs.createWriteStream({
      _id: docId,
      filename: filename,
      mode: 'w',
      root: 'documents'
    });

    fs.createReadStream(file_path).pipe(writestream);

    writestream.on("close", function (file) {
      console.log("[mongodb.uploadFile]: Written successfully in database");
      client.close();
    });
  });
};

exports.downloadFile = function(docId,req, res){
  const MongoClient = mongo.MongoClient;
  var client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var gfs = Grid(db, mongo);

    var id = gfs.tryParseObjectId(docId);
    // Note that options now includes 'root'
    var options = {_id: id, root: 'documents'};
    try{
      // Send the file as Response
      gfs.createReadStream(options).pipe(res);
    } catch(err){
      console.log(err);
    }
  });
};
