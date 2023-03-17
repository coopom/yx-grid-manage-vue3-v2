<template>
    <div class="yx-human-media-incident-images">
        <el-image style="width: 100%; height: 100%;" :src="images[0]" :preview-src-list="images" :preview-teleported="true"
            fit="cover" :hide-on-click-modal="true" />
    </div>
</template>

<script setup>
import TestImage from "@/assets/logo.svg";
import { computed } from "vue"
const props = defineProps({
    options: {
        type: Array
    }
});

const images = computed(() => {
    console.log("props.options:", props.options);
    return props.options.map(item => item.FILENAME)
})
</script>

<style lang="scss" scoped>
@include yx(human-media-incident-images) {}
</style>