import "./style.css";
import * as _3 from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";
const axesHelper = new _3.AxesHelper(5000);

import OrbitalBody from "./OrbitalBody";
let scene,
	camera,
	renderer,
	controls,
	system,
	Sol,
	Earth,
	Luna,
	Mercury,
	Venus,
	Mars,
	Jupiter,
	Saturn,
	Uranus,
	Neptune,
	_CONSTANTS;
const Sphere = new _3.SphereGeometry(100, 100, 100);
const gui = new GUI();
const init = () => {
	// Init Universe. day1
	{
		_CONSTANTS = {
			timescale: 1,
		};
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
	}
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

	// Init Solar System. day3
	Sol = new OrbitalBody(0, 100, 1, 12, { star: true });
	console.log(Sol);
	scene.add(Sol.pivot);
	const helper = new VertexNormalsHelper(Sol.mesh, 1, 0xff0000);
	scene.add(helper);

	// Init there be light. day5
	const light = new _3.PointLight("white");
	light.position.set(100000, 100000, 0);

	// Dev Menu
	gui.add(Sol.pivot.rotation, "x", 0, 2 * Math.PI);
	gui.add(Sol.pivot.rotation, "y", 0, 2 * Math.PI);
	gui.add(Sol.pivot.rotation, "z", 0, 2 * Math.PI);
	gui.add(light, "intensity", 0, 1);

	scene.add(axesHelper);

	// Init time. day6
	// scene.add(Sol.pivot);
	scene.add(light);
	scene.add(new _3.AmbientLight("white", 0.1));
	renderer.render(scene, camera);
};

const animate = () => {
	requestAnimationFrame(animate);
	//   Sol.rotateBody(_CONSTANTS.timescale);
	renderer.render(scene, camera);
};

init();
animate();
