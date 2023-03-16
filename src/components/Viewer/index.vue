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
        })
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