/**
 * @author Admiral_Awesome
 * @description game processing
 */

class GameProcess {
    private static level: Level = null;
    public static score: number = 0;
    private static multiplier: number = 1.05;
    private static valueForScore: number = 100;
    private static startTimerValue: number = 8;
    private static levelRectangles: number = 2;
    private static isMultiple: boolean = false;
    private static colorNumber: number = 2;
    startGame() {
        GameProcess.nextLevel();
    }
    static nextLevel(): void {
        if (GameProperties.maxRectanglesStrait >= GameProcess.levelRectangles)
            GameProcess.levelRectangles += 1;
        if (GameProperties.minTimerValue <= GameProcess.startTimerValue)
            GameProcess.startTimerValue -= 0.5;
        GameProcess.setMultiple();

        let level: Level = new Level(GameProcess.levelRectangles, GameProcess.levelRectangles, GameProcess.getColorNumber(), GameProcess.isMultiple, new Timer(GameProcess.startTimerValue))
        level.generateLevel();

    }
    static setMultiple(): void {
        var tmpRand = Math.floor(Math.random() * 100);

        GameProcess.isMultiple = tmpRand > GameProperties.singleColorChance ? true : false;
    }

    static incScore(): void {
        GameProcess.score += GameProcess.multiplier * GameProcess.valueForScore;
        GameProcess.multiplier += 0.05;
        GameProcess.valueForScore += 5;

    }

    static getColorNumber(): number {
        var tmpRand = Math.floor(Math.random() * 10);

        if (GameProcess.colorNumber < GameProperties.maxColorNumber) {
            if (tmpRand < 2) {
                // console.log(GameProcess.colorNumber)
                GameProcess.colorNumber += 1;
            }

        }

        return GameProcess.colorNumber;
    }


}