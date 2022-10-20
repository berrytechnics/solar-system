import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GUI } from "dat.gui"
class Planet {
	constructor(radius, texture, rotation) {
		this.geometry = new THREE.SphereGeometry(radius,100,100)
		this.texture = new THREE.TextureLoader().load(texture)
		this.material = new THREE.MeshStandardMaterial({ map: this.texture })
		this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.rotation = rotation
	}
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#c") })
const controls = new OrbitControls(camera, renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
controls.update()

const spaceTexture = new THREE.TextureLoader().load("images/space.jpg")
const light = new THREE.DirectionalLight("white", 1)
const earth = new Planet(3, "images/earth.jpg",.005)
const moon = new Planet(3 / 4, "images/moon.png",.003)
scene.background = spaceTexture
light.position.set(-2, 2, 5)
moon.mesh.position.x += 10

const gui = new GUI()
const earthFolder = gui.addFolder('Earth')
earthFolder.add(earth.material,'wireframe').name('Earth Wireframe')
earthFolder.add(earth,'rotation',0,1)
const moonFolder = gui.addFolder('Moon')
moonFolder.add(moon,'rotation',0,1)
scene.add(earth.mesh)
scene.add(moon.mesh)
scene.add(light)
function animate() {
	requestAnimationFrame(animate)

	earth.mesh.rotation.y += earth.rotation
	moon.mesh.rotation.y += moon.rotation
	renderer.render(scene, camera)
}
renderer.render(scene, camera)
animate()
