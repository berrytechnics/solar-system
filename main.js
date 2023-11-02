import "./style.css";
import * as _3 from "three";
import System from "./System";
import { gui } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
	AU,
	AU_TIME,
	AU_SIZE;
const init = () => {
	// Init Universe. day1
	{
		AU_TIME = 1;
		AU_SIZE = 100;
		AU = AU_SIZE * 101;
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
		camera.position.setZ(10000);
	}
	controls.update();

	// Init space. day2
	const space = new _3.Mesh(
		new _3.SphereGeometry(100000, 100, 100),
		new _3.MeshBasicMaterial({
			map: new _3.TextureLoader().load("images/space.jpg"),
		}),
	);
	space.material.side = _3.BackSide;
	scene.add(space);

	// Init Solar System. day3
	{
		Sol = new System({
			name: "Sol",
			star: true,
			orbit: 0.01 * AU_TIME,
			rotation: 0.1 * AU_TIME,
			radius: AU_SIZE * 10,
			position: 0,
			resolution: 200,
			textureFile: "./images/sun.jpg",
			gui,
		});
		Sol.mesh.material;
		Mercury = Sol.addMoon(
			new System({
				name: "Mercury",
				orbit: 0.01 * AU_TIME,
				rotation: 0.1 * AU_TIME,
				radius: AU_SIZE * 0.0553,
				position: AU * 0.4,
				resolution: 200,
				textureFile: "./images/mercury.jpg",
				gui,
			}),
		);
		Venus = Sol.addMoon(
			new System({
				name: "Venus",
				rotation: 0.1 * AU_TIME,
				orbit: 0.005 * AU_TIME,
				radius: AU_SIZE * 0.949,
				position: AU * 0.7,
				resolution: 100,
				textureFile: "./images/venus.jpg",
				cloudFile: "./images/venus_clouds.jpg",
				gui,
				gui,
			}),
		);
		Earth = Sol.addMoon(
			new System({
				orbit: 0.007 * AU_TIME,
				name: "Earth",
				rotation: 0.1 * AU_TIME,
				radius: AU_SIZE,
				position: AU,
				resolution: 100,
				cloudFile: "./images/earth_clouds.png",
				normalFile: "./images/earth_normal.jpg",
				textureFile: "./images/earth_day.jpg",
				specularFile: "./images/earth_specular.jpg",
				gui,
			}),
		);
		Mars = Sol.addMoon(
			new System({
				name: "Mars",
				rotation: 0.1 * AU_TIME,
				orbit: 0.005 * AU_TIME,
				radius: AU_SIZE * 0.532,
				position: AU * 1.5,
				resolution: 100,
				textureFile: "./images/mars.jpg",
				gui,
			}),
		);
		Jupiter = Sol.addMoon(
			new System({
				name: "Jupiter",
				rotation: 0.1 * AU_TIME,
				orbit: 0.0008 * AU_TIME,
				radius: AU_SIZE * 11.21,
				position: (AU * 5.2) / 2,
				resolution: 100,
				textureFile: "./images/jupiter.jpg",
				gui,
			}),
		);
		Saturn = Sol.addMoon(
			new System({
				name: "Saturn",
				rotation: 0.1 * AU_TIME,
				orbit: 0.0007 * AU_TIME,
				radius: AU_SIZE * 9.45,
				position: (AU * 9.6) / 2,
				resolution: 100,
				textureFile: "./images/saturn.jpg",
				gui,
			}),
		);
		Uranus = Sol.addMoon(
			new System({
				name: "Uranus",
				rotation: 0.1 * AU_TIME,
				orbit: 0.0006 * AU_TIME,
				radius: AU_SIZE * 4.01,
				position: (AU * 19.2) / 2,
				resolution: 100,
				textureFile: "./images/uranus.jpg",
				gui,
			}),
		);
		Neptune = Sol.addMoon(
			new System({
				name: "Neptune",
				rotation: 0.1 * AU_TIME,
				orbit: 0.0004 * AU_TIME,
				radius: AU_SIZE * 3.88,
				position: (AU * 30) / 2,
				resolution: 100,
				textureFile: "./images/neptune.jpg",
				gui,
			}),
		);
		Luna = new System({
			name: "Luna",
			rotation: 0.1 * AU_TIME,
			radius: 0.25 * AU_SIZE,
			position: AU * 0.02531 + Earth.radius,
			resolution: 10,
			orbit: 0.001 * AU_TIME,
			textureFile: "./images/moon.jpg",
			normalFile: "./images/moon_normal.jpg",
			gui,
		});
		Earth.addMoon(Luna);
	}

	// Init there be light. day5
	const light = new _3.PointLight("white");
	light.position.set(0, 0, 0);

	// Init time. day6
	scene.add(Sol.pivot);
	scene.add(light);
	scene.add(new _3.AmbientLight("white", 0.1));
	renderer.render(scene, camera);
};

const animate = () => {
	requestAnimationFrame(animate);
	Sol.rotateAllSystems();
	// Sol.orbitAllSystems();
	renderer.render(scene, camera);
};

init();
animate();
