var gpio = require("gpio");
var gpio4, intervalTimer;

console.log("Bitte Taster druecken!");
gpio4 = gpio.export(4, {
	direction: "in",
	}
);

gpio4.on("change", function(val) {
   console.log(val)
});

// reset the headers and unexport after 10 seconds
setTimeout(function() {
   clearInterval(intervalTimer);          
   gpio4.removeAllListeners("change");
   gpio4.reset();
   gpio4.unexport(function() {
      console.log("Fertig");
      process.exit(); 
   });
}, 10000)
