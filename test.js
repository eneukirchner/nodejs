function displayTemp() {
	var fs = require('fs');
	fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8', function(err, contents) {
    		console.log(contents);
	}); 
}

setInterval(displayTemp, 1000);

