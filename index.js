import * as net from "net";
import express from 'express';
import expressWs from 'express-ws';
import {TelnetInput, TelnetOutput} from 'telnet-stream';
import * as StreamArray from 'stream-json/utils/StreamArray';
import TelnetConstants from './server-constants';

const TermType = "acme";

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
    let telnetInput = telnetToJsonWs(socket, ws);
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

    telnetInput.on('do', option => {
      console.log('do', option, TelnetConstants.TELOPT_TTYPE);
      switch (option) {
        case TelnetConstants.TELOPT_TTYPE:
          console.log('write will termtype');
          telnetOutput.writeWill(TelnetConstants.TELOPT_TTYPE);
          break;
      }
    });

    telnetInput.on('sub', (option, buffer) => {
      console.log('sub', option, buffer);
      switch (option) {
        case TelnetConstants.TELOPT_TTYPE:
          if (buffer[0] == TelnetConstants.TELQUAL_SEND) {
            let ttype = TermType.split('').map(c => { return c.charCodeAt(0) });
            let buffer = Buffer.from([
              TelnetConstants.TELQUAL_IS,
              ...ttype,
            ]);
            console.log('write sub termtype', buffer);
            telnetOutput.writeSub(TelnetConstants.TELOPT_TTYPE, buffer);
          } else {
            console.log("invalid termtype subnegotation received", buffer);
          }
      }

    });


  });

  socket.on('close', had_error => {
    console.log("telnet stream closed");
    ws.close(1000, "telnet stream closed unexpectedly");
  });

  console.log('socket', req.testing);
});

function telnetToJsonWs(socket, ws) {
  var telnetInput = new TelnetInput();
  var jsonStream = StreamArray.make();

  socket.pipe(telnetInput).pipe(jsonStream.input);

  jsonStream.output.on('data', object => {
    ws.send(JSON.stringify(object.value));
    console.log(object.index, object.value);
  });

  jsonStream.output.on('end', () => {
    socket.unpipe(telnetInput).unpipe(jsonStream.input);
    telnetToJsonWs(socket, ws);
  });

  return telnetInput;
}
 
app.listen(8080);