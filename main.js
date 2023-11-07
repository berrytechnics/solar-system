import "./style.css";
import * as _3 from "three";
import { GUI } from "dat.gui";
import { FBM, Perlin } from "three-noise";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";
let scene, camera, renderer, controls;
const gui = new GUI();
scene = new _3.Scene();
camera = new _3.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	200000,
);
renderer = new _3.WebGLRenderer({
	canvas: document.querySelector("#c"),
	antialias: true,
});
controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.1;
controls.maxDistance = 90000;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(300);
controls.update();
// Init space. day2
const space = new _3.Mesh(
	new _3.SphereGeometry(100000, 100, 100),
	new _3.MeshBasicMaterial({
		map: new _3.TextureLoader().load("./images/space.jpg"),
	}),
);
space.material.side = _3.BackSide;
scene.add(space);

const Terrain = {};
Terrain.geometry = new _3.PlaneGeometry(128, 128, 128, 128);
Terrain.material = new _3.MeshNormalMaterial({
	side: _3.DoubleSide,
	vertexColors: true,
	// shading: _3.FlatShading,
});
Terrain.mesh = new _3.Mesh(Terrain.geometry, Terrain.material);
Terrain.mesh.rotateX(-Math.PI / 2);
let vertices = Terrain.geometry.attributes.position.array;
// const noise = new FBM({
// 	seed: Math.random(),
// 	scale: 1,
// 	persistance: 0.5,
// 	lacunarity: 1,
// 	octaves: 4,
// 	redistribution: 1,
// });
const noise = new Perlin(Math.random());
for (let i = 0; i < vertices.length; i += 3) {
	const noiseVal =
		noise.get2(new _3.Vector2(vertices[i], vertices[i + 2])) * 10;
	console.log(noiseVal);
	Terrain.geometry.attributes.position.array[i + 1] += noiseVal;
}
scene.add(Terrain.mesh);

const axesHelper = new _3.AxesHelper(5000);
const vertexHelper = new VertexNormalsHelper(Terrain.mesh, 1, 0xff0000);
scene.add(vertexHelper);
scene.add(axesHelper);
vertexHelper.visible = false;
axesHelper.visible = false;

// Dev Menu
gui.add(vertexHelper, "visible").name("Show normals");
gui.add(axesHelper, "visible").name("Show axes");
gui.add(Terrain.material, "wireframe").name("Wireframe");

// Init time. day6
// scene.add(new _3.AmbientLight("white", 0.1));

renderer.render(scene, camera);

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();
