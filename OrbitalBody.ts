import * as _3 from "three";
import { Perlin } from "three-noise";
const noise = new Perlin(Math.random());
const manager = new _3.LoadingManager();
const TextureLoader = new _3.TextureLoader(manager);
export default class OrbitalBody {
	public star: boolean = false;
	public mass: number;
	public pivot: _3.Object3D;
	public mesh: _3.Mesh;

	constructor(
		position: number,
		radius: number,
		gravity: number,
		resolution: number,
		opts?: {
			star?: boolean;
		},
	) {
		// Set variables.
		this.star = opts?.star ?? false;
		this.mass = gravity;
		this.pivot = new _3.Object3D();

		// Generate Mesh.
		let material: _3.MeshLambertMaterial | _3.MeshBasicMaterial;
		if (this.star) {
			material = new _3.MeshLambertMaterial({
				color: new _3.Color("white"),
				wireframe: true,
				reflectivity: 0.001,
			});
		} else {
			material = new _3.MeshBasicMaterial({
				color: new _3.Color("white"),
			});
		}
		const geometry = new _3.SphereGeometry(radius, resolution, resolution);
		this.mesh = new _3.Mesh(geometry, material);
		this.pivot.add(this.mesh);
		this.mesh.position.x = position;

		// Generate Terrain.
		const vertices = geometry.attributes.position.array;
		for (let i = 0; i < vertices.length; i += 3) {
			const sample = noise.get3(
				new _3.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]),
			);
			// vertices[i] += sample;
		}
		return this;
	}

	public rotateBody(timescale: number = 1) {
		this.mesh.rotateY(1 * timescale);
	}

	public static degToRad(deg: number) {
		return (deg * Math.PI) / 180;
	}

	public static radToDeg(rad: number) {
		return (rad * 180) / Math.PI;
	}
}
