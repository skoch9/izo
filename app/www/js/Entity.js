/***********************************************
 * Entity
 ***********************************************/

function Entity() {

    var mesh, body;


    this.init = function(m, b) {
        mesh = m;
        body = b;
    };

    this.update = function (game) {
        // Copy coordinates from Cannon.js to Three.js
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    };
}




