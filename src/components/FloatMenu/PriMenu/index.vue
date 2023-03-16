<template>
    <div class="yx-floatMenu-priMenu">
        <div class="yx-floatMenu-priMenu-inner">
            <div class="yx-floatMenu-priMenu-item" @click="handleClick(item)" v-for="(item, index) in props.data">
                <div class="yx-floatMenu-priMenu-item-title">
                    {{ item.title.length <= 1 ? `&nbsp;${item.title}&nbsp;` : item.title }} </div>
                </div>
            </div>
            <div class="yx-floatMenu-priMenu-child">

                <SecMenu v-for="(item, index) in secRoutes" :data="item" />

            </div>
        </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import SecMenu from "./SecMenu";

const props = defineProps({
    data: Object
});

const route = useRoute();

let data = reactive({
    selectedMenu: null
});

const secRoutes = computed(() => {
    return data.selectedMenu?.children;
});

const handleClick = (item) => {
    data.selectedMenu = item;
}

</script>

<style lang="scss" scoped>
@include yx(floatMenu-priMenu) {
    width: 289px;
    height: 1118px;
    box-sizing: border-box;
    background: left center url(@/assets/images/menu_left_bg.png) no-repeat;
    background-size: 100% 100%;
    border: 1px solid red;
    display: flex;

    &-inner {}

    &-item {
        font-size: 48px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 60px;
        letter-spacing: 1px;
        height: 200px;
        border: 1px solid red;
    }

    &-child {
        width: 498px;
    }
}
</style>