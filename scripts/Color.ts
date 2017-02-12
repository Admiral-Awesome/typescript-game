/**
 * @author Admiral_Awesome
 * @description describes coror name and id;
 */

class Color {
    private name: string;
    private color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    getName(): string {
        return this.name;
    }
    getColor(): string {
        return this.color;
    }

}