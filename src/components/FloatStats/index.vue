<template>
    <div class="yx-floatStats">
        <Stats :data="item" v-for="(item, index) in data.list" :key="index" />
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import Stats from "./Stats";
import { AIProbe } from "@/api/modules"
import Probe02 from "@/assets/images/probe_02.png";
import { useRouter } from "vue-router"

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
        dataSource.entities.removeAll();
        await dataSource.readyPromise;
    }

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

const loadGrider = async () => {
    
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
                { key: "网格数", value: 265262 }
            ]
        },
        {
            title: "物",
            props: [
                { key: "基础设施", value: 65961 },
                { key: "重点部位", value: 15612 },
                { key: "公共服务", value: 34234211 }
            ]
        },
        {
            title: "人",
            props: [
                { key: "网格员巡查", value: 626, onClick: () => asyncLoad("2") },
                { key: "视频AI巡查", value: 3, onClick: () => asyncLoad("1") },
                { key: "无人机AI巡查", value: 5262 }
            ]
        },
        {
            title: "事",
            props: [
                { key: "发现事件总数", value: 64562062 },
                { key: "AI发现事件数", value: 2315515, onClick: () => asyncLoad("2") },
                { key: "整治事件数", value: 1231525 }
            ]
        },
    ]
})
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
    top: 0;
}
</style>