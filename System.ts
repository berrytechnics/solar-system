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
	public rotation: number;
	public textureFile?: any;
	public normalFile?: any;
	public specularFile?: any;
	public cloudFile?: any;
	public mesh: any;
	public pivot: any;
	public cloudMesh?: any;
	public moons: any[] = [];
	public star: boolean;
	private gui: any;

	constructor(params: {
		name: string;
		radius: number;
		position: number;
		resolution: { x: number; y: number };
		rotation: number;
		textureFile?: any;
		normalFile?: any;
		specularFile?: any;
		cloudFile?: any;
		gui?: any;
		star?: boolean;
	}) {
		this.name = params.name;
		this.radius = params.radius;
		this.position = params.position;
		this.rotation = params.rotation;
		this.resolution = params.resolution;
		this.textureFile = params?.textureFile;
		this.normalFile = params?.normalFile;
		this.specularFile = params?.specularFile;
		this.cloudFile = params?.cloudFile;
		this.gui = params?.gui;
		this.star = params?.star ?? false;
		this._initMesh();
		this.cloudFile && this._initAtmosphere();
		return this;
	}

	private _initMesh() {
		this.pivot = new _3.Object3D();
		const geometry = new _3.SphereGeometry(
			this.radius,
			this.resolution,
			this.resolution,
		);
		let material: _3.MeshBasicMaterial | _3.MeshPhongMaterial;
		if (this.star) {
			material = new _3.MeshBasicMaterial({
				map: this.textureFile ? TextureLoader.load(this.textureFile) : null,
			});
		} else {
			material = new _3.MeshPhongMaterial({
				map: this.textureFile ? TextureLoader.load(this.textureFile) : null,
				normalMap: this.normalFile ? TextureLoader.load(this.normalFile) : null,
				normalScale: new _3.Vector2(1, 1),
				specularMap: this.specularFile
					? TextureLoader.load(this.specularFile)
					: null,
				specular: new _3.Color("grey"),
			});
		}
		this.mesh = new _3.Mesh(geometry, material);
		this.mesh.rotationSpeed = 1;
		this.mesh.position.x = this.position;
		this.pivot.add(this.mesh);
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
		this.pivot.add(this.cloudMesh);
	}

	public getEdge() {
		const pluto = this.moons.sort((a, b) => (b.position > a.position ? 1 : -1));
		return pluto[0].position.x ?? this.mesh.position.x + this.radius;
	}

	public addMoon(moon: System) {
		moon.pivot.position.x = this.position;
		moon.pivot.rotateY(Math.random() * 10);
		moon.rotation -= this.rotation;
		this.moons.push(moon);
		this.pivot.add(this.moons.find((m) => m.name === moon.name).pivot);
	}

	public getMoon(name: string) {
		return this.moons.find((moon) => moon.name === name);
	}

	public rotateSystem() {
		this.pivot.rotateY(this.rotation);
	}

	public rotateAllSystems() {
		this.rotateSystem();
		this.moons.length && this.moons.forEach((moon) => moon.rotateAllSystems());
	}

	public static degToRad(deg: number) {
		return (deg * Math.PI) / 180;
	}

	public static radToDeg(rad: number) {
		return (rad * 180) / Math.PI;
	}
}
