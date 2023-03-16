<template>
    <div class="yx-layout-main">
        <RouterView />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(layout-main) {
    height: 1118px;
    box-sizing: border-box;
    pointer-events: all;
    position: relative;
}
</style>