import * as net from "net";
import express from 'express';
import expressWs from 'express-ws';
import {TelnetInput, TelnetOutput} from 'telnet-stream';
import * as StreamArray from 'stream-json/utils/StreamArray';

var app = express();
expressWs(app);

app.use((req, res, next) => {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
 
app.get('/', (req, res, next) => {
  console.log('get route', req.testing);
  res.end();
});
 
app.ws('/', (ws, req) => {
  let socket = net.createConnection(2010, 'localhost', () => {
    telnetToJsonWs(socket, ws);

    let telnetOutput = new TelnetOutput();
    telnetOutput.pipe(socket);

    ws.on('message', msg => {
      telnetOutput.write(msg);
      console.log(msg);
    });

    ws.on('close', (code, msg) => {
      console.log("websocket stream closed");
      socket.destroy();
    });
  });

  socket.on('close', had_error => {
    console.log("telnet stream closed");
    ws.close(1000, "telnet stream closed unexpectedly");
  });

  console.log('socket', req.testing);
});

function telnetToJsonWs(socket, ws) {
  let telnetInput = new TelnetInput();
  let jsonStream = StreamArray.make();

  socket.pipe(telnetInput).pipe(jsonStream.input);

  jsonStream.output.on('data', object => {
    ws.send(JSON.stringify(object.value));
    console.log(object.index, object.value);
  });

  jsonStream.output.on('end', () => {
    socket.unpipe(telnetInput).unpipe(jsonStream.input);
    telnetToJsonWs(socket, ws);
  });

  return jsonStream;
}
 
app.listen(8080);