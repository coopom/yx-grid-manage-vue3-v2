<template>
    <div class="yx-layout">
        <Viewer />
        <div class="yx-layout-inner">
            <FloatMenu />
            <Main />
        </div>
    </div>
</template>

<script setup>
import Viewer from "@/components/Viewer"
import FloatMenu from "@/components/FloatMenu";
import Main from "./Main";
import { ref, reactive, onMounted, defineEmits } from 'vue';
const data = reactive({
    isShowFloatStats: true,
});

</script>

<style lang="scss" scoped>
@include yx(layout) {
    @extend .fill-size;
    position: relative;
    &-inner {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
        display: flex;
    }
}
</style>