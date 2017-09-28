/***********************************************
 * Main game
 ***********************************************/

function Game() {

    this.time = 0;        // [s]  Timestamp of game
    this.timeDelta = 0;        // [s]  Difference between game time and external time
    this.timeStep = 1.0 / 60  // [s]  Time step of each update to achieve discrete clock

    /* Game screens */
    this.gameScreen = new GameScreen;

    this.currentScreen = null;

    // ThreeJS globals
    var loader;

    this.changeScreen = function (screen) {
        if (screen) {
            if (this.currentScreen) {
                this.currentScreen.unload(this);
            }
            this.currentScreen = screen;
            this.currentScreen.load(this);
        }
    }

    this.main = function (time) {

        if (this.currentScreen) {

            // Get the difference between external time and last game time
            this.timeDelta = (time / 1000.0) - this.time;

            // Update the screen until synchronized with external time
            var numUpdateCalls = 0;

            while (this.timeDelta > this.timeStep) {
                // Next time step
                this.time += this.timeStep;

                // Update screen
                this.currentScreen.update(this);

                this.timeDelta -= this.timeStep;

                if (++numUpdateCalls > 20) {
                    // console.log("Man, you've got serious performance issues (" + numUpdateCalls + " updates needed)!");
                }
            }

            // Draw screen synchronized with time
            this.currentScreen.draw(this);
        }
    }

    this.init = function () {
        // Global game instance 
        gameInstance = this;

        this.loader = new THREE.JSONLoader();

        this.changeScreen(this.gameScreen);

        // Register event callbacks
        window.addEventListener('keydown', keyDownCallback, true);
        window.addEventListener('keyup', keyUpCallback, true);
        window.addEventListener('mousemove', mouseMoveCallback, true);
        window.addEventListener('mousedown', mouseDownCallback, true);
        window.addEventListener('mouseup', mouseUpCallback, true);
    }

    // Current key state
    this.keyState = new Array();

    /* Checks if given key is pressed */
    this.isKeyPressed = function (key) {
        if (key.Id in this.keyState && this.keyState[key.Id]) {
            return true;
        } else {
            return false;
        }
    }

    // Current mouse state
    this.mouseX = -1;
    this.mouseY = -1;

    this.updateMousePosition = function (state) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouseX = ( event.pageX / window.innerWidth  ) * 2 - 1;
        this.mouseY = -( event.pageY / window.innerHeight ) * 2 + 1;

    }

    /***********************************************
     * Global event callbacks
     ***********************************************/

    function mouseMoveCallback(state) {
        gameInstance.updateMousePosition(state);
    }

    function mouseDownCallback(state) {
        gameInstance.updateMousePosition(state);

        if (gameInstance.currentScreen.mouseDown) {
            gameInstance.currentScreen.mouseDown(gameInstance.mouseX, gameInstance.mouseY);
        }
    }

    function mouseUpCallback(state) {
        gameInstance.updateMousePosition(state);

        if (gameInstance.currentScreen.mouseUp) {
            gameInstance.currentScreen.mouseUp(gameInstance.mouseX, gameInstance.mouseY);
        }
    }

    /* Set down key */
    function keyDownCallback(state) {
        if (gameInstance.currentScreen.keyDown) {
            gameInstance.currentScreen.keyDown(state.keyCode);
        }

        gameInstance.keyState[state.keyCode] = true;
    }

    /* Reset down key */
    function keyUpCallback(state) {
        if (gameInstance.currentScreen.keyUp) {
            gameInstance.currentScreen.keyUp(state.keyCode);
        }

        gameInstance.keyState[state.keyCode] = false;
    }

    this.init();
}

/* Global game instance */
var gameInstance = null;
