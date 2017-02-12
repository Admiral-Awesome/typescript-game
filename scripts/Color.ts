export class Color {
    private name : string;
    private color : string;

    Constructor (name : string, color : string) {
        this.name = name;
        this.color = color;
    }

    getName() : string {
        return this.name;
    }
    getColor() : string {
        return this.color;
    }

}