// var express = require("express");
// var app = express();
var WebSocketServer = require('websocket').server;
var http = require('http');

// list of currently connected clients (users)
var clients = [];
var perTrackerClients = {}

let trackerData = {}

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});

server.listen(1337, function () { });


function pingClients() {
   Object.keys(perTrackerClients).forEach((key) => {
        clients = perTrackerClients[key]
        payload = getTrackerDataForKey(key)
        clients.forEach((client) => {client.sendUTF(payload)})
   })
}

//Keep-alive, to make sure clients don't DC
setInterval(pingClients, 25000);

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
    console.log("received connection request")
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    var trackerKey = false
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            
            if (trackerKey === false) {
                //push trackerData for this key
                trackerKey = message.utf8Data
                if (!(trackerKey in perTrackerClients)) {
                    perTrackerClients[trackerKey] = []
                }                
                perTrackerClients[trackerKey].push(connection)
                connection.sendUTF(getTrackerDataForKey(trackerKey))
            } else {
                // process WebSocket message
                var request;
                try {
                    request = JSON.parse(message.utf8Data)
                } catch(e) {
                    console.log("error!")
                    console.log(e)
                    return;
                }

                //toggling an item, then push to all clients
                toggleTrackerData(trackerKey, parseInt(request.player), parseInt(request.item))   
                jsonResponse = getTrackerDataForKey(trackerKey)
                for (var i=0; i < perTrackerClients[trackerKey].length; i++) {                    
                    perTrackerClients[trackerKey][i].sendUTF(jsonResponse);
                }             
            }             
        }
    });

    connection.on('close', function (connection) {
        // close user connection
        clients.splice(index, 1);
    });
});

function getTrackerDataForKey(key) {
    if (!(key in trackerData)) {
        trackerData[key] = [0,0,0,0]
    }

    return trackerData[key]
}

function toggleTrackerData(key, player, item) {
    if (!(key in trackerData)) {
        trackerData[key] = []
    }
    
    if ((trackerData[key][player] & item) === item) {
        trackerData[key][player] = trackerData[key][player] - item
    } else {
        trackerData[key][player] = trackerData[key][player] + item;
    }
}
