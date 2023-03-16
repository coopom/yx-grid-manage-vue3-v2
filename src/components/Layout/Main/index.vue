<template>
    <div class="yx-layout-main">
        <RouterView/>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(layout-main) {
    border: 10px solid green;
    height: 1118px;
    box-sizing: border-box;
}
</style>