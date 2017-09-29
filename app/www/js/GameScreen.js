/***********************************************
 * Game screen
 ***********************************************/

function GameScreen() {

    var renderer = new THREE.WebGLRenderer();

    var raycaster = new THREE.Raycaster(); // Move to game class
    var world = new World();
    // var surface;

    // var targetPosition = new THREE.Vector3();
    // var targetDirection = new THREE.Vector3();

    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        world.setAspectRatio(window.innerWidth/window.innerHeight);
    });

    this.load = function (game) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);


        // game.loader.load('assets/platy.json', function (geometry, materials) {
        //     platy = new THREE.Mesh(geometry, materials);
        //     platy.position.set(-1, 5, 3);
        //     // var s = THREE.Math.randFloat(0.00075, 0.001);
        //     var s = 0.5;
        //     platy.scale.set(s, s, s);
        //     scene.add(platy);
        // });

        // game.loader.load('assets/test2.json', function (geometry, materials) {
        //     surface = new THREE.Mesh(geometry, materials);
        //     surface.position.set(0, 0, 0);
        //     // console.log(geometry, materials)
        //     scene.add(surface);
        // });

        // geometry = new THREE.SphereGeometry( 2, 2, 2 );
        // material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        // mesh = new THREE.Mesh( geometry, material );
    };

    this.unload = function (game) {

    };

    this.draw = function (game) {
        // world.camera.lookAt(platy.position);
        renderer.render(world.getScene(), world.getCamera());
    };

    this.update = function (game) {

        if (game.isKeyPressed(Keys.LEFT)) {
            // water.position.y -= 0.01;
        }
        if (game.isKeyPressed(Keys.RIGHT)) {
            // water.position.y += 0.01;
        }
        world.update(game);
        this.draw(game);

        // // Move platy to target position
        // platyPosition2D = new THREE.Vector2(platy.position.x, platy.position.z);    // Ignore y-axis for distance check
        // targetPosition2D = new THREE.Vector2(targetPosition.x, targetPosition.z);    // Ignore y-axis for distance check
        // if (platyPosition2D.distanceTo(targetPosition2D) > 0.1) {
        //
        //     // Interprete heading in 2D
        //     targetDirection.x = targetPosition.x - platy.position.x;
        //     targetDirection.y = 0;
        //     targetDirection.z = targetPosition.z - platy.position.z;
        //     targetDirection.normalize();
        //
        //     // Set orientation of our platy
        //     platy.rotation.y = Math.atan(targetDirection.x / targetDirection.z)
        //
        //     if (targetDirection.z < 0) {
        //         platy.rotation.y = platy.rotation.y - Math.PI;
        //     }
        //
        //     // Platy walks around
        //     targetDirection.multiplyScalar(0.1);
        //     platy.position.x += targetDirection.x;
        //     platy.position.z += targetDirection.z;
        //
        //     // Find ground point on surface by casting ray from sky to surface
        //     raycaster.ray.origin = new THREE.Vector3(platy.position.x, 100, platy.position.z);
        //     raycaster.ray.direction = new THREE.Vector3(0, -1, 0);    // Down vector
        //
        //     var intersects = raycaster.intersectObject(surface);
        //
        //     for (var i = 0; i < intersects.length; i++) {
        //         platy.position.y = intersects[i].point.y + 0.8;   // Hack to lift platy a little bit up
        //     }
        // }
    };


    this.mouseUp = function (mouseX, mouseY) {

    };


    this.mouseDown = function (mouseX, mouseY) {
        // Picking position on surface  
        var mouse = new THREE.Vector2(mouseX, mouseY);

        raycaster.setFromCamera(mouse, world.getCamera());

        // var intersects = raycaster.intersectObject(surface);

        // for (var i = 0; i < intersects.length; i++) {
        //     targetPosition.copy(intersects[i].point);
        // }
    }

}




