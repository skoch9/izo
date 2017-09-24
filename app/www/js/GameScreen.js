/***********************************************
 * Game screen
 ***********************************************/
 
function GameScreen() {
    
    var scene       = new THREE.Scene();
    var camera      = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer    = new THREE.WebGLRenderer();

    var geometry    = new THREE.BoxGeometry( 1, 1, 1 );
    var material    = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube        = new THREE.Mesh( geometry, material );    
    
	this.load = function() {

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // Setup camera
        camera.position.z = 5;
        
        scene.add( cube );
	}

	this.unload = function() {

	}
	
	this.draw = function(t) {
        renderer.render(scene, camera);
        
        //document.getElementById("hud").innerHTML = "t = " + t.toFixed(1) + " s";
	}
	

	this.update = function(t) {
        
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
	}

    this.mouseUp = function(mouseX, mouseY) {
        
    }
    
    this.mouseDown = function(mouseX, mouseY) {
        
    }
}




