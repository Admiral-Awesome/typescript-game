/**
 * @author Admiral_Awesome
 * @description class for game property
 */
var GameProperties = (function () {
    function GameProperties() {
    }
    return GameProperties;
}());
GameProperties.gameWidth = window.innerWidth;
GameProperties.gameHeight = window.innerHeight * 0.8;
GameProperties.minTimerValue = 3;
GameProperties.maxRectanglesStrait = 20;
GameProperties.singleColorChance = 30;
GameProperties.maxColorNumber = 7;
/**
 * @author Admiral_Awesome
 * @description describes rectangle for game level
 */
var Rectangle = (function () {
    function Rectangle(color, height, width, winFunc) {
        this.color = color;
        this.height = height;
        this.width = width;
        this.element = document.createElement("div");
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.backgroundColor = color.getColor();
        this.element.style.border = "1px Solid white";
        Rectangle.levelRectangles.push(this);
        this.element.onclick = winFunc(this.color);
    }
    Rectangle.prototype.addRectangle = function () {
        Rectangle.gameDiv.appendChild(this.element);
    };
    Rectangle.drawAll = function () {
        Rectangle.levelRectangles.forEach(function (rect) {
            rect.addRectangle();
        });
    };
    Rectangle.prototype.click = function (testWin) {
        var self = this;
        return function () {
            testWin(self.color);
        };
    };
    Rectangle.drawArray = function (rectungles) {
        rectungles.forEach(function (rect) {
            rect.addRectangle();
        });
    };
    Rectangle.destroyAll = function () {
        Rectangle.levelRectangles = [];
        Rectangle.gameDiv.innerHTML = "";
    };
    return Rectangle;
}());
Rectangle.gameDiv = document.getElementById('game');
Rectangle.levelRectangles = [];
/**
 * @author Admiral_Awesome
 * @description describes coror name and id;
 */
var Color = (function () {
    function Color(name, color) {
        this.name = name;
        this.color = color;
    }
    Color.prototype.getName = function () {
        return this.name;
    };
    Color.prototype.getColor = function () {
        return this.color;
    };
    return Color;
}());
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
/**
 * @author Admiral_Awesome
 * @description game level generation
 */
var Level = (function () {
    function Level(rectungleNumberX, rectungleNumberY, colorsNumber, isMultipleColorWin, timer) {
        this.colorsNumber = colorsNumber;
        this.rectunglesNumberX = rectungleNumberX;
        this.rectunglesNumberY = rectungleNumberY;
        this.isMultipleColorWin = isMultipleColorWin;
        this.timer = timer;
    }
    Level.prototype.generateLevel = function () {
        var tmpColor = [];
        for (var i = 0; i < Level.colors.length; i++) {
            tmpColor.push(Level.colors[i]);
        }
        //choose win color
        var randTmp = Math.floor(Math.random() * tmpColor.length);
        this.winColor = tmpColor[randTmp];
        var levelColors = [];
        if (this.isMultipleColorWin) {
            tmpColor.splice(randTmp, 1);
        }
        else {
            levelColors.push(tmpColor[randTmp]);
            tmpColor.splice(randTmp, 1);
        }
        document.getElementById("color").style.color = this.winColor.getColor();
        document.getElementById("color").style.background = this.winColor.getColor();
        //choose colors 
        for (var i = 0; i < this.colorsNumber; i++) {
            var randTmp = Math.floor(Math.random() * tmpColor.length);
            levelColors.push(tmpColor[randTmp]);
            tmpColor.splice(randTmp, 1);
        }
        var winPosition = { x: Math.floor(Math.random() * this.rectunglesNumberX), y: Math.floor(Math.random() * this.rectunglesNumberY) };
        //generates rectangle
        var rectangles = [];
        for (var i = 0; i < this.rectunglesNumberX; i++) {
            for (var j = 0; j < this.rectunglesNumberX; j++) {
                if (i === winPosition.x && j === winPosition.y) {
                    rectangles.push(new Rectangle(this.winColor, GameProperties.gameHeight / (this.rectunglesNumberY + 3) + "px", GameProperties.gameWidth / (this.rectunglesNumberX + 3) + "px", this.testWin()));
                }
                else {
                    rectangles.push(new Rectangle(levelColors[Math.floor(Math.random() * levelColors.length)], GameProperties.gameHeight / (this.rectunglesNumberY + 3) + "px", GameProperties.gameWidth / (this.rectunglesNumberX + 3) + "px", this.testWin()));
                }
            }
        }
        Rectangle.drawArray(rectangles);
        this.timer.start();
    };
    Level.prototype.testWin = function () {
        var self = this;
        return function (color) {
            if (color.getColor() === self.winColor.getColor()) {
                return function () {
                    Rectangle.destroyAll();
                    self.timer.stop();
                    GameProcess.incScore();
                    setTimeout(function () {
                        GameProcess.nextLevel();
                    }, 500);
                };
            }
            else {
                return function () {
                    Level.loseGame("Wrong color !");
                };
            }
        };
    };
    Level.loseGame = function (reason) {
        alert("Your score " + GameProcess.score + "\n" + reason);
        location.reload();
    };
    return Level;
}());
Level.colors = [
    new Color("red", "#ff0000"),
    new Color("blue", "#0000CD"),
    new Color("green", "#32CD32"),
    new Color("pink", "#FF00FF"),
    new Color("gray", "#708090"),
    new Color("orange", "#FF8C00"),
    new Color("yellow", "#FFFF00"),
    new Color("black", "#000000")
];
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
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        alert("Choose right color until time is end");
        var game = new GameProcess();
        game.startGame();
    };
    return Main;
}());
Main.main();
