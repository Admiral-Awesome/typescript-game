/**
 * @author Admiral_Awesome
 * @description class for timer perfomance
 */

class Timer {
    public static endTime: number = 0;
    private static interval: number = 30;
    private isFinished: boolean;
    private currentTime: number;
    private startTime: number;
    private timer: any;

    /**
     * @param time : value of timer in seconds
     */
    constructor(time: number) {
        this.currentTime = time * 1000;
        this.startTime = time * 1000;
        this.isFinished = false;
    }

    getIsFinished(): boolean {
        return this.isFinished;
    }

    getCurrentTime(): number {
        return this.currentTime;
    }
    /**
     * @description starts timer
     * @param losegame - callback on lose
     */
    start(): void {
        let self = this;

        this.timer = setInterval(function () {
            if (self.currentTime >= Timer.endTime) {
                self.currentTime = self.currentTime - Timer.interval;
                
                document.getElementById("timer").innerHTML = self.currentTime/1000 + " sec"
            } else {
                
                self.currentTime = 0;
                document.getElementById("timer").innerHTML = self.currentTime/1000 + " sec"
           
                self.isFinished = true;
                self.stop();
                Level.loseGame("Time is OVER!");
            }
        }, Timer.interval);
    }
    
    stop(): void {
        clearInterval(this.timer);
    }

}