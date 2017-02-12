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
