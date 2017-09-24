/***********************************************
 * Game screen
 ***********************************************/
 
function GameScreen() {



    var scene       = new THREE.Scene();
    var camera      = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 10, 10);

    var renderer    = new THREE.WebGLRenderer();

    var mixer = new THREE.AnimationMixer(scene);
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    var pointLight = new THREE.PointLight(0xff4400, 5, 30);//ff4400
    var water;
    var platy;


    var loader = new THREE.JSONLoader();
    var raycaster   = new THREE.Raycaster();
    
    var targetPosition = new THREE.Vector3();
    var targetDirection= new THREE.Vector3();
    
    window.addEventListener('resize', function () 
    {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
        
    });    
    
    this.load = function() {

        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        // lights
        scene.add(ambientLight);
        pointLight.position.set(5, 10, 5);
        scene.add(pointLight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // scene.fog = new THREE.FogExp2(0x000000, 0.035);
        // Setup camera
        // camera.position.z = 5;

        loader.load('assets/platy.json', function (geometry, materials) {
            platy = new THREE.Mesh(geometry, materials);
            platy.position.set(-1, 3, 3);
            // var s = THREE.Math.randFloat(0.00075, 0.001);
            var s = 0.5;
            platy.scale.set(s, s, s);
            //platy.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
            //platy.matrixAutoUpdate = false;
            platy.updateMatrix();
            scene.add(platy);

        });
        loader.load('assets/water.json', function (geometry, materials) {
            water = new THREE.Mesh(geometry, materials);
            // mesh.position.set(3, 3, 3);
            scene.add(water);
        });

        loader.load('assets/test2.json', function (geometry, materials) {
            // adjust color a bit
            var mesh = new THREE.Mesh(geometry, materials);
            mesh.position.set(0,0,0);
            // console.log(geometry, materials)
            scene.add(mesh);
            // var material = materials[0];
            // material.morphTargets = true;
            // material.color.setHex(0xffaaaa);
            // for (var i = 0; i < 1; i++) {
            // random placement in a grid
            // var x = ( ( i % 27 ) - 13.5 ) * 2 + THREE.Math.randFloatSpread(1);
            // var z = ( Math.floor(i / 27) - 13.5 ) * 2 + THREE.Math.randFloatSpread(1);
            // mesh.position.set(0, 0, 0);
            // var s = THREE.Math.randFloat(0.00075, 0.001);
            // mesh.scale.set(s, s, s);
            // mesh.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
            // mesh.matrixAutoUpdate = false;
            // mesh.updateMatrix();
                // mixer.clipAction(geometry.animations[0], mesh)
                //     .setDuration(1)			// one second
                //     .startAt(-Math.random())	// random phase (already running)
                //     .play();					// let's go
            // }
        });

        // scene.add( cube );
	};

	this.unload = function() {

	};
	
	this.draw = function(game) {
        // requestAnimationFrame(animate);

        camera.position.x = Math.cos(game.time / 5) * 10;
        camera.position.y = 8;
        camera.position.z = Math.sin(game.time / 5) * 10;
        pointLight.position.x = Math.sin(game.time) * 3;
        pointLight.position.z = Math.cos(game.time) * 3;
        water.position.y += THREE.Math.randFloat(-0.01, 0.01);

        mixer.update(game.time);
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        // document.getElementById("hud").innerHTML = "t = " + t.toFixed(1) + " s";
    };
		
	this.update = function(t) {

		if ( game.isKeyPressed(Keys.LEFT) ){
			water.position.y -= 0.01;
		}
		if ( game.isKeyPressed(Keys.RIGHT) ){
			water.position.y += 0.01;
		}

        

        
        // Move to target position
        if( platy.position.distanceTo( targetPosition ) > 0.1)
        {        
            
            
            targetDirection.copy( targetPosition );
            targetDirection.sub( platy.position );
            
            
            
            targetDirection.normalize();
            
            platy.rotation.y = Math.atan(targetDirection.z / targetDirection.x)
            
            targetDirection.multiplyScalar(0.1);
            
     
            platy.position.add( targetDirection );    
            
        }
            
	};


    this.mouseUp = function(mouseX, mouseY) {
        
    };
    
    
    
    this.mouseDown = function(mouseX, mouseY) {
        var mouse = new THREE.Vector2(mouseX, mouseY);
        
        raycaster.setFromCamera( mouse, camera );
        
        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );

        for ( var i = 0; i < intersects.length; i++ ) {    

            targetPosition.copy( intersects[ i ].point );
            //console.log(targetPosition)
            targetPosition.y += 1;
        }
        
        
    }
       
}




