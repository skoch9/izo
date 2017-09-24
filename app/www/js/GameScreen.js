/***********************************************
 * Game screen
 ***********************************************/
 
function GameScreen() {
    
    var scene       = new THREE.Scene();
    var camera      = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    // var camera = new THREE.OrthographicCamera( window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2,-10, 10 );
    var renderer    = new THREE.WebGLRenderer();

    var cubeMaterial= new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube        = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), cubeMaterial );    
      
    var raycaster   = new THREE.Raycaster();
    
    window.addEventListener('resize', function () 
    {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
        
    });    
    
	this.load = function() {

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // Setup camera
        
        
        
        camera.position.x = 2;
        camera.position.y = 2;
        camera.position.z = 2;
        
        camera.lookAt( cube.position );
        
        cube.rotation.y = 0.3;
        
        scene.add( cube );
	}

	this.unload = function() {

	}
	
	this.draw = function(game) {
        renderer.render(scene, camera);
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
        var mouse = new THREE.Vector2(mouseX, mouseY);
        
        raycaster.setFromCamera( mouse, camera );
        
        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );

        for ( var i = 0; i < intersects.length; i++ ) {    
            cube.position.x = intersects[ i ].point.x;
            cube.position.y = intersects[ i ].point.y;
            cube.position.z = intersects[ i ].point.z;
            
        }
        
        
    }
       
}




