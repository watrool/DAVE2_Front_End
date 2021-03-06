var express = require('express');
var http = require('http');
var fs = require('fs');
var io = require('socket.io')();
var bodyparser = require('body-parser');
var multiparty= require('multiparty');
var kafka = require('kafka-node');

var app = express();
var server = http.createServer(app);

var id = '';
io.listen(server);

app.use(express.static(__dirname + '/../'));

var fakeFieldsInfo=[{
  name:"Fermenter Sample HPLC Ethanol",
  checked: true,
  avaliableOptions:[
    {
      name:"Percision", value: 2, type:"number"
    },
    {
      name:"Unit", value: "meter", type:"select", options:["centimeter", "millimeter", "litre", "gram", "kilogram"]
    },
    {
      name:"Status", value: "ACTIVE", type:"text"
    },
    {
      name:"Note", type:"textarea"
    }
  ]
}, {
  name: "Fermenter Sample %Solids",
  checked: true,
  avaliableOptions:[
    {
      name: "Percision", value: 2, type:"number"
    }
  ]
},
{
  name: "Date",
  checked: true,
  avaliableOptions:[]
}, {
  name: "Fermenter Sample ID",
  checked: true,
  avaliableOptions:[]
}];


app.post("/Importer/uploadFile", function(req,res){
  var form = new multiparty.Form();
  var file;
  var filename;
  var count = 0;

  var fileInfo = '';
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

  form.on('part', function(part) {

    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      part.on('data', function(chunk){
        fileInfo += chunk;
      });

      part.on('end', function(){
        console.log(fileInfo);
        console.log(part.name + " is received");
      });

      // ignore field's content
      part.resume();
    }

    if (part.filename) {
      filename = part.filename;
      // filename is defined when this is a file
      count++;
      part.on("data", function(chunk){
        file += chunk;
      });


      part.on('end', function(){
        console.log('file upload success!');
      });
      part.resume();
    }

    part.on('error', function(err) {
      // decide what to do
    });
  });

  form.on('close', function() {
    console.log('Upload completed!');

    fs.writeFile(__dirname + "/upload_files/" + filename,file, function(err){
      res.end(err);
    });

    res.end(JSON.stringify(fakeFieldsInfo));
  });

  // form.on('progress', function(bytesReceived, bytesExpected){
  //   var progress =bytesReceived / bytesExpected * 100;
  //   console.log("Progress: " + progress.toFixed(2) + "%");
  // });
  form.parse(req);
});


app.post("/Importer/decideImport",bodyparser.json(), function(req, res){
  console.log(JSON.stringify(req.body));
  res.end();
});

var id = '';
app.get('/Importer/gettable', function(req, res){
  fs.readFile('table.json', function(err,data){
    if (err){
      console.log('Error Reading File');
      console.log(err);
      res.writeHead(404,{'Content-Type': 'text/plain'});
      res.end();
    } else {
      io.of('/importer').to(id).emit("importerListData", 2);
      res.write(data);
      res.end();
    }
  });
});

io.on("connection", function(socket){
  id = socket.id;
  console.log(socket.handshake.address + " has connected! id: " + socket.id);
});

io.of('/user').on("connection", function(socket){


});

io.of('/importer').on("connection", function(socket){
  console.log(socket.handshake.address + " has connected! id: " + socket.id + " Namespace: /importer");
  socket.on("requestImporterList",function(){

  });
  socket.on("requestImporter", function(importer){
    console.log("Requested Importer Info: " + JSON.stringify(importer));
    socket.emit("responseImporter", fakeFieldsInfo);
  });

  socket.on("importerListData", function(data){
    console.log("1");
    console.log("received: " + data);
  });


});


server.listen(3000);
console.log("Express Server Is Listenning at 3000");
