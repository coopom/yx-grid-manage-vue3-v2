<template>
    <div class="yx-layout">
        <FloatMenu />
        <Main/>
    </div>
</template>

<script setup>
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
    display: flex;
}
</style>