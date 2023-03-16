<template>
    <div class="yx-human-grider-idex-call">
        <div class="yx-human-grider-idex-call-left">
            <div class="yx-human-grider-idex-call-avatar">
                <img :src="data.PHOTO" alt="avatar">
            </div>
            <div class="yx-human-grider-idex-call-props">
                <div class="yx-human-grider-idex-call-prop">
                    <div class="yx-human-grider-idex-call-prop-key">姓名：</div>
                    <div class="yx-human-grider-idex-call-prop-value">{{ data.USERNAME ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-call-prop">
                    <div class="yx-human-grider-idex-call-prop-key">单位：</div>
                    <div class="yx-human-grider-idex-call-prop-value">{{ data.COMPANY ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-call-prop">
                    <div class="yx-human-grider-idex-call-prop-key">人员类型：</div>
                    <div class="yx-human-grider-idex-call-prop-value">--</div>
                </div>
                <div class="yx-human-grider-idex-call-prop">
                    <div class="yx-human-grider-idex-call-prop-key">终端号码：</div>
                    <div class="yx-human-grider-idex-call-prop-value">--</div>
                </div>
            </div>
        </div>
        <div class="yx-human-grider-idex-call-right"></div>
    </div>
</template>

<script setup>

import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router"
import { Grider } from "@/api/modules"

const route = useRoute();
const data = reactive({})

const asyncGet = async () => {
    const query = route.query;
    const res = await Grider.Get({ pid: query.YONGHUBIANHAO });
    const user = res[0] ?? {};
    Object.keys(user).forEach(key => {
        data[key] = user[key];
    })
}

onMounted(() => {
    asyncGet();
});

watch(
    () => route.query,
    (newVal, oldVal) => {
        asyncGet()
    },
    { deep: true }
)

</script>

<style lang="scss" scoped>
@include yx(human-grider-idex-call) {
    width: 2474px;
    height: 1118px;
    background: url(@/assets/images/panel_03.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    padding: 87px 146px 77px 283px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;

    &-left {
        flex: 1;
    }

    &-avatar {
        width: 383px;
        height: 502px;
        background-color: blue;
        margin-bottom: 32px;
        margin-top: 57px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    &-props {}

    &-prop {
        display: flex;
        margin-bottom: 23px;

        &-key {
            font-size: 42px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 56px;
        }

        &-value {
            font-size: 42px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 56px;
        }
    }

    &-right {
        flex-shrink: 0;
        width: 1290px;
        height: 954px;
        background: rgba(0, 0, 0, 0.46);
    }
}
</style>