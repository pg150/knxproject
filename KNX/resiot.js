var knx = require ('knx')

var knx = require ('knx')
/*
var connection = new knx.Connection( {
  // ip address and port of the KNX router or interface
  ipAddr: '192.168.1.10', 
  ipPort: 3671,

  handlers: {
    connected: function() {
      console.log('On est connecté');
    },
    // get notified for all KNX events:
    event: function(evt, src, dest, value) { console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt, src, dest, value
      );
      var json = JSON.stringify(value);
      var bin = JSON.parse(json).data[0];
      //console.log(bin);
      controlchenillard(connection, dest, bin);
      if (WSconnection.connected) {
          var json = {dest : dest, state : state}
         WSconnection.sendUTF(JSON.stringify(json));
       }

    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});
*/

process.on('SIGINT',function(){
  connection.Disconnect()
  console.log('Disconnected')
  process.exit();
})


var nb=1;
var temps = 1000;
var chenil;
var sens;

function chenillard(connection,sens){
  if(sens){
    console.log("chenillard")
    switch (nb) {
      case 1:
        connection.write("0/1/1", 1);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 0);
        break;
      case 2:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 1);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 0);
        break;
      case 3:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 1);
        connection.write("0/1/4", 0);
        break;
      case 4:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 1);
        nb = 0
        break;

    }
    nb+=1
  }
  else {
    console.log("chenillard inv ")
    console.log(nb)
    switch (nb) {
      case 1:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 1);
          break;
      case 2:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 1);
        connection.write("0/1/4", 0);
        break;
      case 3:
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 1);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 0);
        break;
      case 4:
        connection.write("0/1/1", 1);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 0);
        nb = 0;
        break;

    }
    nb+=1
  }

}


function controlchenillard(connection, dest, bin){
  if (dest == "0/3/1"){
    clearInterval(chenil);
    if(bin == 0){
      sens = true;
      chenil = setInterval(function() {chenillard(connection, sens)}, temps);
    }
    else{
      sens = false;
      chenil = setInterval(function() {chenillard(connection, sens)}, temps);
    }
  }
  if(dest == "0/3/2"){
    temps += 500;
    clearInterval(chenil);
    chenil = setInterval(function() {chenillard(connection, sens)}, temps);
  }
  if(dest == "0/3/3"){
    if((temps - 500) >= 500 ){
      temps -= 500;
      clearInterval(chenil);
      chenil = setInterval(function() {chenillard(connection, sens)}, temps);
    }
    else{
      console.log("delai de temps trop court");
      clearInterval(chenil);
      chenil = setInterval(function() {chenillard(connection, sens)}, temps);
    }
  }
  if (dest == "0/3/4"){
    if(bin == 0){
      clearInterval(chenil);
      connection.write("0/1/1", 0);
      connection.write("0/1/2", 0);
      connection.write("0/1/3", 0);
      connection.write("0/1/4", 0);
    }
    else{
      clearInterval(chenil);
      chenil = setInterval(function() {chenillard(connection, sens)}, temps);
    }
  }
}




var express = require('express'),
fs = require('fs'),
bodyParser=require('body-parser')
app = express(),
port= parseInt(process.env.PORT,10) || 8080
app.use(function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Methods','POST'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next(); 
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Bienvenue sur notre projet KNX');
});

app.listen(3030, () => console.log('App listening on port 3030!'));

app.post('/start', (req, res) => {
  console.log('Mise en marche du chenillard');
    var json = {dest : "0/1/3", state : "1"}
   WSconnection.sendUTF(JSON.stringify(json));
  //clearInterval(chenil);
  //chenil = setInterval(function() {chenillard(connection, sens)}, temps)
})

app.post('/stop', (req, res) => {
  console.log('Arret du chenillard');
  /*clearInterval(chenil);
        connection.write("0/1/1", 0);
        connection.write("0/1/2", 0);
        connection.write("0/1/3", 0);
        connection.write("0/1/4", 0);*/
})

app.post('/inverse', (req, res) => {
  console.log('inverse le sens du chenillard');
  sens = !sens
  //clearInterval(chenil);
  //chenil = setInterval(function() {chenillard(connection, sens)}, temps)
})

app.post('/vitesse', (req, res) => {
  console.log('changement vitesse chenillard');
  var keys = Object.keys(req.body);
  var vitesse = keys[0]
  console.log(vitesse)
  //temps = this.vitesse
  //clearInterval(chenil);
  //chenil = setInterval(function() {chenillard(connection, sens)}, temps)
  
})




const WebSocketServer = require('websocket').server;
const http = require('http');
var WSconnection;

const server = http.createServer((request, response) => {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1234, () => {
  console.log('Websocket listening on port : 1234');
});

// create the server
let wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', request => {
  WSconnection = request.accept(null, request.origin);
  console.log('someone connected');

  WSconnection.on('message', msg => {
    if (msg.type === 'utf8') {
      console.log("message :" + msg)
    }
  });

  WSconnection.on('close', connection => {
  });
});

