/************************************************************************/
/*    Graphics 317 coursework exercise 03                               */
/*    Author: Bernhard Kainz                                            */
/*    This file has to be altered for this exercise                     */
/************************************************************************/

#version 150 compatibility

uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;

uniform sampler2D textureImage;

in vertexData
{
  vec3 pos;
  vec3 normal;
  vec4 color;
  vec4 TexCoords;
}frag;

out vec4 outcolour;

///////////////

void main()
{
  //TODO: get texture information.
    vec4 outcol = texture2D(textureImage, frag.TexCoords.st);

    vec3 light_pos = vec3(gl_LightSource[0].position) - frag.pos;
    
    //The dot product between the incident light and the normal vector
    float dot_product = max(dot(normalize(light_pos), frag.normal), 0);
    
    //The distance from the light source to the vertex
    float distance = length(frag.pos - light_pos);

    //Obtain the reflected light vector
    vec3 light_pos_reflected = reflect(-normalize(light_pos), frag.normal);



    //Attenuation
    float atten = 1.0 / (gl_LightSource[0].constantAttenuation
                           + gl_LightSource[0].linearAttenuation 
			   * distance
                           + gl_LightSource[0].quadraticAttenuation 
			   * distance
			   * distance);

    //Different components
    vec4 I_d = atten * diffuseColor * dot_product;
    vec4 I_s = atten * specularColor * pow(max(dot(normalize(light_pos_reflected), normalize(-frag.pos)), 0), (0.3 * specularExponent));
    
    outcolour = outcol + I_d + I_s;	//Replace the ambient component with outcol 
  
  //////////////////////////////////////////////////////////


}
