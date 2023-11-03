// Icosahedron noise terrain
// public void UpdateNoise(/* int layer,*/ float amplitude, float period)//, float frequency)
// {
//     List<Vector3> original  = Octaves[Octaves.Count - 2];//input verts
//     List<Vector3> octave    = new List<Vector3>();

//     for ( int i = 0; i < original.Count; i++)
//     {
//         Vector3 normal = original[i].normalized;
//         float u = (normal.x * period);
//         float v = (normal.y * period);
//         float noise = Mathf.PerlinNoise(u, v);
//         Vector3 vector = original[i] + ((normal * noise) * amplitude);

//         octave.Add(vector);
//     }        
//     this.vertices = octave;//output verts
//     //Octaves[Octaves.Count - 1] = octave;
// }


//Create an array of threejs spheres of varying sizes.
//Need initial position and velocity.
//surface_gravity = 9.80665 M/s^2 (on earth)
//On sphere creation calculate the mass from the surface_gravity and diameter.

// How do i record veocity?
// velocity (V) = acceleration*time

// For each animation frame, loop over the spheres and calculate the force applied to all other spheres.
// G = 6.673*10^-11; m_1 = body 1 mass; m_2 = body 2 mass; r = distance between body 1 and body 2.
// Force (F) = G*((m_1*m_2)/r^2)

// Apply the force to all other spheres as a modification to the acceleration in a given direction (velocity).
// accelleration is force/mass.
// Acceleration (A) = F/m_n

//From the interverse
//An even more correct physical model would be to derive the velocity from force and mass.
//This would allow you to compute an acceleration (force/mass) which would then affect the velocity.

// To apply the force, calculate it, then apply in a direction aligned between the center of the force applying body,
// and the center of the body the force is applied to.
