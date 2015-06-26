var express=require("express"),http=require("http"),fs=require("fs"),io=require("socket.io")(),bodyparser=require("body-parser"),multiparty=require("multiparty"),kafka=require("kafka-node"),app=express(),server=http.createServer(app),kafkaClient=new kafka.Client("10.222.83.158:2181"),HighLevelProducer=kafka.HighLevelProducer,HighLevelConsumer=kafka.HighLevelConsumer,kafkaProducer=new HighLevelProducer(kafkaClient),kafkaConsumer=new HighLevelConsumer(kafkaClient,[{topic:"__main_out__"},{topic:"__importer_stepOne_list_out__"},{topic:"__importer_stepTwoB_importer_out__"},{topic:"__importer_stepTwoB_dataItem_out__"},{topic:"__importer_stepOne_createImporter_out__"},{topic:"__importer_stepTwo_decideCreation_out__"}],{groupId:"my-group"});io.listen(server),app.use(express["static"](__dirname+"/../")),app.post("/Importer/uploadFile",function(e,o){var t=new multiparty.Form,i,s=[],r=0,n="";t.on("error",function(e){console.log("Error parsing form: "+e.stack)}),t.on("part",function(e){e.filename||(console.log("got field named "+e.name),e.on("data",function(e){n+=e}),e.on("end",function(){console.log(e.name+" is received: "+n)}),e.resume()),e.filename&&(s.push(e.filename),r++,e.on("data",function(e){i+=e}),e.on("end",function(){console.log("file upload success!")}),e.resume()),e.on("error",function(e){})}),t.on("close",function(){console.log("Upload completed!");for(var e=0;e<s.length;e++)fs.writeFile(__dirname+"/importerfiles/"+s[e],i,function(e){o.end(e)});o.end()}),t.parse(e)}),app.post("/Importer/decideImport",bodyparser.json(),function(e,o){o.end()}),app.get("/Importer/gettable",function(e,o){fs.readFile("table.json",function(e,t){e?(console.log("Error Reading File"),console.log(e),o.writeHead(404,{"Content-Type":"text/plain"}),o.end()):(o.write(t),o.end())})}),io.on("connection",function(e){console.log(e.handshake.address+" has connected! id: "+e.id),e.on("disconnect",function(){kafkaProducer.send([{topic:"__main_in__",messages:[JSON.stringify({session_id:e.id,username:"troy",password:"1234",return_topic:"troy_out",action:"RELEASE_CONNECTION"})]}],function(o,t){o?console.log(o):console.log("user: "+e.id+" has disconnectted successfully")})})}),io.of("/user").on("connection",function(e){kafkaProducer.send([{topic:"__main_in__",messages:[JSON.stringify({session_id:e.id,username:"troy",password:"1234",return_topic:"troy_out",action:"LOGIN"})]}],function(o,t){o?console.log(o):console.log("user: "+e.id+" has submit info successfully")})}),io.of("/importer").on("connection",function(e){console.log(e.handshake.address+" has connected! id: "+e.id+" Namespace: /importer"),e.on("requestImporterList",function(){kafkaProducer.send([{topic:"__importer_stepOne_list_in__",messages:[JSON.stringify({session_id:e.id,username:"troy",password:"1234",return_topic:"__importer_stepOne_list_out__",location:"brampton",action:"GETALL_IMPORTER"})]}],function(o,t){o?console.log(o):console.log("User "+e.id+" has send importer_list request successfully")})}),e.on("requestImporter",function(o){var t={session_id:e.id,return_topic:"__importer_stepTwoB_importer_out__",action:"QUERY_IMPORTER",payload:{importerName:o.importerName,location:o.location,list_type:"importer",userName:"troy"}};console.log("Requested Importer Info: "+JSON.stringify(t)),kafkaProducer.send([{topic:"__importer_stepTwoB_importer_in__",messages:[JSON.stringify(t)]}],function(o,t){o?console.log(o):console.log("User "+e.id+" has sent importer request successfully")})}),e.on("requestImporterDataItemData",function(o){var t={session_id:e.id,return_topic:"__importer_stepTwoB_dataItem_out__",action:"QUERY_DATAITEM",location:o.location,payload:{name:o.fieldName,list_type:"dataItem"}};kafkaProducer.send([{topic:"__importer_stepTwoB_dataItem_in__",messages:[JSON.stringify(t)]}],function(t,i){t?console.log(t):console.log("User "+e.id+" has sent dataItem request successfully:"+o.fieldName)})}),e.on("createNewImporter",function(o){o.session_id=e.id,o.action="CREATE_IMPORTER",o.return_topic="__importer_stepOne_createImporter_out__",o.type="csv",kafkaProducer.send([{topic:"__importer_stepOne_createImporter_in__",messages:[JSON.stringify(o)]}],function(t,i){t?console.log(t):console.log("User "+e.id+" has sent importer creation request successfully:"+JSON.stringify(o))})}),e.on("decideImporterCreation",function(o){var t={session_id:e.id,return_topic:"__importer_stepTwo_decideCreation_out__",action:"DECIDE_CREATION",location:o.location,userName:o.userName,importerName:o.importerName,list_out:o.data,type:"csv",files:o.files,description:o.description};kafkaProducer.send([{topic:"__importer_stepTwo_decideCreation_in__",messages:[JSON.stringify(t)]}],function(o,t){o?console.log(o):console.log("User "+e.id+" has sent importer creation decision successfully")})})}),kafkaConsumer.on("message",function(e){if("hi"===e.value);else if('"'!==e.value[1])console.log(e.value[1]);else if("__main_out__"===e.topic){var o=JSON.parse(e.value);"SUCCESS"===o.status?console.log("User "+o.username+" (id: "+o.session_id+") has logged in successfully."):"ERROR"===o.status&&console.log("User "+o.username+"'s (id: "+o.session_id+") login failed. Error: "+o.detail)}else if("__importer_stepOne_list_out__"===e.topic){var t=JSON.parse(e.value);t.list_out&&io.of("/importer").to(t.session_id).emit("importerListData",t.list_out)}else if("__importer_stepTwoB_importer_out__"===e.topic){var i=JSON.parse(e.value);i.list_out&&io.of("/importer").to(i.session_id).emit("importerData",i.list_out)}else if("__importer_stepTwoB_dataItem_out__"===e.topic){var s=JSON.parse(e.value);s.list_out&&(console.log("test"),io.of("/importer").to(s.session_id).emit("importerDataItemData",{name:s.payload.name,data:s.list_out}))}else if("__importer_stepOne_createImporter_out__"===e.topic){var r=JSON.parse(e.value);r.list_out&&io.of("/importer").to(r.session_id).emit("importerCreationResponse",{importerName:r.importerName,location:r.location,userName:r.userName,data:r.list_out,files:r.files,description:r.description})}else if("__importer_stepTwo_decideCreation_out__"===e.topic){var n=JSON.parse(e.value);n.list_out&&io.of("/importer").to(n.session_id).emit("importerCreationFinalResponse",n)}else console.log(e)}),process.on("SIGINT",function(){kafkaConsumer.close(!0,function(){console.log("close kafka consumer DONE")}),kafkaProducer.close(function(){console.log("close kafka producer DONE")}),kafkaClient.close(function(){console.log("close kafkaClient DONE")}),process.exit(0)}),server.listen(3e3),console.log("Express Server Is Listenning at 3000");