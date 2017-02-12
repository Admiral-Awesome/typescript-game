/**
 * @author Admiral_Awesome
 * @description game level generation
 */

class Level {
    public static colors: Color[] = [
        new Color("red", "#ff0000"),
        new Color("blue", "#0000CD"),
        new Color("green", "#32CD32"),
        new Color("pink", "#FF00FF"),
        new Color("gray", "#708090"),
        new Color("orange", "#FF8C00"),
        new Color("yellow", "#FFFF00"),
        new Color("black", "#000000")
    ];

    private winColor: Color;
    private colorsNumber: number;
    private isMultipleColorWin: boolean;
    private rectunglesNumberX: number;
    private rectunglesNumberY: number;
    private timer: Timer;

    constructor(rectungleNumberX: number, rectungleNumberY: number, colorsNumber: number, isMultipleColorWin: boolean, timer: Timer) {
        this.colorsNumber = colorsNumber;
        this.rectunglesNumberX = rectungleNumberX;
        this.rectunglesNumberY = rectungleNumberY;
        this.isMultipleColorWin = isMultipleColorWin;
        this.timer = timer;

    }
    generateLevel(): void {
        var tmpColor: Color[] = [];
        for (var i = 0; i < Level.colors.length; i++) {
            tmpColor.push(Level.colors[i]);
        }
        //choose win color
        var randTmp = Math.floor(Math.random() * tmpColor.length);
        this.winColor = tmpColor[randTmp];
        var levelColors: Color[] = [];
        if (this.isMultipleColorWin) {
            tmpColor.splice(randTmp, 1);
        } else {
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

        var winPosition: any = { x: Math.floor(Math.random() * this.rectunglesNumberX), y: Math.floor(Math.random() * this.rectunglesNumberY) };
        //generates rectangle
        var rectangles : Rectangle[] = [];
        for (var i = 0; i < this.rectunglesNumberX; i++) {
            for (var j = 0; j < this.rectunglesNumberX; j++) {
                if ( i === winPosition.x && j === winPosition.y) {
                    rectangles.push(new Rectangle(this.winColor,GameProperties.gameHeight/(this.rectunglesNumberY+3) + "px", GameProperties.gameWidth/(this.rectunglesNumberX+3) + "px" ,this.testWin()))
                } else {
                    rectangles.push(new Rectangle(levelColors[Math.floor(Math.random()*levelColors.length)],GameProperties.gameHeight/(this.rectunglesNumberY+3) + "px", GameProperties.gameWidth/(this.rectunglesNumberX+3) + "px" , this.testWin()))
                
                }
            }
        }

        Rectangle.drawArray(rectangles);
        this.timer.start();

    }

    testWin() {
        var self = this;
        return function(color : Color) {
        if (color.getColor() === self.winColor.getColor()) {
            return function() {
                Rectangle.destroyAll();
                self.timer.stop();
                GameProcess.incScore();
                setTimeout(function() {
                    GameProcess.nextLevel();
                },500);
                
            }
        } else {
            return function() {
                Level.loseGame("Wrong color !")
            }
        }
        }
    }
    static loseGame(reason : string) : void {
        alert("Your score "+GameProcess.score + "\n" + reason)
        location.reload();  
    }

}