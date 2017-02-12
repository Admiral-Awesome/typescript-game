/**
 * @author Admiral_Awesome
 * @description class for timer perfomance
 */
export declare class Timer {
    static endTime: number;
    private static interval;
    private isFinished;
    private currentTime;
    private startTime;
    private timer;
    /**
     * @param time : value of timer in seconds
     */
    constructor(time: number);
    getIsFinished(): boolean;
    getCurrentTime(): number;
    start(losegame: any): void;
    stop(): void;
}
