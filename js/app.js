const scene = new THREE.Scene();

// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

camera.position.set(0, 0, 70);
camera.lookAt(0, 0, 0);

// Canvas

const canvas = document.querySelector(".webgl");

// Renderer

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Resize

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Texture loader

let textureUrls = [
  "posx.jpg",
  "negx.jpg",
  "posy.jpg",
  "negy.jpg",
  "posz.jpg",
  "negz.jpg",
];

const loader = new THREE.CubeTextureLoader();
loader.setPath("textures/");
scene.background = loader.load(textureUrls);

// Geometry

const geometry = new THREE.SphereBufferGeometry(15, 64, 64);

// Materials

const material = new THREE.MeshBasicMaterial({
  envMap: scene.background,
});

// Mesh

const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.set(-400, 1, 100);
scene.add(pointLight);

// Helpers

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

// Animate

const animate = () => {
  requestAnimationFrame(animate);
  sphere.rotation.y += 1;
  controls.update();
  renderer.render(scene, camera);
};

animate();
