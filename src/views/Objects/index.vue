<template>
    <div class="yx-objects">
        <RouterView />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(objects) {
    @extend .fill-size;
    box-sizing: border-box;
}
</style>