#!/usr/bin/node
var gpio = require("gpio");
var gpio4, gpio18, intervalTimer;

var sys = require('sys')
var exec = require('child_process').exec;
var child;
var count = 0;

console.log("Start - zum Beenden Taster druecken!");
gpio18 = gpio.export(18, {
	direction: "in",
	}
);
child = exec("sudo gpio -g mode 18 up");

gpio4 = gpio.export(4, {
   	ready: function() {
      		console.log("Taste druecken zum Starten");
	}
   }
);

gpio18.on("change", function (val) {
        if (val == 1) {
		return;
        }
	count++;
	console.log("count %d", count);
        if (count == 1) {
		on();
	}
	if (count == 2) {
		blink();
	}
	if (count == 3) {
		cleanup();
	}
});

function on() {
	gpio4.set();
	console.log("Ein");
}

function blink() {
	console.log("Blink");
	intervalTimer = setInterval(function() {
        	gpio4.set();
        	setTimeout(function() { gpio4.reset(); }, 500);
     	}, 1000);
}
	
function cleanup() {
   console.log("cleanup");
   clearInterval(intervalTimer);          
   gpio18.removeAllListeners("change");
   gpio18.reset();
   gpio18.unexport(function() {
      console.log("Pin 18 fertig");
   });
   gpio4.reset();
   gpio4.unexport(function() {
      console.log("Pin 4 fertig");
   });

   child = exec("sudo gpio -g mode 18 off");
   console.log("Ende");
}

