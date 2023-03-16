var Popup = function (info) {
    this.constructor(info);
}

Popup.prototype.createStyle = function (options) {
}
Popup.prototype.createElementFromHTML = function (htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
Popup.prototype.constructor = function (info) {
    var _this = this;
    _this.id = btoa(Date.now());
    _this.createStyle();
    _this.viewer = info.viewer;//弹窗创建的viewer
    _this.position = info.position;//弹窗挂载的位置
    _this.id = "popup_" + _this.id;
    // _this.ctn = $("<div class='bx-popup-ctn' id =  '"+_this.id+"'>");
    _this.ctn = _this.createElementFromHTML("<div class='bx-popup-ctn' id ='" + _this.id + "'>")
    // $(_this.viewer.container).append( _this.ctn);
    _this.viewer.container.appendChild(_this.ctn);

    //测试弹窗内容
    // var testConfig = {
    //     header: "测试数据",
    //     content: "<div>测试窗口</div>",
    // }
    const header = info?.header ?? "测试数据";
    const content = info?.content ?? "<div>测试窗口</div>";
    // _this.ctn.append(_this.createHtml(testConfig.header,testConfig.content));
    const element = _this.createElementFromHTML(_this.createHtml(header, content));
    _this.ctn.appendChild(element);
    element.querySelector(".bx-popup-header-close-ctn").onclick = () => info.onClose(this);

    _this.render(_this.position);
    _this.eventListener = _this.viewer.clock.onTick.addEventListener(function (clock) {
        _this.render(_this.position);
    });
}
// 实时刷新
Popup.prototype.render = function (position) {
    var _this = this;
    var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene, position);
    if (_this.ctn && position) {
        // _this.ctn.css("left", position.x - _this.ctn.get(0).offsetWidth / 2);
        _this.ctn.style.left = `${position.x - _this.ctn.firstChild.offsetWidth / 2}px`;
        // _this.ctn.css("top", position.y - _this.ctn.get(0).offsetHeight - 10);
        _this.ctn.style.top = `${position.y - _this.ctn.firstChild.offsetHeight - 30}px`;
    }
}
// 动态生成内容
Popup.prototype.createHtml = function (header, content) {
    var html = `
        <div class="bx-popup-wrapper">
            <div class="bx-popup-header-ctn">
                ${header}
                <div class="bx-popup-header-close-ctn"></div>
            </div>
            <div class="bx-popup-content-ctn">
                <div class="bx-popup-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
    return html;
}
// 关闭弹窗按钮
Popup.prototype.close = function () {
    var _this = this;
    _this.viewer.clock.onTick.removeEventListener(_this.eventListener);
    if (_this.ctn) {
        _this.ctn.parentElement.removeChild(_this.ctn);
        _this.ctn = null;
    }
}