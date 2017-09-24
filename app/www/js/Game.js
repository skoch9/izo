/***********************************************
 * Main game 
 ***********************************************/

function Game() {

	this.time = 0;

	/* Game screens */
	this.gameScreen = new GameScreen;
	
	this.currentScreen = null;

	this.changeScreen = function(screen) {
		if(screen) {
			if(this.currentScreen) {
				this.currentScreen.unload(this);
			}
			this.currentScreen = screen;
			this.currentScreen.load(this);
		}
	}

	/* Main loop invoked by setInterval callback */
	this.main = function() {
        
        if(this.currentScreen) {
            // Update screen
            this.currentScreen.update(this.time);

            // Draw screen
            this.currentScreen.draw(this.time);
        }
        
		this.time += TimeStep;   
	}

	this.init = function() {
		this.changeScreen(this.gameScreen);
	}	
		
	this.init();
}