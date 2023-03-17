<template>
    <div class="yx-iSteps">
        <div class="yx-iSteps-inner">
            <StepItem :data="item" v-for="item in options"/>
        </div>
    </div>
</template>

<script setup>
import StepItem from "./StepItem";
const props = defineProps({
    options: {
        type: Array,
        default: () => ([])
    }
});
</script>

<style lang="scss" scoped>
@include yx(iSteps) {}
</style>