<template>
    <div class="yx-floatGridSearch">
        <div class="yx-floatGridSearch-inner">
            <div class="yx-floatGridSearch-input" :class="{ 'yx-floatGridSearch-input--collapse': collapse }">
                <div class="yx-floatGridSearch-input-inner">
                    <div class="yx-floatGridSearch-input-icon">
                        <i class="iconfont icon-dicengjiagou" />
                    </div>
                    <div @click="handleCollapse" class="yx-floatGridSearch-input-text">{{ region.areaName }}</div>
                    <div class="yx-floatGridSearch-input-icon">
                        <i class="iconfont icon-dicengjiagou" />
                    </div>
                </div>
            </div>
            <div class="yx-floatGridSearch-popup">
                <div class="yx-floatGridSearch-levels" :class="{ 'yx-floatGridSearch-levels--collapse': collapse }">
                    <div @click="handleClickLevel(item)" v-for="item in levels" class="yx-floatGridSearch-level">{{
                        item.areaName }}</div>
                </div>
                <div class="yx-floatGridSearch-childs" :class="{ 'yx-floatGridSearch-childs--collapse': collapse }">
                    <div :title="item.areaName" @click="handleClickChild(item)" v-for="item in region.childs"
                        class="yx-floatGridSearch-child">{{
                            item.areaName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue';
import wktParser from "wkt";
import { Grid } from "@/api/modules"
import { CIM_SCENE_EVENTS } from "@ft-cim/cim-js";
import {
    PolylineFlowMaterialProperty,
    PolylineTrailMaterialProperty,
    PolylineLightingMaterialProperty
} from "@/utils/Cesium";

import { useHumanStore } from "@/store/modules"

const humanStore = useHumanStore();

let viewer = null;
const collapse = ref(true);

const defaultRegion = {
    areaName: "宝安区",
    areaType: 1,
    areaCode: "440306",
    parentCode: "4403",
    parentName: "深圳市",
    childs: []
}
const region = reactive({ ...defaultRegion });
const levels = reactive([defaultRegion]);

const Get = (options) => {
    return Grid.GetRegion(options);
}

const asyncGetChilds = async () => {
    const data = await Get({
        parentCode: region.areaCode,
        areaType: region.areaType + 1
    });
    if (!region.childs) [
        region.childs = []
    ]
    region.childs.length = 0;
    region.childs.push(...data.map(({ areaInfo, ...rest }) => rest));
}

const parse2GeoJSON = (data) => {
    return {
        type: "FeatureCollection",
        features: data.map(({ areaInfo, ...rest }) => ({
            type: "Feature",
            geometry: wktParser.parse(areaInfo),
            properties: rest
        }))
    }
}

const parse2EntityOptions = (data) => {
    return data.map((item) => {
        const { areaInfo, ...rest } = item;
        const geom = wktParser.parse(areaInfo);
        return {
            id: item.areaCode,
            name: item.areaName,
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(geom.coordinates.flat(3)),
                // material: new PolylineFlowMaterialProperty({
                //     color: Cesium.Color.GREEN,
                //     speed: 5,
                //     percent: 0.2,
                //     gradient: 0.8
                // }),
                // material: new PolylineTrailMaterialProperty({
                //     color: Cesium.Color.GREEN,
                //     speed: 10,
                //     gradient: 0.8
                // }),
                material: new PolylineLightingMaterialProperty({
                    // color: Cesium.Color.YELLOW,
                    color: Cesium.Color.fromCssColorString("#11a1ba"),
                }),
                width: 50,
                clampToGround: true
            },
            properties: rest
        }
    })
}

const draw = async (viewer, options) => {
    const dataSourceName = "regionDataSource"
    let dataSource = viewer.dataSources.getByName(dataSourceName)[0];
    if (!dataSource) {
        dataSource = new Cesium.CustomDataSource(dataSourceName);
        await viewer.dataSources.add(dataSource);
    }
    dataSource.entities.removeAll();
    for (const option of options) {
        dataSource.entities.add(option);
    }
    const time = Cesium.JulianDate.now();
    dataSource.update(time)
    viewer.flyTo(dataSource);
}

const updateNum = async (data) => {
    window.currRegion = data;
    // const num = await Grid.GetUserNum(params);
    // window.currRegion = data;
    // window.griderNum = num;
    // humanStore.griderNum = num;
    // console.log("111data:", num);
}

const beforeDraw = async (data, query) => {
    const res = await Get(query ?? {
        parentCode: data.areaCode,
        areaType: data.areaType + 1
    });
    // console.log("draw res:", data);
    window.currRegion = toRaw(data ?? query);
    // const geojson = parse2GeoJSON(res);
    const options = parse2EntityOptions(res);

    if (window.viewer) {
        draw(window.viewer, options);
    } else {
        window.cimScene.$on(CIM_SCENE_EVENTS.LOAD_END_EVENT, () => {
            window.viewer = window._sf3d.viewer
            draw(window.viewer, options);
        })
    }

    // const currRegion = res.find(item => item.areaCode === (data?.areaCode ?? query.areaCode));
    // console.log("currRegion:", res, data);
    // updateNum(currRegion);
}

const addLevels = (data) => {
    // 判断 levels 是否有同级别
    const index = levels.findIndex(item => item.areaType === data.areaType);
    if (index !== -1) {
        levels.splice(index, 1, data)
    } else {
        levels.push(data)
    }
}
const updateRegionChids = (data) => {
    asyncGetChilds(data);
}
const updateRegion = (data) => {
    const { childs, ...rest } = toRaw(region);
    Object.keys(rest).forEach(key => {
        region[key] = data[key]
    });
    if (data.areaType < 4) {
        updateRegionChids(data);
    };
    // console.log("draw data:", data);
    beforeDraw(data);
}

const handleCollapse = () => {
    collapse.value = !collapse.value;
    if (!collapse.value && (!region.childs || !region.childs.length)) {
        updateRegion(region);
    }
}

const handleClickChild = (item) => {
    addLevels(item);
    updateRegion(item);
}

const updateLevels = (index) => {
    const arr = levels.slice(0, index + 1)
    levels.length = 0;
    levels.push(...arr);
}
const handleClickLevel = (data) => {
    const index = levels.findIndex(item => item.areaCode === data.areaCode);
    if (index === -1) {
        return;
    }
    updateLevels(index);
    updateRegion(data);
}

onMounted(() => {
    beforeDraw(null, region);
})
</script>

<style lang="scss" scoped>
@include yx(floatGridSearch) {
    pointer-events: all;
    position: absolute;
    right: 1180px;
    background-color: #133d8f;
    box-shadow: inset 0px 0px 4px 1px #2979ff;
    border-radius: 20px;
    overflow: hidden;
    top: 300px;

    &-inner {
        width: 100%;
    }

    &-input {
        width: 100%;
        height: 100%;

        &-inner {
            height: 100%;
            color: #fff;
            display: flex;
            align-items: center;
            border: 1px solid #03b7f4;
        }

        &-icon {
            flex-shrink: 0;

            .iconfont {
                color: #fff;
                font-size: 40px;
            }
        }

        &-text {
            color: #fff;
            font-size: 50px;
            flex: 1;
            text-align: left;
            padding: 20px 30px;
            cursor: pointer;
        }

        &--collapse {
            width: 500px;
        }
    }

    &-popup {
        width: 100%;
        font-size: 40px;
        color: #fff;
    }

    &-levels {
        line-height: 2;
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: 0px 30px;
        border: 1px solid #03b7f4;
        @include ellipsis();

        &--collapse {
            padding: 0;
            width: 0px;
            height: 0px;
            overflow: hidden;
            border: 0px;
        }
    }

    &-level {
        font-size: 50px;

        &::before {
            content: "-";
        }

        &:first-child {
            &::before {
                display: none;
            }
        }
    }

    &-childs {
        border: 2px solid #03b7f4;
        display: flex;
        flex-wrap: wrap;
        width: 900px;
        box-sizing: border-box;
        max-height: 600px;
        overflow: auto;

        &--collapse {
            width: 0px;
            height: 0px;
            overflow: hidden;
            padding: 0;
        }
    }

    &-child {
        width: 33.33333333%;
        text-align: center;
        line-height: 2;
        font-size: 50px;
        white-space: nowrap;
        box-sizing: border-box;
        cursor: pointer;
        @include ellipsis();
    }
}
</style>