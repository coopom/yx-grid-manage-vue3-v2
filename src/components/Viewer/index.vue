<template>
    <div class="yx-viewer">
        <div id="cimSceneContaienr" class="cim-scene"></div>
    </div>
</template>

<script setup>
import { CimScene, ENV, CIM_SCENE_EVENTS } from "@ft-cim/cim-js";
import { onMounted } from 'vue';
import { useRouter } from "vue-router"
// import { Popup } from "@/utils/Cesium"

const router = useRouter();

window.popup = null;

const createPopup = (props) => {

    if (window.popup) { window.popup.close(), window.popup = null };

    let html = '';
    if (props.type === "grider") {
        html = `
            <div class="yx-grider">
                <div class="yx-grider-inner">
                <div class="yx-grider-hd">
                    <div class="yx-grider-avatar">
                        <img src="${props.ZHAOPIAN}" />
                    </div>
                    <div class="yx-grider-props">
                    <div class="yx-grider-prop">
                        <div class="yx-grider-prop-key">姓名：</div>
                        <div class="yx-grider-prop-key">${props.YONGHUMINGCHENG}</div>
                    </div>
                    <div class="yx-grider-prop">
                        <div class="yx-grider-prop-key">单位：</div>
                        <div class="yx-grider-prop-value">${props.SUOSHUDADUI}</div>
                    </div>
                    <div class="yx-grider-prop">
                        <div class="yx-grider-prop-key">人员类型：</div>
                        <div class="yx-grider-prop-value">${props.ZHIWU}</div>
                    </div>
                    <div class="yx-grider-prop">
                        <div class="yx-grider-prop-key">终端号码：</div>
                        <div class="yx-grider-prop-value">${props.JINJILIANXIDIANHUA}</div>
                    </div>
                    </div>
                </div>
                <div class="yx-grider-bd">
                    <div class="yx-grider-actions">
                        <div id="yyCall" class="yx-grider-action">
                            <span class="iconfont icon-yuyin"></span>
                            语音通话
                        </div>
                        <div id="spCall" class="yx-grider-action">
                            <span class="iconfont icon-shipintonghua"></span>视频通话
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `
        window.popup = new Popup({
            viewer: window.viewer,
            // position: Cesium.Cartesian3.fromDegrees(Number(data.x), Number(data.y), 0),
            // position: //new Cesium.Cartesian3(data.x, data.y, data.z),
            position: props.cartesian3,
            // header: "事件详情",
            content: html,
            onClose: (popup) => {
                if (popup) { popup.close(), popup = null };
            }
        });

        router.push(`/human/grider/idex/info?YONGHUBIANHAO=${props.YONGHUBIANHAO}`)
    }
    // document.getElementById("yyCall").addEventListener("click", () => {
    //     const data = props;
    // })
    // document.getElementById("spCall").addEventListener("click", () => {
    //     const data = props;
    // })


}

onMounted(() => {
    if (!window.cimScene) {
        const scene = (window.cimScene = new CimScene('cimSceneContaienr', {
            url: '',
            token: '',
            layers: []
            //adminAreaOptions: {
            // show: true,
            // showLabel: false,
            // current: {
            //     adcode: "4403",
            //     level: 1,
            // },
            //},
        }))

        scene.$on(CIM_SCENE_EVENTS.LOAD_END_EVENT, () => {
            const viewer = window.viewer = window._sf3d.viewer
            initEvents(viewer);
        })

        const initEvents = (viewer) => {
            initClickEvent(viewer);
        }

        const initClickEvent = (viewer) => {
            const scene = viewer.scene
            const time = Cesium.JulianDate.now()
            const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
            handler.setInputAction((e) => {
                const pick = scene.pick(e.position);
                if (pick) {
                    const entity = pick.id
                    if (entity) {
                        const props = entity.properties.getValue(time);
                        console.log('props:', props);
                        // 1、如果点击拾取到实体信息，且实体信息包含 invoke 方法，就执行 invoke 方法
                        if (props.invoke) {
                            props.invoke();
                        }

                        // 2、
                        if (props.type === "grider") {
                            props.cartesian3 = entity.position.getValue(time)
                            createPopup(props);
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
    }
})

</script>

<style lang="scss" scoped>
@include yx(viewer) {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    overflow: hidden;
    background: #000;

    #cimSceneContaienr {
        width: 100%;
        height: 100%;
    }
}
</style>