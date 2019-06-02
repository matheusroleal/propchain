var fs = require('fs');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var assert = require('assert');

// Upload local modules
var file_system = require('./file_system.js')

// Connection URL
const url = 'mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT+'';

// Database Name
const dbName = process.env.MONGODB_DATABASENAME;

module.exports = {
  write : function (filePath, fileName) {
    // Create a new MongoClient
    const MongoClient = mongo.MongoClient;
    var client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      var gfs = Grid(db, mongo);

      // streaming to gridfs
      var writestream = gfs.createWriteStream({
          filename: filePath
      });
      fs.createReadStream(filePath).pipe(writestream);

      writestream.on("close", function (file) {
        console.log("Write written successfully in database");
        file_system.remove_file(filePath);
        client.close();
      });
    });
  },
  read : function (fileName) {
    // Create a new MongoClient
    const MongoClient = mongo.MongoClient;
    var client = new MongoClient(url);
    var path = require("path");

    // Use connect method to connect to the Server
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      var gfs = Grid(db, mongo);

      var fsstreamwrite = fs.createWriteStream(
        path.join(__dirname, fileName)
      );

      // streaming from gridfs
      var readstream = gfs.createReadStream({
        filename: fileName
      });

      //error handling, e.g. file does not exist
      readstream.on('error', function (err) {
        console.log('An error occurred!', err);
        throw err;
      });

      readstream.pipe(fsstreamwrite);
      readstream.on('close', function (err) {
        console.log("Write read successfully in database");
        client.close();
      });
    });
  }

}
