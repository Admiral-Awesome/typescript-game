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
