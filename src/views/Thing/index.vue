<template>
    <div class="yx-thing">
        <RouterView />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(thing) {
    /* @extend .fill-size; */
    box-sizing: border-box;
}
</style>