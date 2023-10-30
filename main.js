import "./style.css";
import * as _3 from "three";
import System from "./System";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, camera, renderer, controls, system, Sol, Earth;
const init = () => {
	// Init Universe. day1
	{
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
			name: "Sol",
			radius: 100,
			position: 0,
			rotation: 10,
			resolution: 200,
			textureFile: "./images/sun.jpg",
		});
		Sol.addMoon(
			new System({
				name: "Mercury",
				radius: 5,
				position: 150,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Venus",
				radius: 8,
				position: 350,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Earth",
				radius: 10,
				position: 550,
				resolution: 10,
				rotation: 100,
				cloudFile: "./images/earth_clouds.png",
				normalFile: "./images/earth_normal.jpg",
				textureFile: "./images/earth_day.jpg",
				specularFile: "./images/earth_specular.jpg",
			}),
		);
		Sol.addMoon(
			new System({
				name: "Mars",
				radius: 8,
				position: 800,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Jupiter",
				radius: 56,
				position: 2000,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Saturn",
				radius: 25,
				position: 2800,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Uranus",
				radius: 29,
				position: 3900,
				resolution: 10,
			}),
		);
		Sol.addMoon(
			new System({
				name: "Neptune",
				radius: 23,
				position: 5000,
				resolution: 10,
			}),
		);

		Earth = Sol.getMoon("Earth");
		const Luna = new System({
			name: "Luna",
			radius: 1,
			position: 25,
			resolution: 10,
			textureFile: "./images/moon.jpg",
			normalFile: "./images/moon_normal.jpg",
		});
		Earth.addMoon(Luna);
	}

	// Init there be light. day5
	const light = new _3.DirectionalLight("white");
	light.position.set(-2, 2, 5);

	// Init time. day6
	scene.add(Sol.group);
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
