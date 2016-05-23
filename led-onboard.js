var gpio = require("gpio");
var gpio47, intervalTimer;

console.log("Hallo");

// Flashing lights if LED connected to GPIO4
gpio47 = gpio.export(47, {
   ready: function() {
      intervalTimer = setInterval(function() {
         gpio47.set();
         setTimeout(function() { gpio47.reset(); }, 500);
      }, 1000);
   }
});

// reset the headers and unexport after 10 seconds
setTimeout(function() {
   clearInterval(intervalTimer);          // stops the voltage cycling

   gpio47.reset();
   gpio47.unexport(function() {
      // unexport takes a callback which gets fired as soon as unexporting is done
	
      console.log("Fertig");
      process.exit(); // exits your node program
   });
}, 10000)
