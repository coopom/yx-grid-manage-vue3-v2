<template>
    <div class="yx-floatMenu-priMenu">
        <div class="yx-floatMenu-priMenu-inner">
            <div class="yx-floatMenu-priMenu-item" @click="handleClick(item)" v-for="(item, index) in props.data">
                <div class="yx-floatMenu-priMenu-item-inner">
                    <div class="yx-floatMenu-priMenu-item-title" :class="{ selected: route.path.startsWith(item.path) }">
                        {{ item.title.length <= 1 ? `&nbsp;${item.title}&nbsp;` : item.title }} </div>
                    </div>
                </div>
            </div>
            <div class="yx-floatMenu-priMenu-child">
                <SecMenu v-for="(item, index) in secRoutes" :data="item" />
            </div>
        </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import SecMenu from "./SecMenu";

const props = defineProps({
    data: Object
});

const route = useRoute();
const router = useRouter();

let data = reactive({
    selectedMenu: null
});

const secRoutes = computed(() => {
    return data.selectedMenu?.children;
});

const handleClick = (item) => {
    data.selectedMenu = item;
    router.push(item.path)
}

onMounted(() => {
    for(const item of props.data) {
        const d = item.children.find(c => c.path === route.path);
        if(d) {
            data.selectedMenu = item;
        }
    }
})

</script>

<style lang="scss" scoped>
.yx-floatMenu-priMenu-item:nth-child(1) .yx-floatMenu-priMenu-item-title {
    margin-left: -60px;
}

.yx-floatMenu-priMenu-item:nth-child(2) .yx-floatMenu-priMenu-item-title {
    margin-left: -30px;
}

.yx-floatMenu-priMenu-item:nth-child(3) .yx-floatMenu-priMenu-item-title {
    margin-left: 20px;
}

.yx-floatMenu-priMenu-item:nth-child(4) .yx-floatMenu-priMenu-item-title {
    margin-left: -30px;
}

.yx-floatMenu-priMenu-item:nth-child(5) .yx-floatMenu-priMenu-item-title {
    margin-left: -60px;
}

@include yx(floatMenu-priMenu) {
    width: 289px;
    height: 1118px;
    box-sizing: border-box;
    background: left center url(@/assets/images/menu_left_bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    padding-bottom: 50px;

    &-inner {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    &-item {
        flex: 1;
        width: 100%;
        cursor: pointer;

        &-inner {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        &-title {
            font-size: 48px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #FFFFFF;
            letter-spacing: 1px;
            box-sizing: border-box;
            height: 100%;
            background: center url(@/assets/images/pri_menu.png) no-repeat;
            background-size: 160px 188px;
            text-align: center;
            padding-top: 66px;

            &:hover,
            &.selected {
                background: center url(@/assets/images/pri_menu_selected.png) no-repeat;
                background-size: 170px 188px;
            }
        }
    }

    &-child {
        width: 498px;
        box-sizing: border-box;
        padding: 11px 0;
    }
}</style>