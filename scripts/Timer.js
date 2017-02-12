/**
 * @author Admiral_Awesome
 * @description class for timer perfomance
 */
var Timer = (function () {
    /**
     * @param time : value of timer in seconds
     */
    function Timer(time) {
        this.currentTime = time * 1000;
        this.startTime = time * 1000;
        this.isFinished = false;
    }
    Timer.prototype.getIsFinished = function () {
        return this.isFinished;
    };
    Timer.prototype.getCurrentTime = function () {
        return this.currentTime;
    };
    /**
     * @description starts timer
     * @param losegame - callback on lose
     */
    Timer.prototype.start = function () {
        var self = this;
        this.timer = setInterval(function () {
            if (self.currentTime >= Timer.endTime) {
                self.currentTime = self.currentTime - Timer.interval;
                document.getElementById("timer").innerHTML = self.currentTime / 1000 + " sec";
            }
            else {
                self.currentTime = 0;
                document.getElementById("timer").innerHTML = self.currentTime / 1000 + " sec";
                self.isFinished = true;
                self.stop();
                Level.loseGame("Time is OVER!");
            }
        }, Timer.interval);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.timer);
    };
    return Timer;
}());
Timer.endTime = 0;
Timer.interval = 30;
