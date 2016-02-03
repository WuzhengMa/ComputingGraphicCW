/************************************************************************/
/*    Graphics 317 coursework exercise 02                               */
/*    Author: Bernhard Kainz                                            */
/*    This file has to be altered for this exercise                     */
/************************************************************************/

#version 150 compatibility

////////////////
//exercise 2
uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;
uniform float specularExponent;
uniform int shader;

out elemData
{
  vec3 pos;
  vec3 normal;
  vec4 color;
}vertex;

/////////////

void main()
{
  vertex.pos = vec3(gl_ModelViewMatrix * gl_Vertex);
  vertex.normal = normalize(gl_NormalMatrix * gl_Normal);
  gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
  vertex.color = vec4(1.0,0.0,0.0,1.0);

  if(shader == 1)
  {

    vec3 light_pos = vec3(gl_LightSource[0].position) - vertex.pos;

    //The dot product between the incident light and the normal vector
    float dot_product = max(dot(normalize(light_pos), vertex.normal), 0);

    //The distance from the light source to the vertex
    float distance = length(vertex.pos - light_pos);
    
    //Obtain the reflected light vector
    vec3 light_pos_reflected = reflect(-normalize(light_pos), vertex.normal);

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
    vec4 I_s = atten * specularColor * pow(max(dot(normalize(light_pos_reflected), normalize(-vertex.pos)), 0), (0.3 * specularExponent));
    
    vertex.color = I_a + I_d + I_s;

    ///////////////////////////////////////////////////
  }
}
