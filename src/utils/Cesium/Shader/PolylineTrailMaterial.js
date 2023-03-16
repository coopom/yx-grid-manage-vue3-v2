const source = `
uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput){
   czm_material material = czm_getDefaultMaterial(materialInput);
   vec2 st = materialInput.st;
   float time = fract(czm_frameNumber * speed / 1000.0);
   material.diffuse = color.rgb;
   material.alpha = color.a * fract(st.s-time);
   return material;
}
`;

Cesium.Material.PolylineTrailType = 'PolylineTrail'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {
    fabric: {
        type: Cesium.Material.PolylineTrailType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
            image: Cesium.Material.DefaultImageId,
            speed: 1,
            repeat: new Cesium.Cartesian2(1, 1)
        },
        source: source
    },
    translucent: function (material) {
        return true
    }
})
