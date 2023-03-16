
class Tooltip {

    constructor(viewer, options) {
        this.id = options.id;
        this.viewer = viewer;
        this.scene = viewer.scene;
        this.html = options?.html;
        this._text = options?.text ?? "默认提示";
        this._show = options?.show ?? false;
        this.position = options?.position ?? Cesium.Cartesian3.ZERO;
        this.init(options);
    }

    set show(val) {
        if (val === this._show) {
            return;
        }
        this.updateDisplay(val);
        this._show = val;
    }

    get show() {
        return this._show;
    }

    set text(val) {
        this.updateText(val);
        this._text = val;
    }
    get text() {
        return this._text;
    }

    createElement() {
        // this.viewer.container.insertAdjacentHTML("beforeend", `
        //     <div id="${this.id}" class="cesium-widgets-tooltip" style="position: fixed; left: 0; top: 0;">
        //         <div class="tooltip-text" style="background: rgba(63, 72, 84, 0.6); padding: 12px 24px; border-radius: 4px; font-size: 14px; color: #fff; white-space: nowrap;">${this.text}</div>
        //         <div class="tooltip-arrow" style="position: absolute; bottom: 0px; left: 50%; transform: translate(-50%, 100%); border-style: solid; border-width: 10px 10px 0 10px; border-color: rgba(63, 72, 84, 0.6) transparent transparent transparent;;"></div>
        //     </div>
        // `);

        this.viewer.container.insertAdjacentHTML("beforeend", this.html);
    }

    updatePosition() {
        if (!this.element) {
            return this.element;
        }
        const { scene } = this.viewer;
        const windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, this.position);
        const { offsetWidth, offsetHeight } = this.element;
        this.element.style.left = `${windowPosition.x - (offsetWidth / 2)}px`;
        this.element.style.top = `${windowPosition.y - offsetHeight - 10}px`;
    }

    updateDisplayOn3D() {
        if (!this.element) {
            return this.element;
        }
        const { scene, camera } = this.viewer;
        const cameraPosition = camera.position;
        let cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(cameraPosition).height;
        cameraHeight += scene.globe.ellipsoid.maximumRadius;
        if ((!(Cesium.Cartesian3.distance(cameraPosition, this.position) > cameraHeight)) && camera.positionCartographic.height < 50000000) {
            this.element.style.display = "block";
        } else {
            this.element.style.display = "none";
        }
    }

    updateDisplay(show) {
        if (!this.element) {
            return this.element;
        }
        this.element.style.display = show ? "block" : "none";
    }

    updateText(text) {
        if (!this.element) {
            return this.element;
        }
        const textElement = this.element.querySelector(".tooltip-text");

        if (textElement) {
            textElement.innerText = text;
        }
    }

    render = () => {
        if (!this.element) {
            const element = this.viewer.container.querySelector(`#${this.id}`);
            this.element = element;
            this.updateDisplay();
        }
        this.updatePosition();

        if (this.show) {
            this.updateDisplayOn3D();
        }
    }

    init() {
        this.createElement();
        this.scene.postRender.addEventListener(this.render);
    }

    destroy() {
        this.scene.postRender.removeEventListener(this.render);
        if (this.element) {
            this.viewer.container.removeChild(this.element);
        }
    }
}

export default Tooltip;