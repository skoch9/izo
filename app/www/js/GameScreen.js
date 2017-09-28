/***********************************************
 * Game screen
 ***********************************************/

function GameScreen() {


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 10);

    var renderer = new THREE.WebGLRenderer();

    var mixer = new THREE.AnimationMixer(scene);
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    var pointLight = new THREE.PointLight(0xff4400, 5, 30);//ff4400
    var water;
    var platy;
    var surface;
    var raycaster = new THREE.Raycaster(); // Move to game class

    var targetPosition = new THREE.Vector3();
    var targetDirection = new THREE.Vector3();

    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

    });

    this.load = function (game) {

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        // lights
        scene.add(ambientLight);
        pointLight.position.set(5, 10, 5);
        scene.add(pointLight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // scene.fog = new THREE.FogExp2(0x000000, 0.035);
        // Setup camera
        // camera.position.z = 5;

        game.loader.load('assets/platy.json', function (geometry, materials) {
            platy = new THREE.Mesh(geometry, materials);
            platy.position.set(-1, 5, 3);
            // var s = THREE.Math.randFloat(0.00075, 0.001);
            var s = 0.5;
            platy.scale.set(s, s, s);
            //platy.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
            //platy.matrixAutoUpdate = false;

            scene.add(platy);


        });
        game.loader.load('assets/water.json', function (geometry, materials) {
            water = new THREE.Mesh(geometry, materials);
            // mesh.position.set(3, 3, 3);
            scene.add(water);
        });

        game.loader.load('assets/test2.json', function (geometry, materials) {
            // adjust color a bit
            surface = new THREE.Mesh(geometry, materials);
            surface.position.set(0, 0, 0);
            // console.log(geometry, materials)
            scene.add(surface);
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
    };

    this.unload = function (game) {

    };

    this.draw = function (game) {

        camera.position.x = Math.cos(game.time / 5) * 10;
        camera.position.y = 8;
        camera.position.z = Math.sin(game.time / 5) * 10;
        pointLight.position.x = Math.sin(game.time) * 3;
        pointLight.position.z = Math.cos(game.time) * 3;
        water.position.y += THREE.Math.randFloat(-0.01, 0.01);

        mixer.update(game.time);
        camera.lookAt(scene.position);
        renderer.render(scene, camera);

    };

    this.update = function (game) {

        if (game.isKeyPressed(Keys.LEFT)) {
            water.position.y -= 0.01;
        }
        if (game.isKeyPressed(Keys.RIGHT)) {
            water.position.y += 0.01;
        }

        // Move platy to target position        
        platyPosition2D = new THREE.Vector2(platy.position.x, platy.position.z);    // Ignore y-axis for distance check
        targetPosition2D = new THREE.Vector2(targetPosition.x, targetPosition.z);    // Ignore y-axis for distance check
        if (platyPosition2D.distanceTo(targetPosition2D) > 0.1) {

            // Interprete heading in 2D
            targetDirection.x = targetPosition.x - platy.position.x;
            targetDirection.y = 0;
            targetDirection.z = targetPosition.z - platy.position.z;
            targetDirection.normalize();

            // Set orientation of our platy
            platy.rotation.y = Math.atan(targetDirection.x / targetDirection.z)

            if (targetDirection.z < 0) {
                platy.rotation.y = platy.rotation.y - Math.PI;
            }

            // Platy walks around
            targetDirection.multiplyScalar(0.1);
            platy.position.x += targetDirection.x;
            platy.position.z += targetDirection.z;

            // Find ground point on surface by casting ray from sky to surface
            raycaster.ray.origin = new THREE.Vector3(platy.position.x, 100, platy.position.z);
            raycaster.ray.direction = new THREE.Vector3(0, -1, 0);    // Down vector

            var intersects = raycaster.intersectObject(surface);

            for (var i = 0; i < intersects.length; i++) {
                platy.position.y = intersects[i].point.y + 0.8;   // Hack to lift platy a little bit up
            }
        }
    };


    this.mouseUp = function (mouseX, mouseY) {

    };


    this.mouseDown = function (mouseX, mouseY) {
        // Picking position on surface  
        var mouse = new THREE.Vector2(mouseX, mouseY);

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObject(surface);

        for (var i = 0; i < intersects.length; i++) {
            //console.log("Hit: ", intersects[ i ].point)

            targetPosition.copy(intersects[i].point);
        }
    }

}




