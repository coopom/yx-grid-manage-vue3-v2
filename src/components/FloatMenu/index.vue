<template>
    <div class="yx-floatMenu">
        <PriMenu :data="menus" />
    </div>
</template>

<script setup>
import Main from "../Layout/Main";
import PriMenu from "./PriMenu";

const menus = [
    {
        title: "概况",
        icon: "",
        path: "/overview",
        children: [
            { title: "概况", icon: "icon-gaikuang", path: "/overview/idex" },
            { title: "总逻辑图", icon: "icon-zongluojitu", path: "/overview/logic" },
            { title: "大巡查", icon: "icon-daxuncha", path: "/overview/patrol" },
            { title: "大智慧", icon: "icon-dazhihui", path: "/overview/smart" },
            { title: "大执法", icon: "icon-dazhifa", path: "/overview/law" }
        ]
    },
    {
        title: "格",
        icon: "网格信息",
        path: "/grid",
        children: [
            { title: "网格信息", icon: "icon-wanggexinxi", path: "/grid/idex" }
        ]
    },
    {
        title: "物",
        icon: "",
        path: "/objects",
        children: [
            { title: "基础设施", icon: "" },
            { title: "重点部位", icon: "" },
            { title: "公共服务", icon: "" },
        ]
    },
    {
        title: "人",
        icon: "",
        path: "/human",
        children: [
            { title: "网格员巡查", icon: "icon-wanggeyuanxuncha", path: "/human/grider", },
            { title: "视频AI巡查", icon: "icon-shipinAIxuncha", path: "/human/media", },
            { title: "无人机AI巡查", icon: "icon-wurenji", path: "/human/uav", },
        ]
    },
    {
        title: "事",
        icon: "",
        path: "/thing",
        children: [
            { title: "事件上报统计", icon: "", path: "/thing/report" },
            { title: "事件类别统计", icon: "", path: "/thing/cate" },
            { title: "视频AI事件", icon: "", path: "/thing/ai" },
        ]
    },
]
</script>

<style lang="scss" scoped>
@include yx(floatMenu) {
    box-sizing: border-box;
    width: 796px;
    height: 1118px;
    background: left center url(@/assets/images/menu_bg.png) no-repeat;
    background-size: 100% 100%;
    border: 1px solid red;
    box-sizing: border-box;
    display: flex;
    pointer-events: all;
}
</style>
