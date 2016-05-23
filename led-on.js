var gpio = require("/home/coder/coder-dist/coder-base/node_modules/gpio");
gpio.logging = true;

var ledGPIOID = 4; //actually pin 7, 4 down on left header
var ledDevice;


var enableGPIO = function() {
    
    // Set up the LED output GPIO
    console.log("Setting up LED as an output on GPIO " + ledGPIOID );
    ledDevice = gpio.export( ledGPIOID, {
        ready: function() {
            // This works around a bug in gpio, where sometimes this device
            // doesn't become immediately available.
            setTimeout( function() {
                ledDevice.setDirection("out");
            }, 200); //wait 100 ms before setting direction
        }
    });
}

var disableGPIO = function() {
    console.log("Disabling GPIO" + ledGPIOID );
    ledDevice.removeAllListeners();
    ledDevice.reset();
    ledDevice.unexport();
};

var setLED = function( val ) {
    val = parseInt( val );
    if ( val !== 0 ) {
        val = 1;
    }
    ledDevice.set( val );
};

enableGPIO();
setLED(1);
disableGPIO();





