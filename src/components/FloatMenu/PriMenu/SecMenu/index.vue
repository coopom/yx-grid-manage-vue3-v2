<template>
    <div class="yx-floatMenu-secMenu">
        <div class="yx-floatMenu-secMenu-inner">
            <div v-if="props.data && props.data.title" class="yx-floatMenu-secMenu-item" @click="handleClick">
                <div class="yx-floatMenu-secMenu-item-text">
                    <i :class="`iconfont ${props.data.icon}`" />
                    {{ props.data.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<style lang="scss" scoped>
@include yx(floatMenu-secMenu) {
    border: 10px solid green;
    width: 498px;

    &-inner {}

    &-item {
        &-text {
            font-size: 46px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 62px;
        }
    }

}
</style>