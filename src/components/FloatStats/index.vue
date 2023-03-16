<template>
    <div class="yx-floatStats">
        <Stats :data="item" v-for="(item, index) in data.list" :key="index" />
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import Stats from "./Stats";
import { AIProbe, Grid } from "@/api/modules"
import Probe02 from "@/assets/images/probe_02.png";
import GriderImg from "@/assets/images/grider.png";
import { useRouter } from "vue-router"
import wktParser from "wkt";
import { useHumanStore } from "@/store/modules"
// import turf from "turf";

console.log("turf:", turf);

const humanStore = useHumanStore();

const router = useRouter();

const loadAIProbe = async () => {

    const { viewer } = window;
    if (!viewer) {
        alert("地图未加载完毕，请稍后")
    }

    const data = await AIProbe.GetList();
    const dataSourceName = "aiProbeDataSource"
    let dataSource = null;
    const dataSources = viewer.dataSources.getByName(dataSourceName)
    if (!dataSources[0]) {
        dataSource = new Cesium.CustomDataSource(dataSourceName);
        viewer.dataSources.add(dataSource);
        await dataSource.readyPromise;
    } else {
        dataSource = dataSources[0];
    }
    dataSource.entities.removeAll();

    for (const probe of data) {
        const { gbNo, lng, lat, cameraid } = probe;
        dataSource.entities.add({
            // id: gbNo,
            name: gbNo,
            position: Cesium.Cartesian3.fromDegrees(lng, lat),
            billboard: {
                image: Probe02,
                width: 75,
                height: 92,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            properties: {
                ...probe,
                type: "aiprobe",
                invoke: () => {
                    router.push(`/human/media/monitor?gbNo=${gbNo}&lng=${lng}&lat=${lat}&cameraid=${cameraid}`);
                }
            }
        });
    };

    const time = Cesium.JulianDate.now();
    dataSource.update(time);
    viewer.flyTo(dataSource);
}

const randomPoints = (arr) => {
    const coords = [];
    for (var i = 0; i < arr.length; i += 2) {
        coords.push(arr.slice(i, i + 2));
    }
    const polygon = turf.polygon([coords]);
    const bbox = turf.bbox(polygon);
    const points = turf.randomPoint(1, { bbox: bbox });
    const point = points.features[0];

    const result = turf.booleanWithin(point, polygon);
    if (!result) {
        return randomPoints(arr);
    } else {
        return turf.getCoord(point);
    }
}

const loadGriderDataSource = async (users, coords) => {
    let options = [];
    for (let i = 0; i < coords.length; i++) {
        const user = users[i];
        const coord = coords[i];
        options.push({
            position: Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 0),
            billboard: {
                image: GriderImg,
                width: 75,
                height: 92,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            properties: {
                ...user,
                type: "grider",
                lng: coord[0],
                lat: coord[1],
                invoke: () => {
                    // router.push(`/human/media/monitor?gbNo=${gbNo}&lng=${lng}&lat=${lat}&cameraid=${cameraid}`);
                }
            }
        })
    }

    const { viewer } = window;
    if (!viewer) {
        alert("地图未加载完毕，请稍后")
    }

    const data = await AIProbe.GetList();
    const dataSourceName = "aiProbeDataSource"
    let dataSource = null;
    const dataSources = viewer.dataSources.getByName(dataSourceName)
    if (!dataSources[0]) {
        dataSource = new Cesium.CustomDataSource(dataSourceName);
        viewer.dataSources.add(dataSource);
        await dataSource.readyPromise;
    } else {
        dataSource = dataSources[0];
    }
    dataSource.entities.removeAll();

    for (const item of options) {
        dataSource.entities.add(item);
    }

    const time = Cesium.JulianDate.now();
    dataSource.update(time);
    viewer.flyTo(dataSource);
}

const loadGrider = async () => {

    if (window.popup) { window.popup.close(), window.popup = null };

    const currRegion = window.currRegion;

    let areaName = currRegion.areaName;
    let params = {};
    if (areaName === "宝安区") {
        areaName = null;
    } else if (areaName.indexOf("街道") !== -1) {
        areaName = areaName.replace("街道", "")
    }

    if (currRegion.areaType === 2) {
        params.street = areaName;
    } else if (currRegion.areaType === 3) {
        params.area = areaName;
    } else if (currRegion.areaType === 4) {
        params.gridno = areaName;
    }
    // street=福永&area=白石厦&gridno=白石厦21

    const ress = await Grid.GetRegion({
        parentCode: currRegion.parentCode,
        areaType: currRegion.areaType
    });
    console.log("ress:", ress);

    // areaName
    const numData = await Grid.GetUserNum(params);
    const currData = ress.find(item => item.areaCode === currRegion.areaCode);
    console.log("num:", numData);

    const users = numData.inspectors;
    if (users.length <= 10) return;

    const geom = wktParser.parse(currData.areaInfo);
    const coords = geom.coordinates.flat(4);

    let randoms = [];
    let i = 10;
    while (i > 0) {
        const position = randomPoints(coords);
        console.log("position;", position, i);
        randoms.push(position);
        i = i - 1;
    }
    console.log("num randoms:", randoms);

    loadGriderDataSource(users, randoms);
}

const asyncLoad = (type) => {
    if (type === "1") {
        //添加地图标
        loadAIProbe();
        //关闭右侧面板

    } else if (type === '2') {
        loadGrider();
    }
}

const data = reactive({
    list: [
        {
            title: "格",
            props: [
                { key: "网格数", value: 4866 }
            ]
        },
        {
            title: "物",
            props: [
                { key: "基础设施", value: 35 },
                { key: "重点部位", value: 4 },
                { key: "公共服务", value: 20 }
            ]
        },
        {
            title: "人",
            props: [
                { key: "网格员巡查", value: 8061, onClick: () => asyncLoad("2") },
                { key: "视频AI巡查", value: 3, onClick: () => asyncLoad("1") },
                { key: "无人机AI巡查", value: 5262 }
            ]
        },
        {
            title: "事",
            props: [
                { key: "发现事件总数", value: 3557 },
                { key: "AI发现事件数", value: 1757, onClick: () => asyncLoad("2") },
                { key: "整治事件数", value: 5654 }
            ]
        },
    ]
});


</script>

<style lang="scss" scoped>
@include yx(floatStats) {
    width: 741px;
    height: 1136px;

    background: rgba(2, 47, 135, 0.95);
    box-shadow: inset 0px 0px 16px 6px #2979FF;
    border-radius: 26px;
    overflow: hidden;
    opacity: 0.93;
    // border: 2px solid;
    border-image: linear-gradient(90deg, rgba(205, 232, 255, 1), rgba(255, 255, 255, 1), rgba(158, 204, 255, 1)) 2 2;
    padding-bottom: 24px;

    position: absolute;
    right: 372px;
    top: 300px;
}
</style>