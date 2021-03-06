﻿var pass = "BC58";  
var five = require("johnny-five"), board, servo;
var com = require("serialport");

// Inicia puerto serial 
var serialPort = new com.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: com.parsers.readline('\n')
  });

serialPort.on('open', function() {
    console.log('Iniciando...');
    });

// Inicia Arduino
board = new five.board();

// Parametros de movimiento para servo
board.on("ready", function() {
  [
    [ 91, "ccw" ],
    [ 89, "cw" ]

  ].forEach(function( def ) {
    five.Servo.prototype[ def[1] ] = function() {
      this.move( def[0] );
    };
  });
  
  // Iniciar servo
servo = new five.Servo({
    pin: 10,
    type: "default"
    });

board.repl.inject({
    servo: servo
    });

 // servo.move(90);
});

serialPort.on('data', function(data) {
    // pass: BC58
    var dataaux = data.toString('utf-8').trim();
    if (dataaux == pass){
        console.log('Autorizado');
        servo.move(90);
        }


});
