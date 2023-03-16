

export default class Camera {

    static fit(camera, carts) {
        camera.setView({
            destination: Cesium.Rectangle.fromCartesianArray(carts),
        });
    }

}