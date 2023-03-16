<template>
    <div class="yx-overview-logic">
        <img :src="Img" />
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
    img {
        width: 2765px;
        max-width: 2765px;
    }
}
</style>