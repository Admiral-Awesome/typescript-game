/**
 * @author Admiral_Awesome
 * @description game processing
 */
var GameProcess = (function () {
    function GameProcess() {
    }
    GameProcess.prototype.startGame = function () {
        GameProcess.nextLevel();
    };
    GameProcess.nextLevel = function () {
        if (GameProperties.maxRectanglesStrait >= GameProcess.levelRectangles)
            GameProcess.levelRectangles += 1;
        if (GameProperties.minTimerValue <= GameProcess.startTimerValue)
            GameProcess.startTimerValue -= 0.5;
        GameProcess.setMultiple();
        var level = new Level(GameProcess.levelRectangles, GameProcess.levelRectangles, GameProcess.getColorNumber(), GameProcess.isMultiple, new Timer(GameProcess.startTimerValue));
        level.generateLevel();
    };
    GameProcess.setMultiple = function () {
        var tmpRand = Math.floor(Math.random() * 100);
        GameProcess.isMultiple = tmpRand > GameProperties.singleColorChance ? true : false;
    };
    GameProcess.incScore = function () {
        GameProcess.score += GameProcess.multiplier * GameProcess.valueForScore;
        GameProcess.multiplier += 0.05;
        GameProcess.valueForScore += 5;
    };
    GameProcess.getColorNumber = function () {
        var tmpRand = Math.floor(Math.random() * 10);
        if (GameProcess.colorNumber < GameProperties.maxColorNumber) {
            if (tmpRand < 2) {
                // console.log(GameProcess.colorNumber)
                GameProcess.colorNumber += 1;
            }
        }
        return GameProcess.colorNumber;
    };
    return GameProcess;
}());
GameProcess.level = null;
GameProcess.score = 0;
GameProcess.multiplier = 1.05;
GameProcess.valueForScore = 100;
GameProcess.startTimerValue = 8;
GameProcess.levelRectangles = 2;
GameProcess.isMultiple = false;
GameProcess.colorNumber = 2;
