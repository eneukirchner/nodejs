var gpio = require("/home/coder/coder-dist/coder-base/node_modules/gpio");
gpio.logging = true;

var gpio4 = gpio.export(4, {
   direction: "out",
   ready: function() {
   }
});

gpio4.set(function() {
   console.log(gpio4.value);    // should log 1
});

gpio4.unexport();
