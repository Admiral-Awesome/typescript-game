/**
 * @author Admiral_Awesome
 * @description describes rectangle for game level
 */

class Rectangle {
    private color: Color;
    private height: string;
    private width: string;
    private element: any;
    private static gameDiv: any = document.getElementById('game');
    private static levelRectangles: Rectangle[] = [];

    constructor(color: Color, height: string, width: string, winFunc: any) {
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
    addRectangle(): void {
        Rectangle.gameDiv.appendChild(this.element);
    }
    static drawAll(): void {
        Rectangle.levelRectangles.forEach(function (rect) {
            rect.addRectangle();
        });
    }
    click(testWin: any): any {
        var self = this;
        return function () {
            testWin(self.color);
        }
    }
    static drawArray(rectungles: Rectangle[]): void {
        rectungles.forEach(function (rect) {
            rect.addRectangle();
        });
    }
    static destroyAll(): void {
        Rectangle.levelRectangles = [];
        Rectangle.gameDiv.innerHTML = "";

    }




}


