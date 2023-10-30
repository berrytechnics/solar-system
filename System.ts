import * as _3 from "three";
const manager = new _3.LoadingManager();
const TextureLoader = new _3.TextureLoader(manager);
/**
 * A class that represents an orbital system.
 *
 * The parent system is the center of the whole (the sun).
 * Any system can contain any number of moons (sus-systems).
 * All systems are orbiting around their parent system.
 *
 * @property name
 * @property radius
 * @property resolution
 * @property position
 * @property rotation
 * @property textureFile
 * @property normalFile
 * @property specularFile
 * @property cloudFile
 * @property mesh
 * @property cloudMoesh
 * @property group
 * @property moons
 * @property gui
 *
 * @method getEdge gets the edge of the orbital system.
 * @method addMoon adds a moon to the orbital system.
 * @method getMoon gets a moon from the orbital system by name.
 * @method rotateSystem rotates the orbital system.
 */
export default class System {
	public name: string;
	public radius: number;
	public resolution: any;
	public position: number;
	public textureFile?: any;
	public normalFile?: any;
	public specularFile?: any;
	public cloudFile?: any;
	public mesh: any;
	public cloudMesh?: any;
	public group = new _3.Group();
	public moons: any[] = [];
	private gui: any;

	constructor(params: {
		name: string;
		radius: number;
		position: number;
		resolution: { x: number; y: number };
		textureFile?: any;
		normalFile?: any;
		specularFile?: any;
		cloudFile?: any;
		gui?: any;
	}) {
		this.name = params.name;
		this.radius = params.radius;
		this.position = params.position;
		this.resolution = params.resolution;
		this.textureFile = params?.textureFile;
		this.normalFile = params?.normalFile;
		this.specularFile = params?.specularFile;
		this.cloudFile = params?.cloudFile;
		this.gui = params?.gui;
		this._initMesh();
		this.cloudFile && this._initAtmosphere();
		return this;
	}

	private _initMesh() {
		const geometry = new _3.SphereGeometry(
			this.radius,
			this.resolution,
			this.resolution,
		);
		const material = new _3.MeshPhongMaterial({
			map: this.textureFile ? TextureLoader.load(this.textureFile) : null,
			normalMap: this.normalFile ? TextureLoader.load(this.normalFile) : null,
			normalScale: new _3.Vector2(1, 1),
			specularMap: this.specularFile
				? TextureLoader.load(this.specularFile)
				: null,
			specular: new _3.Color("grey"),
		});
		this.mesh = new _3.Mesh(geometry, material);
		this.mesh.rotationSpeed = 1;
		this.group.add(this.mesh);
		this.group.position.x = this.position;
	}

	private _initAtmosphere() {
		const geometry = new _3.SphereGeometry(
			this.radius,
			this.resolution,
			this.resolution,
		);
		const material = new _3.MeshPhongMaterial({
			map: TextureLoader.load(this.cloudFile),
			transparent: true,
		});
		this.cloudMesh = new _3.Mesh(geometry, material);
		this.group.add(this.cloudMesh);
	}

	public getEdge() {
		const pluto = this.moons.sort((a, b) => (b.position > a.position ? 1 : -1));
		return pluto[0].position.x ?? this.mesh.position.x + this.radius;
	}

	public addMoon(moon: System) {
		this.moons.push(moon);
		this.group.add(this.moons.find((m) => m.name === moon.name).group);
	}

	public getMoon(name: string) {
		return this.moons.find((moon) => moon.name === name);
	}

	public rotateSystem() {
		this.group.rotation.y += this.mesh.rotationSpeed * 0.0001;
	}

	public rotateAllSystems() {
		this.rotateSystem();
		this.moons.length && this.moons.forEach((moon) => moon.rotateAllSystems());
	}

	public setRotation(speed: number) {
		this.mesh.rotationSpeed = speed;
	}
}
