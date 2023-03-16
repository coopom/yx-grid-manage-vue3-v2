/**
 * 等价多子域table
 */
if (!window.EQUIVALENT_DOMAIN_TALBE) {
    window.EQUIVALENT_DOMAIN_TALBE = {}
}

/**
 * 根据图层id，记住图层服务对应多域名
 * @param layerId
 * @param nodeDefault
 * @param nodeAlternatives
 */
function cacheLayerDomains(layerId, nodeDefault, nodeAlternatives) {
    if (!window.EQUIVALENT_DOMAIN_TALBE) {
        window.EQUIVALENT_DOMAIN_TALBE = {}
    }
    if (!nodeAlternatives) {
        return
    }
    if (!nodeAlternatives.includes(nodeDefault)) {
        nodeAlternatives.push(nodeDefault)
    }
    if (nodeAlternatives && nodeAlternatives && !window.EQUIVALENT_DOMAIN_TALBE[layerId]) {
        window.EQUIVALENT_DOMAIN_TALBE[layerId] = { nodeAlternatives, nodeDefault }
    }
}

/**
 * 计算string的numberic hash code
 * @param str
 * @returns {number}
 */
function str2hash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) {
        return hash;
    }
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

/**
 * 根据当前url，计算对应的转换url
 * @param url
 * @param nodeDefault
 * @param nodeAlternatives
 * @returns {*}
 */
function trans4url(url, nodeDefault, nodeAlternatives) {
    if (!nodeAlternatives.includes(nodeDefault)) {
        nodeAlternatives.push(nodeDefault)
    }
    var protocol = ''
    if (/^https?/.test(url)) {
        protocol = (new URL(url)).protocol + '//'
        url = url.replace(protocol, '')
    }
    var matchRegExp = null
    for (var i = 0; i < nodeAlternatives.length; i++) {
        var regExp = new RegExp('^' + nodeAlternatives[i], 'i')
        if (regExp.test(url)) {
            matchRegExp = regExp
            break;
        }
    }
    if (!matchRegExp) {
        return [protocol, url].join('');
    }

    var suffix = url.replace(matchRegExp, '');
    var hash = Math.abs(str2hash(suffix)) + ''
    var hit = nodeAlternatives.length % Number(hash[0])
    hit = hit === nodeAlternatives.length ? hit - 1 : hit
    return [protocol, nodeAlternatives[hit], suffix].join('');
}

/**
 * 修改3dtiles的请求策略，分流到多子域
 * @type {(function(): (boolean|*))|*}
 */
var requestContent = Cesium.Cesium3DTile.prototype.requestContent;
Cesium.Cesium3DTile.prototype.requestContent = function () {
    if (this.hasEmptyContent) {
        return false;
    }
    var domainTable = window.EQUIVALENT_DOMAIN_TALBE;
    if (domainTable && Object.keys(domainTable).length && !!this._tileset) {
        var { nodeDefault, nodeAlternatives } = domainTable[this._tileset.id || this._tileset.guid] || {}
        if (nodeAlternatives && nodeAlternatives.length) {
            this._contentResource.url = trans4url(this._contentResource.url, nodeDefault, nodeAlternatives)
        }
    }
    return requestContent.call(this);
};

/**
 * 修改imagery的请求策略，分流到多子域
 * @type {(imageryProvider: ImageryProvider, url: (Resource | string)) => (Promise<HTMLImageElement | HTMLCanvasElement> | undefined)}
 */
var loadImage = Cesium.ImageryProvider.loadImage;
Cesium.ImageryProvider.loadImage = function(imageryProvider, resource) {
    var domainTable = window.EQUIVALENT_DOMAIN_TALBE;

    if (domainTable && Object.keys(domainTable).length) {
        var config;
        if (imageryProvider._tags) {
            config = domainTable[imageryProvider._tags.id]
        }
        if (!imageryProvider._tags && imageryProvider.credit && imageryProvider.credit.html) {
            try {
                var credit = JSON.parse(imageryProvider.credit.html)
                if (credit && credit.nodeDefault && credit.nodeAlternatives) {
                    config = credit;
                }
            } catch (e) {

            }
        }
        if (config) {
            var { nodeDefault, nodeAlternatives } = config;
            if (nodeAlternatives && nodeAlternatives.length) {
                resource.url = trans4url(resource.url, nodeDefault, nodeAlternatives)
            }
        }
    }
    return loadImage.call(this, imageryProvider, resource)
};

/**
 * 修改dem的请求策略，分流到多子域
 * @type {(x: number, y: number, level: number, request?: Request) => (Promise<TerrainData> | undefined)}
 */
var requestTileGeometry = Cesium.CesiumTerrainProvider.prototype.requestTileGeometry;
Cesium.CesiumTerrainProvider.prototype.requestTileGeometry = function (x, y, level, request) {
    var domainTable = window.EQUIVALENT_DOMAIN_TALBE;
    var layers = this._layers;
    var layerCount = layers.length;
    var layerToUse;

    if (layerCount === 1) { // Optimized path for single layers
        layerToUse = layers[0];
    } else {
        for (var i = 0; i < layerCount; ++i) {
            var layer = layers[i];
            if (layer.availability === undefined || layer.availability.isTileAvailable(level, x, y)) {
                layerToUse = layer;
                break;
            }
        }
    }

    if (!layerToUse) {
        return requestTileGeometry.call(this, x, y, level, request)
    }

    if (domainTable && Object.keys(domainTable).length) {
        var { nodeDefault, nodeAlternatives } = domainTable['Cesium.viewer.terrainProvider'] || {}
        if (nodeAlternatives && nodeAlternatives.length) {
            layerToUse.resource.url = trans4url(layerToUse.resource.url, nodeDefault, nodeAlternatives)
        }
    }
    return requestTileGeometry.call(this, x, y, level, request)
}

