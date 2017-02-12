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
