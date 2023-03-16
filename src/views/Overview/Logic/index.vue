<template>
    <div class="yx-overview-logic">
        <div class="yx-overview-logic-inner">
            <div class="yx-overview-logic-scroll">
                <img :src="Img" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Img from "@/assets/images/overview_logic.png"
</script>

<style lang="scss" scoped>
@include yx(overview-logic) {
    width: 2474px;
    height: 1118px;
    background: url(@/assets/images/panel_03.png) no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 22px 22px 20px 130px;

    &-inner {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &-scroll {
        width: 100%;
        height: 100%;
        overflow: auto;

        img {
            width: 2765px;
            max-width: 2765px;
        }
    }
}
</style>