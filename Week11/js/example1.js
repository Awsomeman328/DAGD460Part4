
// spawn renderer:
const gfx = new THREE.WebGLRenderer();
//console.log("hello world");
// set size of renderer:
gfx.setSize(800,500);

// add new <canvas> to page:
document.body.appendChild(gfx.domElement);

// make scene:
const scene = new THREE.Scene();

// make camera:
const cam = new THREE.PerspectiveCamera(
    100,        // fov (in degrees)
    800/500.0,  // aspect ratio
    .1,         // near clipping plane
    1000,       // far clipping plane
);
    
// move camera back;
cam.position.z = 3;


// CREATE A CUBE, ADD TO SCENE:
const geom = new THREE.BoxGeometry();
const mat = new THREE.MeshBasicMaterial({color:"rgb(0,255,0)"});
const cube = new THREE.Mesh(geom, mat);
scene.add(cube);

// GAME LOOP:
function gameTick(){
    // calculate delta-time:
    
    // update:
    cube.rotation.y += .01;
    
    // draw:
    gfx.render(scene, cam);
    
    // queue next tick:
    requestAnimationFrame((now)=>gameTick(now));
}
gameTick(0);