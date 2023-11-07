import * as _3 from "three";
import { Perlin } from "three-noise";
const noise = new Perlin(Math.random());
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
		let material: any;
		material = new _3.MeshStandardMaterial({
			flatShading: true,
		});
		// const geometry = new _3.SphereGeometry(radius, resolution, resolution);
		const geometry = new _3.IcosahedronGeometry(radius, resolution);
		this.mesh = new _3.Mesh(geometry, material);
		this.pivot.add(this.mesh);
		this.mesh.position.x = position;

		// Generate Terrain.
		const vertices = this.mesh.geometry.attributes.position.array;
		for (let i = 0; i < vertices.length; i += 2) {
			const sample = noise.get2(new _3.Vector3(vertices[i], vertices[i + 1]));
			// vertices[i] += sample;
		}

		// Generate Starlight.
		if (this.star) {
			const light = new _3.PointLight(new _3.Color("#fdb813"), 1, 1000);
			light.position.set(position, 1000, 0);
			this.pivot.add(light);
		}

		return this;
	}

	public updateVertices(callback: (vertices: _3.TypedArray) => void) {
		const vertices = this.mesh.geometry.attributes.position.array;
		callback(vertices);
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
