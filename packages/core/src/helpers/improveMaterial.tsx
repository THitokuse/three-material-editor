import {
  getShaderWithObc,
} from './shaderToMaterial';

export const addShaderDebugMaterial = (material: any) => {
  let newMaterial = material;
  const shader = getShaderWithObc(newMaterial)
  newMaterial = Object.assign(newMaterial, shader);

  // const epoch = Date.now();
  // add a uniform time helper for animations
  // if (!newMaterial.uniforms.time) {
  //   newMaterial.uniforms.time = {
  //     value: 0.0
  //   }
  // }

  // wait the first compilation that will inject data into the material shaders
  setTimeout(() => {
    newMaterial.onBeforeCompile = function (shader: any) {
      // troika break if we attribute uniforms
        // sometimes we lose the uniforms ?
        // if (!newMaterial.editorAttributeUniforms) {
        //   newMaterial.editorAttributeUniforms = true
          shader.uniforms = Object.assign(shader.uniforms, newMaterial.uniforms);
        // }
      // @ts-ignore
      if (this.editorOnBeforeCompile) {
        // @ts-ignore
        this.editorOnBeforeCompile.call(this, shader)
      }
      // } else {
        // override with the editor
      //   shader.vertexShader = shader.vertexShader;
      //   shader.fragmentShader = shader.fragmentShader;
      // }
  
      // if time detected in obc or material, automatically update the value
      // if (shader.uniforms.time) {
        // shader.uniforms.time = {
        //   // @ts-ignore
        //   get value() {
        //     return (Date.now() - epoch) / 1000;
        //   },
        // };
      // }
    };
  }, 0);
  return {
    debug: null,
    material: newMaterial,
  };
};
