/************************************************************************/
/*    Graphics 317 coursework exercise 04b                               */
/*    Author: Bernhard Kainz                                            */
/*    This file has to be altered for this exercise                     */
/************************************************************************/

#version 150 core

//simplified IO structures, no geometry shader any more
in vec2 textureUV;
out vec3 color;

//this is the texture of the framebuffer object
uniform sampler2D renderedTexture;
const int N = 12;
const float d_max = 0.5;
const float s[N] = float[](-0.10568,-0.07568,-0.042158,
			      -0.02458,-0.01987456,-0.0112458,
			      0.0112458,0.01987456,0.02458,
			      0.042158,0.07568,0.10568);
	

void main(){

	vec2 centre = vec2(0.5, 0.5);	
	vec3 outcolor;

	int i;
	for(i=0; i<N; i++){
		vec2 dir_p = centre - textureUV;
		vec2 blur_UV = textureUV + normalize(dir_p) * s[i] * d_max;
		outcolor += texture(renderedTexture, blur_UV).xyz;
	}
	
	color = outcolor / N;

  ////////////////////////////////////////////////////////////////////

}
