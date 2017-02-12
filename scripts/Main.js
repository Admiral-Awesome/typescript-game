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
