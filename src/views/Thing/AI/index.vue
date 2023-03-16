<template>
    <div class="yx-thing-ai">
        <div class="yx-thi">
            <div class="yx-thi-routes">
                <div @click="handleClick(item)" :class="{ selected: route.path === item.path }"
                    v-for="item in routes" class="yx-thi-route">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <RouterView />
    </div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();

const list = reactive([
    {
        path: "/thing/ai/idex",
        title: "宝安区",
        paths: [
            "/thing/ai/idex/incidents",
            "/thing/ai/idex"
        ]
    },
    {
        path: "/thing/ai/idex/incidents",
        title: "事件列表",
        paths: [
            "/thing/ai/idex/incidents",
        ]
    }
]);

const routes = computed(() => {
    return list.filter(item => item.paths.includes(route.path))
})

const handleClick = (item) => {
    router.push({
        path: item.path,
        query: route.query
    })
}

</script>

<style lang="scss" scoped>
@include yx(thi) {
    position: absolute;
    transform: translateY(-100%);
    left: -33px;

    &-routes {
        display: flex;
    }

    &-route {
        width: 308px;
        height: 94px;
        background: center url(@/assets/images/tab_route.png);
        background-size: 100% 100%;
        font-size: 46px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.selected {
            background: center url(@/assets/images/tab_route_selected.png);
            background-size: 100% 100%;
        }
    }
}

@include yx(thing-ai) {
    position: relative;
}
</style>