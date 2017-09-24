/***********************************************
 * Initialization
 ***********************************************/

window.onload = main;

var game = new Game;

// Running the game loop
function main() {
    requestAnimationFrame( main );
    
	game.main()
}