<template>
    <div class="yx-layout">
        <Viewer />
        <div class="yx-layout-collapse">
            <div class="yx-layout-inner" :class="{ collapse: gStore.menuCollapse }">
                <FloatMenu />
                <Main />
                <div @click="gStore.setMenuCollapse(true)" v-show="!gStore.menuCollapse" class="icon-collapse">
                    <img :src="Arrow01" alt="">
                </div>
            </div>
            <div @click="gStore.setMenuCollapse(false)" v-show="gStore.menuCollapse" class="icon-collapse2">
                <img :src="Arrow02" alt="">
            </div>
        </div>

        <FloatStats />
        <FloatGridSearch />
    </div>
</template>

<script setup>
import Viewer from "@/components/Viewer"
import FloatMenu from "@/components/FloatMenu";
import Main from "./Main";
import FloatStats from "@/components/FloatStats"
import FloatGridSearch from "@/components/FloatGridSearch"
import Arrow01 from "@/assets/images/arrow_01.png";
import Arrow02 from "@/assets/images/arrow_02.png";
import { ref, reactive, onMounted, defineEmits } from 'vue';
import { useGStore } from "@/store/modules"

const gStore = useGStore();

const data = reactive({
    isShowFloatStats: true,
});

</script>

<style lang="scss" scoped>
@include yx(layout) {
    @extend .fill-size;
    position: relative;

    &-collapse {
        height: 1118px;
        position: absolute;
        left: 0;
        top: 300px;
        pointer-events: none;
        display: flex;
    }

    &-inner {
        display: flex;
        /* position: absolute;
        left: 0;
        top: 300px;
        pointer-events: none;
        display: flex; */

        &.collapse {
            width: 0px;
            height: 0px;
            overflow: hidden;
        }
    }

}

.icon-collapse {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 9;
    pointer-events: all;
    cursor: pointer;
    width: 146px;
    height: 258px;
}

.icon-collapse2 {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
    z-index: 9;
    pointer-events: all;
    cursor: pointer;
    width: 146px;
    height: 258px;
}
</style>