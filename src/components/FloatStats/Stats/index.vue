<template>
    <div class="yx-stats">
        <div class="yx-stats-hd">
            {{ props.data.title }}
        </div>
        <div class="yx-stats-bd">
            <div class="yx-stats-props">
                <div @click="item.onClick" v-for="item in props.data.props" class="yx-stats-prop">
                    <div class="yx-stats-prop-item">
                        <div class="yx-stats-prop-key">
                            <div class="action">
                                <slot>

                                </slot>
                            </div>
                            <span class="text">{{ item.key }}</span>
                        </div>
                        <div class="yx-stats-prop-value">{{ item.value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="scss" scoped>
@include yx(stats) {
    pointer-events: all;

    &-hd {
        height: 80px;
        background: linear-gradient(180deg, rgba(0, 128, 255, 0) 0%, #0080FF 100%);
        box-shadow: inset 0px 0px 30px 6px #2979FF;

        font-size: 48px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 64px;
        letter-spacing: 1px;
        padding-left: 48px;
        display: flex;
        align-items: center;
    }

    &-bd {}

    &-props {}

    &-prop {
        &-item {
            display: flex;
            margin-top: 16px;

            &:last-child {
                margin-bottom: 16px;
            }
        }

        &-key {
            flex: 1.2;
            display: flex;
            align-items: center;
            flex-shrink: 0;

            .action {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                margin: 0 17px 0 47px;
            }

            .text {
                height: 56px;
                font-size: 42px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 56px;
                flex-shrink: 0;

            }
        }

        &-value {
            flex: 1;
            font-size: 44px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #F7B500;
            line-height: 59px;
            padding-left: 67px;
        }
    }
}
</style>