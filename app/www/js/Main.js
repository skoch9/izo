/***********************************************
 * Initialization
 ***********************************************/

window.onload = main;

var game = new Game;

// Running the game loop
function main(time) {
    requestAnimationFrame( main );

    game.main(time)    
}