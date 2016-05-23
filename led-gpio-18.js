var gpio = require("gpio");
var gpio18, intervalTimer;

console.log("Hallo");

// Flashing lights if LED connected to GPIO4
gpio18 = gpio.export(18, {
   ready: function() {
      intervalTimer = setInterval(function() {
         gpio18.set();
         setTimeout(function() { gpio18.reset(); }, 500);
      }, 1000);
   }
});

// reset the headers and unexport after 10 seconds
setTimeout(function() {
   clearInterval(intervalTimer);          // stops the voltage cycling

   gpio18.reset();
   gpio18.unexport(function() {
      // unexport takes a callback which gets fired as soon as unexporting is done
	
      console.log("Fertig");
      process.exit(); // exits your node program
   });
}, 10000)
