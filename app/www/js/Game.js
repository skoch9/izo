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
    
	this.main = function() {
        
        if(this.currentScreen) {
            // Update screen
            this.currentScreen.update(this);

            // Draw screen
            this.currentScreen.draw(this);
        }
        
		this.time += TimeStep;   
	}

	this.init = function() {
        // Global game instance 
		gameInstance = this;
        
		this.changeScreen(this.gameScreen);
        
        // Register event callbacks
        window.addEventListener('keydown',keyDownCallback,true);
		window.addEventListener('keyup',keyUpCallback,true);
		window.addEventListener('mousemove',mouseMoveCallback,true);
		window.addEventListener('mousedown',mouseDownCallback,true);
		window.addEventListener('mouseup',mouseUpCallback,true);
	}	
		
	// Current key state
	this.keyState  = new Array();    
    
	/* Checks if given key is pressed */
	this.isKeyPressed = function(key) {
		if( key.Id in this.keyState && this.keyState[key.Id] ) {
			return true;
		} else {
			return false;
		}
	}	    
    
    // Current mouse state
    this.mouseX     = -1;
    this.mouseY     = -1;
    
	this.updateMousePosition = function(state) {        
    	// calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouseX =   ( event.pageX / window.innerWidth  ) * 2 - 1;
        this.mouseY = - ( event.pageY / window.innerHeight ) * 2 + 1;

	}    
    
    /***********************************************
     * Global event callbacks
     ***********************************************/    

	function mouseMoveCallback(state) {
		gameInstance.updateMousePosition(state);
	}

	function mouseDownCallback(state) {
        gameInstance.updateMousePosition(state);
        
		if(gameInstance.currentScreen.mouseDown) {
			gameInstance.currentScreen.mouseDown(gameInstance.mouseX, gameInstance.mouseY);
		}
	}

	function mouseUpCallback(state) {
        gameInstance.updateMousePosition(state);
        
		if(gameInstance.currentScreen.mouseUp) {
			gameInstance.currentScreen.mouseUp(gameInstance.mouseX, gameInstance.mouseY);
		}
	}	    
   
	/* Set down key */
	function keyDownCallback(state){
		if(gameInstance.currentScreen.keyDown) {
			gameInstance.currentScreen.keyDown(state.keyCode);
		}	
	
		gameInstance.keyState[state.keyCode] = true;
	}

	/* Reset down key */
	function keyUpCallback(state){
		if(gameInstance.currentScreen.keyUp) {
			gameInstance.currentScreen.keyUp(state.keyCode);
		}
	
		gameInstance.keyState[state.keyCode] = false;
	}    
    
	this.init();
}

/* Global game instance */
var gameInstance = null;
