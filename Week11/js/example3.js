const gfx = new THREE.WebGLRenderer();
gfx.setSize(800,500);
document.body.appendChild(gfx.domElement);

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(100,800/500,.1,1000);
cam.position.z = 5;

//scene.add(new THREE.DirectionalLight(0xffffff, 1));
//scene.add(new THREE.AmbientLight(0xffffff, 10));

let mesh = null;


( new THREE.GLTFLoader() ).load(
    'files/stopsign.gltf', 
    gltf=>{
        mesh = gltf.scene;
        scene.add(gltf.scene);
    },
    xhr=>{},
    error=>{
        console.log("error");
        console.log(error);
    }
);


( new THREE.RGBELoader() ).load(
    'files/rocky.hdr',
    texture => {
        //console.log("///");
        const pmremGen = new THREE.PMREMGenerator(gfx);
        const envMap = pmremGen.fromEquirectangular(texture).texture;
        
        scene.background = envMap;
        scene.environment = envMap;
    }
);


const controls = new THREE.OrbitControls(cam, gfx.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;
controls.update();

function gameTick(now){
    
    
    if(mesh) mesh.rotation.y += .01;
    
    gfx.render(scene, cam);
    requestAnimationFrame( (n) => gameTick(n) );
}

gameTick(0);