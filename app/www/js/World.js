/***********************************************
 * World
 ***********************************************/

function World() {

    //Private members
    var that = this;
    var physics, scene;
    var timeStep=1/60, camera;
    var ambientLight, pointLight;
    var entities = [];

    //Private methods
    var initCannon = function initCannon() {
        physics = new CANNON.World();
        physics.gravity.set(0, -9.81, 0);
        physics.broadphase = new CANNON.NaiveBroadphase();
        physics.solver.iterations = 10;
    };

    var initThree = function initThree() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
        camera.position.set(0, 10, 10);
        scene.add(camera);

        // var mixer = new THREE.AnimationMixer(scene);

        ambientLight = new THREE.AmbientLight(0xcccccc);
        pointLight = new THREE.PointLight(0xff4400, 5, 30);//ff4400
        pointLight.position.set(5, 10, 5);

        scene.add(ambientLight);
        scene.add(pointLight);
    };

    // geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    //
    // mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    //Privileged methods
    this.addEntity = function(entity) {
        physics.addBody(entity.body);
        scene.add(entity.mesh);
        entities.push(entity);
    };

    this.removeEntity = function(entity) {
        var index = entities.indexOf(entity);
        if (index > -1) {
            array.splice(index, 1);
        }
    };

    this.update = function(game) {
        physics.step(game.time);
        for (var i = 0; i < entities.length; i++) {
            entitie[i].update(game);
        }
        // mixer.update(game.time);
    };

    this.getScene = function() {
        return scene;
    };

    this.getPhysics = function() {
        return physics;
    };

    this.getCamera = function() {
        return camera;
    };

    this.setAspectRatio = function(ratio) {
        camera.aspect = ratio;
        camera.updateProjectionMatrix();
    };

    initThree();
    initCannon();
}




