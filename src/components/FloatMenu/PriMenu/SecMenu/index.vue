<template>
    <div class="yx-floatMenu-secMenu" :class="{ selected: route.path == props.data.path }">
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
import { useRouter, useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

const handleClick = () => {
    router.push(props.data.path)
    console.log("data:", props.data);
}
</script>

<style lang="scss" scoped>
.yx-floatMenu-secMenu:nth-child(1) {

    &:hover,
    &.selected {
        background: center url(@/assets/images/menu_btn_selected_01.png) no-repeat;
        background-size: 100% 100%;
    }
}

.yx-floatMenu-secMenu:nth-child(2) {

    &:hover,
    &.selected {
        background: center url(@/assets/images/menu_btn_selected_02.png) no-repeat;
        background-size: 100% 100%;
    }
}

.yx-floatMenu-secMenu:nth-child(3) {

    &:hover,
    &.selected {
        background: center url(@/assets/images/menu_btn_selected_03.png) no-repeat;
        background-size: 100% 100%;
    }
}

.yx-floatMenu-secMenu:nth-child(4) {

    &:hover,
    &.selected {
        background: center url(@/assets/images/menu_btn_selected_04.png) no-repeat;
        background-size: 100% 100%;
    }
}

.yx-floatMenu-secMenu:nth-child(5):hover {

    &:hover,
    &.selected {
        background: center url(@/assets/images/menu_btn_selected_05.png) no-repeat;
        background-size: 100% 100%;
    }
}

.yx-floatMenu-secMenu:nth-child(6):hover {

&:hover,
&.selected {
    background: center url(@/assets/images/menu_btn_selected_06.png) no-repeat;
    background-size: 100% 100%;
}
}


.yx-floatMenu-secMenu:nth-child(1) .yx-floatMenu-secMenu-item {
    padding-left: 111px;
    &-text {
        .iconfont {
            margin-right: 41px;
        }
    }
}

.yx-floatMenu-secMenu:nth-child(2) .yx-floatMenu-secMenu-item {
    padding-left: 156px;

    &-text {
        .iconfont {
            margin-right: 34px;
        }
    }
}

.yx-floatMenu-secMenu:nth-child(3) .yx-floatMenu-secMenu-item {
    padding-left: 177px;

    &-text {
        .iconfont {
            margin-right: 34px;
        }
    }
}

.yx-floatMenu-secMenu:nth-child(4) .yx-floatMenu-secMenu-item {
    padding-left: 177px;

    &-text {
        .iconfont {
            margin-right: 34px;
        }
    }
}

.yx-floatMenu-secMenu:nth-child(5) .yx-floatMenu-secMenu-item {
    padding-left: 177px;

    &-text {
        .iconfont {
            margin-right: 34px;
        }
    }
}

@include yx(floatMenu-secMenu) {
    width: 498px;
    box-sizing: border-box;
    margin-left: -100px;
    padding: 11px;
    margin-bottom: 17px;
    transition: .3s;

    &:last-child {
        margin-bottom: 0px;
    }

    &:nth-child(1) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_01.png) no-repeat;
        background-size: 100% 100%;
    }

    &:nth-child(2) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_02.png) no-repeat;
        background-size: 100% 100%;
    }

    &:nth-child(3) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_03.png) no-repeat;
        background-size: 100% 100%;
    }

    &:nth-child(4) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_04.png) no-repeat;
        background-size: 100% 100%;
    }

    &:nth-child(5) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_05.png) no-repeat;
        background-size: 100% 100%;
    }

    &:nth-child(6) {
        width: 580px;
        height: 148px;
        box-sizing: border-box;
        background: center url(@/assets/images/menu_btn_06.png) no-repeat;
        background-size: 100% 100%;
    }

    &-inner {
        width: 100%;
        height: 100%;
    }

    &-item {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;

        &-text {
            font-size: 46px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 62px;
            display: flex;
            align-items: center;

            .iconfont {
                font-size: 40px;
            }
        }
    }

}
</style>