const source = `
uniform sampler2D image;
uniform vec4 color;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 colorImage = texture2D(image,st);
  vec3 fragColor = color.rgb;
  material.alpha = colorImage.a * color.a * 1.;
  material.diffuse = max(fragColor.rgb  +  colorImage.rgb , fragColor.rgb);
  return material;
}
`;

Cesium.Material.PolylineLightingType = 'PolylineLighting'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineLightingType,
  {
    fabric: {
      type: Cesium.Material.PolylineLightingType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        image: Cesium.Material.DefaultImageId
      },
      source: source
    },
    translucent: function(material) {
      return true
    }
  }
)
