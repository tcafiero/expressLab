// server.js
const express = require('express');
const server = express();

// diskdb connection
const db = require('diskdb');
db.connect('./database', ['collectionSave']);

// mongodb connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/db";
var dbo;

MongoClient.connect(url,
    function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  dbo = db.db("db");
  record = { time: new Date()};
  dbo.collection("sensors").save(record);
  record = { time: new Date()};
  dbo.collection("sensors").save(record);
});


// diskdb append a couple of records
//record = { time: new Date()};
//db.collection.save(record);
//record = { time: new Date()};
//db.collection.save(record);
collection=db.collectionSave.find();
console.log(collection[0].time[0]);
console.log(collection[0].temp[0]);
console.log(collection[0].humidity[0]);


// code example for a JavaScript object conversion into a JSON string
var obj=[];
var array1=[];
var array2=[];
var id="1234";
array1.push(1);
array1.push(2);
array1.push(3);
array2.push(1);
array2.push(2);
array2.push(3);
obj.push({id,array1,array2});
console.log(JSON.stringify(obj));

server.get("/hello", (req, res) => {
   res.json({ message: "Hello world" });
});

server.get("/diskdb", (req, res) => {
   res.json(collection);
});


server.get("/mongodb", (req, res) => {
   var results = dbo.collection("sensors").find({})
   results.forEach(row => {
        console.log(row.time);
    });
    res.json("done")
});

server.get("/data", (req, res) => {
   res.sendFile(__dirname + '/data.json');
});
server.get("/sum/:a/:b", (req, res) => {
    console.log(parseInt(req.params.a) + parseInt(req.params.b));
   res.json({ total: parseInt(req.params.a) + parseInt(req.params.b) });
});

const port = 4000;
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
