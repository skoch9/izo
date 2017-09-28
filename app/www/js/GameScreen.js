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


        game.loader.load('assets/platy.json', function (geometry, materials) {
            platy = new THREE.Mesh(geometry, materials);
            platy.position.set(-1, 5, 3);
            // var s = THREE.Math.randFloat(0.00075, 0.001);
            var s = 0.5;
            platy.scale.set(s, s, s);
            scene.add(platy);
        });

        game.loader.load('assets/test2.json', function (geometry, materials) {
            surface = new THREE.Mesh(geometry, materials);
            surface.position.set(0, 0, 0);
            // console.log(geometry, materials)
            scene.add(surface);
        });
    };

    this.unload = function (game) {

    };

    this.draw = function (game) {

        pointLight.position.x = Math.sin(game.time/10) * 1;
        pointLight.position.z = Math.cos(game.time/10) * 1;
        // water.position.y += THREE.Math.randFloat(-0.01, 0.01);

        mixer.update(game.time);
        camera.lookAt(platy.position);
        renderer.render(scene, camera);

    };

    this.update = function (game) {

        if (game.isKeyPressed(Keys.LEFT)) {
            // water.position.y -= 0.01;
        }
        if (game.isKeyPressed(Keys.RIGHT)) {
            // water.position.y += 0.01;
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




