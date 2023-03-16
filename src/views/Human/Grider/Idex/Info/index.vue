<template>
    <div class="yx-human-grider-idex-info">
        <div class="yx-human-grider-idex-info-inner">
            <div class="yx-human-grider-idex-info-props">
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">姓名</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.USERNAME ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">管控通号码</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">性别</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.XINGBIE ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">年龄</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.GENDAR ?? "-" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">籍贯</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.JIGUAN ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">民族</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.NATION ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">学历</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.XUELI ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">血型</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">所属街道</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.STREET ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">所属社区</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.SHEQU ?? "--" }}</div>
                </div>
            </div>
            <div class="yx-human-grider-idex-info-props">
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">网格编码</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.WORKGRIDNO ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">网格员星级</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">网格名称</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.WORKGRID ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">政治面貌</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.ZHENGZHIMIANMAO ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">在岗状态</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.ZAIGANGZHUANGTAI ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">楼栋长熟</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">管辖楼栋数</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">所属大队/中队</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.SUOSHUDADUI ?? "--" }}/{{ data.SUOSHUZHONGDUI
                        ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">职务</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.DUTY ?? "--" }}</div>
                </div>
                <div class="yx-human-grider-idex-info-prop">
                    <div class="yx-human-grider-idex-info-prop-key">单位名称</div>
                    <div class="yx-human-grider-idex-info-prop-value">{{ data.COMPANY ?? "--" }}</div>
                </div>
            </div>
        </div>
        <div class="yx-human-grider-idex-info-actions">
            <div class="yx-human-grider-idex-info-avatar">
                <img :src="data.PHOTO" alt="avatar">
            </div>
            <div @click="handleCall" class="yx-human-grider-idex-info-yuyin">
                <span class="iconfont icon-yuyin"></span>
                <span>语音通话</span>
            </div>
            <div @click="handleCall" class="yx-human-grider-idex-info-shipin">
                <span class="iconfont icon-shipintonghua"></span>
                <span>视频通话</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import { Grider } from "@/api/modules"

const route = useRoute();
const data = reactive({})
const router = useRouter();

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

const handleCall = () => {
    router.push({
        path: "/human/grider/idex/call",
        query: route.query
    })
}

</script>

<style lang="scss" scoped>
@include yx(human-grider-idex-info) {
    width: 2474px;
    height: 1118px;
    background: url(@/assets/images/panel_03.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    padding: 47px 103px 35px 180px;
    box-sizing: border-box;
    overflow: hidden;

    &-inner {
        flex: 1;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }

    &-props {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    &-prop {
        width: 50%;
        display: flex;
        box-sizing: border-box;
        height: 102px;

        &-key {
            width: 308px;
            height: 102px;
            background: rgba(41, 120, 253, 0.5);
            border: 1px solid #00BFF7;
            font-size: 42px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 0px;
            box-sizing: border-box;
        }

        &-value {
            box-sizing: border-box;
            border: 1px solid #00BFF7;
            font-size: 42px;
            font-family: MicrosoftYaHei;
            color: #FFFFFF;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &-actions {
        flex-shrink: 0;
        margin-left: 25px;
    }

    &-avatar {
        width: 263px;
        height: 345px;
        background-color: blue;
        margin-bottom: 60px;
    }

    &-yuyin {
        height: 56px;
        font-size: 42px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 56px;
        margin-top: 27px;
        margin-bottom: 30px;
        text-align: center;
        cursor: pointer;

        .iconfont {
            font-size: 42px;
            margin-right: 9px;
        }
    }

    &-shipin {
        height: 56px;
        font-size: 42px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 56px;
        text-align: center;
        cursor: pointer;

        .iconfont {
            font-size: 42px;
            margin-right: 9px;
        }
    }
}
</style>