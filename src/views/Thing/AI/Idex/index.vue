<template>
    <div class="yx-thing-ai-idex">
        <div class="yx-thing-ai-idex-hd"></div>
        <div class="yx-thing-ai-idex-bd">
            <div class="yx-table">
                <div class="yx-table-hd">
                    <div class="yx-table-tr">
                        <div class="yx-table-th">街道</div>
                        <div class="yx-table-th">区域</div>
                        <div class="yx-table-th">城管</div>
                        <div class="yx-table-th">消防安全</div>
                    </div>
                </div>
                <div class="yx-table-bd">
                    <div v-for="item in list" class="yx-table-tr">
                        <div class="yx-table-td">{{ item.street }}</div>
                        <div class="yx-table-td">{{ item.community }}</div>
                        <div class="yx-table-td">{{ item.cg }}</div>
                        <div class="yx-table-td">{{ item.xf }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { Incident } from "@/api/modules"

const search = reactive({
    in_date: null
});

const list = reactive([]);

const asyncGetList = async () => {
    const data = await Incident.GetAIList(search);
    console.log("data:", data);
    list.length = 0;
    list.push(...(data.map(item => ({
        ...item,
        cg: item["城管"],
        xf: item["消防安全"]
    }))));
}

onMounted(() => {
    asyncGetList();
})

</script>

<style lang="scss" scoped>
@include yx(table) {

    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-hd {
        flex-shrink: 0;
        width: 100%;
        height: 111px;
        border-radius: 12px 12px 0px 0px;
        border: 4px solid #2979FF;
        box-sizing: border-box;
        background-color: rgba(41, 120, 253, 0.50);
    }

    &-bd {
        display: block;
        flex: 1;
        overflow: auto;
        width: 100%;
        /* height: 100%; */
        border: 4px solid #2979FF;
        border-radius: 12px;
        box-sizing: border-box;
    }

    &-tr {
        width: 100%;
        flex-shrink: 0;
        display: flex;
    }

    &-th {
        height: 111px;
        font-size: 44px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 58px;
        flex: 1;
        border-right: 1px solid #2979FF;
        display: flex;
        align-items: center;
        justify-content: center;

        &:last-child {
            border-right: 0px;
        }
    }

    &-td {
        font-size: 42px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        flex: 1;
        border: 1px solid #2979FF;
        height: 111px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #2979FF;
        box-sizing: border-box;

        &:last-child {
            border-right: 0px;
        }

        &:nth-child(3), &:nth-child(4) {
            &:hover {
                /* background-color: rgba(41, 120, 253, 0.50); */
                cursor: pointer;
                color: #2979FF;
                text-decoration: underline;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@include yx(thing-ai-idex) {
    width: 2474px;
    height: 1118px;
    background: url(@/assets/images/panel_03.png)no-repeat;
    background-size: 100% 100%;
    padding: 69px 90px 50px 200px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &-hd {
        height: 100px;
    }

    &-bd {
        flex: 1;
        overflow: auto;
    }
}</style>