/************************************************************************/
/*    Graphics 317 coursework exercise 02                               */
/*    Author: Bernhard Kainz                                            */
/*    This file has to be altered for this exercise                     */
/************************************************************************/

#version 150 compatibility

uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;
uniform int shader;

in elemData
{
  vec3 pos;
  vec3 normal;
  vec4 color;
}frag;

///////////////

void main()
{
  vec4 outcol = frag.color;

  if(shader == 2)
  {
    
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
    vec4 I_a = ambientColor;
    vec4 I_d = atten * diffuseColor * dot_product;
    vec4 I_s = atten * specularColor * pow(max(dot(normalize(light_pos_reflected), normalize(-frag.pos)), 0), (0.3 * specularExponent));
    
    outcol = I_a + I_d + I_s;

    ///////////////////////////////////////////////////
  }

  if(shader == 3)
  {

    vec3 light_pos  = vec3(gl_LightSource[0].position) - frag.pos;
    float If = dot(normalize(light_pos), frag.normal);

    if(If > 0.98) outcol = vec4(0.8, 0.8, 0.8, 1.0);
    else if(If > 0.5 && If <= 0.98) outcol = vec4(0.8, 0.4, 0.4, 1.0);
    else if(If > 0.25 && If <= 0.5) outcol = vec4(0.6, 0.2, 0.2, 1.0);
    else outcol = vec4(0.1, 0.1, 0.1, 1.0);

    ///////////////////////////////////////////////////
  }

  gl_FragColor = outcol;
}
