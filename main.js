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
	Mercury,
	Venus,
	Mars,
	Jupiter,
	Saturn,
	Uranus,
	Neptune,
	AU,
	AU_SPEED;
const init = () => {
	// Init Universe. day1
	{
		AU = 550;
		AU_SPEED = 1;
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
		controls.minDistance = 1;
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
			star: true,
			rotation: 0.01,
			name: "Sol",
			radius: 100,
			position: 0,
			resolution: 200,
			textureFile: "./images/sun.jpg",
			gui,
		});
		Sol.mesh.material;
		Sol.addMoon(
			new System({
				rotation: 0.01,
				name: "Mercury",
				radius: 5,
				position: AU * 0.4,
				resolution: 200,
				textureFile: "./images/mercury.jpg",
				gui,
			}),
		);
		Mercury = Sol.getMoon("Mercury");
		Sol.addMoon(
			new System({
				rotation: 0.005,
				name: "Venus",
				radius: 8,
				position: AU * 0.7,
				resolution: 100,
				textureFile: "./images/venus.jpg",
				gui,
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.007,
				name: "Earth",
				radius: 10,
				position: 550,
				resolution: 100,
				cloudFile: "./images/earth_clouds.png",
				normalFile: "./images/earth_normal.jpg",
				textureFile: "./images/earth_day.jpg",
				specularFile: "./images/earth_specular.jpg",
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.005,
				name: "Mars",
				radius: 8,
				position: AU * 1.5,
				resolution: 100,
				textureFile: "./images/mars.jpg",
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.0008,
				name: "Jupiter",
				radius: 56,
				position: (AU * 5.2) / 2,
				resolution: 100,
				textureFile: "./images/jupiter.jpg",
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.0007,
				name: "Saturn",
				radius: 25,
				position: (AU * 9.6) / 2,
				resolution: 100,
				textureFile: "./images/saturn.jpg",
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.0006,
				name: "Uranus",
				radius: 29,
				position: (AU * 19.2) / 2,
				resolution: 100,
				textureFile: "./images/uranus.jpg",
				gui,
			}),
		);
		Sol.addMoon(
			new System({
				rotation: 0.0004,
				name: "Neptune",
				radius: 23,
				position: (AU * 30) / 2,
				resolution: 100,
				textureFile: "./images/neptune.jpg",
				gui,
			}),
		);

		Earth = Sol.getMoon("Earth");
		const Luna = new System({
			name: "Luna",
			radius: 1,
			position: 25,
			resolution: 10,
			rotation: 0.001,
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
	renderer.render(scene, camera);
};

init();
animate();
