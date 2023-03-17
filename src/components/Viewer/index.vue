<template>
    <div class="yx-viewer">
        <div id="cimSceneContaienr" class="cim-scene"></div>
    </div>
</template>

<script setup>
import { CimScene, ENV, CIM_SCENE_EVENTS } from "@ft-cim/cim-js";
import { onMounted } from 'vue';

onMounted(() => {
    if (!window.cimScene) {
        const scene = (window.cimScene = new CimScene('cimSceneContaienr', {
            url: '',
            token: '',
            layers: []
            //adminAreaOptions: {
            // show: true,
            // showLabel: false,
            // current: {
            //     adcode: "4403",
            //     level: 1,
            // },
            //},
        }))

        scene.$on(CIM_SCENE_EVENTS.LOAD_END_EVENT, () => {
            const viewer = window.viewer = window._sf3d.viewer
            initEvents(viewer);
        })

        const initEvents = (viewer) => {
            initClickEvent(viewer);
        }

        const initClickEvent = (viewer) => {
            const scene = viewer.scene
            const time = Cesium.JulianDate.now()
            const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
            handler.setInputAction((e) => {
                const pick = scene.pick(e.position);
                if (pick) {
                    const entity = pick.id
                    if (entity) {
                        const props = entity.properties.getValue(time);
                        console.log('props:', props);
                        // 1、如果点击拾取到实体信息，且实体信息包含 invoke 方法，就执行 invoke 方法
                        if (props.invoke) {
                            props.invoke();
                        }

                        // 2、
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
    }
})

</script>

<style lang="scss" scoped>
@include yx(viewer) {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    overflow: hidden;
    background: #000;

    #cimSceneContaienr {
        width: 100%;
        height: 100%;
    }
}
</style>