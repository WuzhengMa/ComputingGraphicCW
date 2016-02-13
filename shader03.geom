/************************************************************************/
/*    Graphics 317 coursework exercise 03                               */
/*    Author: Bernhard Kainz                                            */
/*    This file has to be altered for this exercise                     */
/************************************************************************/

#version 150 compatibility
#extension GL_ARB_geometry_shader4 : enable

layout (max_vertices = 120) out;

const float pi = 3.14159265359;


////////////////
uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;

uniform int level;
uniform float time;

in vertexData
{
	vec3 pos;
	vec3 normal;
	vec4 color;
}vertices[];

out fragmentData
{
	vec3 vpos;
	vec3 normal;
	vec4 color;
}frag;   


///////////////////////////////////////////////////////
//pseudo random helper function
///////////////////////////////////////////////////////
float rnd(vec2 x)
{
	int n = int(x.x * 40.0 + x.y * 6400.0);
	n = (n << 13) ^ n;
	return 1.0 - float( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0;
}


///////////////////////////////////////////////////////
//TODO add code for exercise 3 Geometry generation here
///////////////////////////////////////////////////////
void produceVertex(float s, float t, vec4 v0, vec4 v01, vec4 v02, vec3 n0, vec3 n01, vec3 n02, int i)
{
	//Barycentric
	vec4 new_ver = v0 + s * v01 + t * v02;
	vec3 new_nor = n0 + s * n01 + t * n02;
	
	//frag.vpos = vec3(new_ver);
	frag.normal = normalize(new_nor);
	frag.color = vertices[i].color;
	
	//Bonus task
	float displacement = rnd(new_ver.xy);
	gl_Position = new_ver + vec4(frag.normal * displacement/20 * sin(time/20), 1.0); 
	
	//Normal output	
	//gl_Position = new_ver;
	
	EmitVertex();


}


void main(){

	int i, j;

	//v0 is the referenced vertex used, v01 and v02 are direction vectors to v0
	vec4 v0 = gl_PositionIn[0];
	vec4 v01 = (gl_PositionIn[1] - gl_PositionIn[0]);
	vec4 v02 = (gl_PositionIn[2] - gl_PositionIn[0]);
	
	//Normals
	vec3 n0 = vertices[0].normal;
	vec3 n01 = (vertices[1].normal - vertices[0].normal);
	vec3 n02 = (vertices[2].normal - vertices[0].normal);

	float step = 1.0 / pow(2, level);

	float t = 0.0;
	for (i = 0 ; i < pow(2, level) ; i++, t+=step){
		float s = 0.0;
		for (j = 0 ; j < pow(2, level)-i ; j++, s+=step){

			produceVertex(s, t, v0, v01, v02, n0, n01, n02, j);
			produceVertex(s, t+step, v0, v01, v02, n0, n01, n02, j);

		}

		produceVertex(s, t, v0, v01, v02, n0, n01, n02, i);
		EndPrimitive();	//Clear vertex stream
	}

	
}
