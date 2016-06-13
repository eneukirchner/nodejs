#!/usr/bin/node

var gpio = require("gpio");
var gpio18, intervalTimer;

var sys = require('sys')
var exec = require('child_process').exec;
var child;



console.log("Bitte Taster druecken!");
gpio18 = gpio.export(18, {
	direction: "in",
	}
);
// Set pullup 
child = exec("sudo gpio -g mode 18 up");

gpio18.on("change", function(val) {
   console.log(val)
});

// reset the headers and unexport after 10 seconds
setTimeout(function() {
   clearInterval(intervalTimer);          
   gpio18.removeAllListeners("change");
   gpio18.reset();
   gpio18.unexport(function() {
      console.log("Fertig");
      child = exec("sudo gpio -g mode 18 off");
      process.exit(); 
   });
}, 10000)
