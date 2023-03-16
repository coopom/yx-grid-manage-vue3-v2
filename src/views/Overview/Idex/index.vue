<template>
    <div class="yx-overview-idx">
        <div class="yx-overview-idx-props">
            <div @click="router.push(`/human/media/monitor`)" class="yx-overview-idx-title">宝安区</div>
        </div>
        <div class="yx-overview-idx-props">
            <div class="yx-overview-idx-prop">
                <div class="yx-overview-idx-prop-icon">
                    <img style="wdith: 92px; height: 89px;" :src="Icon01" />
                </div>
                <div class="yx-overview-idx-prop-key"><span style="color:#F7B500; font-weight: bold;">397</span>Km²</div>
                <div class="yx-overview-idx-prop-value">概况</div>
            </div>
            <div class="yx-overview-idx-prop">
                <div class="yx-overview-idx-prop-icon">
                    <img style="wdith: 140px; height: 90px;" :src="Icon02" />
                </div>
                <div class="yx-overview-idx-prop-key"><span style="color:#F7B500; font-weight: bold;">5045260</span>人</div>
                <div class="yx-overview-idx-prop-value">人口</div>
            </div>
        </div>
        <div class="yx-overview-idx-props">
            <div class="yx-overview-idx-prop">
                <div class="yx-overview-idx-prop-icon">
                    <img style="wdith: 111px; height: 98px;" :src="Icon03" />
                </div>
                <div class="yx-overview-idx-prop-key"><span style="color:#F7B500; font-weight: bold;">167943</span>栋</div>
                <div class="yx-overview-idx-prop-value">楼栋</div>
            </div>
            <div class="yx-overview-idx-prop">
                <div class="yx-overview-idx-prop-icon">
                    <img style="wdith: 110px; height: 94px;" :src="Icon04" />
                </div>
                <div class="yx-overview-idx-prop-key"><span style="color:#F7B500; font-weight: bold;">901814</span>家</div>
                <div class="yx-overview-idx-prop-value">商事主体</div>
            </div>
            <div class="yx-overview-idx-prop">
                <div class="yx-overview-idx-prop-icon">
                    <img style="wdith: 92px; height: 92px;" :src="Icon05" />
                </div>
                <div class="yx-overview-idx-prop-key"><span style="color:#F7B500; font-weight: bold;">108489</span>家</div>
                <div class="yx-overview-idx-prop-value">三小场所</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import Icon01 from "@/assets/images/icon-01.png"
import Icon02 from "@/assets/images/icon-02.png"
import Icon03 from "@/assets/images/icon-03.png"
import Icon04 from "@/assets/images/icon-04.png"
import Icon05 from "@/assets/images/icon-05.png"

const router = useRouter();
</script>

<style lang="scss" scoped>
@include yx(overview-idx) {
    width: 1672px;
    height: 1118px;
    background: url(@/assets/images/panel_02.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;

    &-title {
        width: 571px;
        height: 152px;
        background: center url(@/assets/images/popup_01.png) no-repeat;
        background-size: 100% 100%;
        font-size: 46px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 133px;
        margin-bottom: 8px;
    }

    &-props {
        display: flex;
        justify-content: center;
        margin-bottom: 32px;
    }

    &-prop {
        width: 424px;
        height: 305px;
        background: center url(@/assets/images/popup_03.png) no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &-key {
            font-size: 46px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 62px;
            margin: 14px 0px 6px;
        }

        &-value {
            font-size: 44px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            line-height: 58px;
        }
    }
}
</style>