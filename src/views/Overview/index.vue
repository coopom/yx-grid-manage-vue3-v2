<template>
    <div class="yx-overview">
        <RouterView />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include yx(overview) {
    @extend .fill-size;
    box-sizing: border-box;
}
</style>