<template>
    <div class="yx-human">
        <RouterView />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(human) {
    @extend .fill-size;
    box-sizing: border-box;
}
</style>