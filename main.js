import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GUI } from "dat.gui"

class Planet{
	constructor(radius,positionX,textureFile,normalFile,specularFile,resolution){
		this.radius = radius
		this.positionX = positionX
		this.textureFile = textureFile
		this.normalFile = normalFile
		this.specularFile = specularFile
		this.resolution = resolution
	}
	getMesh(){
		if(this.mesh===undefined||this.mesh===null){
			const geometry = new THREE.SphereGeometry(this.radius,this.resolution,this.resolution)
			const material = new THREE.MeshPhongMaterial({
				map:new THREE.TextureLoader().load(this.textureFile),
				normalMap:new THREE.TextureLoader().load(this.normalFile),
				normalScale: new THREE.Vector2(1,1),
				specularMap: new THREE.TextureLoader().load(this.specularFile),
				specular: new THREE.Color('grey')
			})
			this.mesh = new THREE.Mesh(geometry,material)
			this.mesh.position.x+=this.positionX
			this.mesh.rotationSpeed = .005
		}
		return this.mesh
	}
	getEdge(){
		return this.positionX+this.radius
	}
}
class Moon{
	constructor(radius,positionX,textureFile,normalMap,resolution){
		this.radius = radius
		this.positionX = positionX
		this.textureFile = textureFile
		this.normalMap = normalMap
		this.resolution = resolution
	}
	getMesh(){
		if(this.mesh===undefined||this.mesh===null){
			const geometry = new THREE.SphereGeometry(this.radius,this.resolution,this.resolution)
			const texture = new THREE.TextureLoader().load(this.textureFile)
			const material = new THREE.MeshStandardMaterial({
				map:texture,
				normalMap:new THREE.TextureLoader().load('images/moon_normal.jpg'),
				normalScale:new THREE.Vector2(1,1)
			})
			this.mesh = new THREE.Mesh(geometry,material)
			this.mesh.position.x+=this.positionX
			this.mesh.rotationSpeed = .005
		}
		return this.mesh
	}
	getEdge(){
		return this.positionX+this.radius
	}
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 4000)
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#c") })
const controls = new OrbitControls(camera, renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
controls.update()

const space = new THREE.Mesh(
	new THREE.SphereGeometry(2000,100,100),
	new THREE.MeshPhongMaterial({
		map:new THREE.TextureLoader().load("images/space.jpg")
	})
)
space.material.side=THREE.BackSide
const light = new THREE.DirectionalLight("white")
const system = new THREE.Group();
const planetEarth = new Planet(3,0, "images/earth_day.jpg","images/earth_normal.jpg","images/earth_specular.jpg",100)
const earthMesh = planetEarth.getMesh()
const earthClouds = new THREE.Mesh(
	new THREE.SphereGeometry(planetEarth.radius+.01,100,100),
	new THREE.MeshPhongMaterial({
		map:new THREE.TextureLoader().load('images/earth_clouds.png'),
		transparent:true
	})
)
const earth = new THREE.Group();
earth.add(earthMesh)
earth.add(earthClouds)
const moon = new Moon(3 / 4,planetEarth.getEdge()+(3/4)+8, "images/moon.jpg",100)
const moonMesh = moon.getMesh()
// moonMesh.rotation.y+=3
system.timeScale = 1
light.position.set(-2, 2, 5)
system.add(earth)
system.add(moonMesh)

const gui = new GUI()
gui.add(system,'timeScale',0,1000).name('Time Scale')
const earthFolder = gui.addFolder('Earth')
earthFolder.add(earthMesh.material,'wireframe').name('Earth Wireframe')
gui.add(moonMesh.position,'x',(moon.radius+planetEarth.getEdge()),25).name('Moon Orbit dist.')

scene.add(space)
scene.add(light)
scene.add(new THREE.AmbientLight('white',.75))
scene.add(system)

const animate = ()=>{
	requestAnimationFrame(animate)

	system.rotation.y+=.00001*system.timeScale
	earth.rotation.y+= .00027*system.timeScale
	earthClouds.rotation.y+=.00002
	renderer.render(scene, camera)
}
renderer.render(scene, camera)
animate()

// moon orbit : earth rotation
// 1:27.322