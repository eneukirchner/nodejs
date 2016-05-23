function displayTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    
        if (hours < 10) {
            hours = "0" + hours;
        }
        
        text = hours + ":" + minutes + ":" + seconds;
	console.log(text);
    }


setInterval(displayTime, 1000);

