/***********************************************
 * Game screen
 ***********************************************/
 
function GameScreen() {
    
    var scene       = new THREE.Scene();
    var camera      = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    var renderer    = new THREE.WebGLRenderer();

    var cubeMaterial= new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube        = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), cubeMaterial );    
      
    
	this.load = function() {

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // Setup camera
        
        camera.position.z = 5;
        
        cube.rotation.y = 0.3;
        
        scene.add( cube );
	}

	this.unload = function() {

	}
	
	this.draw = function(game) {
        renderer.render(scene, camera);
        
        document.getElementById("hud").innerHTML = "t = " + game.time.toFixed(1) + " s";
	}
	

	this.update = function(game) {
		
		if ( game.isKeyPressed(Keys.LEFT) ){
			cube.rotation.x -= 0.1;
		}
		if ( game.isKeyPressed(Keys.RIGHT) ){
			cube.rotation.x += 0.1;
		}
	}

    this.mouseUp = function(mouseX, mouseY) {
        
    }
    
    this.mouseDown = function(mouseX, mouseY) {
        
    }
       
}




