<template>
    <div class="yx-videojs-player">
        <div class="yx-videojs-player-inner" style=" width: 100%; height: 100%;"  id="container" ref="refcontainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, markRaw ,reactive, nextTick} from "vue";
import Player from "./Player";

const props = defineProps({
    src: String
})
const refVideojsPlayer = ref();
let player = null;

const refcontainer = ref()
const state=reactive({
    jessibuca:null
})

let video1 = null
const start = async (url) => {
    const src = url ?? props.src;
    if (!src) return;
    await nextTick()
    let options = {}
    video1 = new window.Jessibuca(
        Object.assign(
            {
                container: refcontainer.value,
                debug: true,
                forceNoOffscreen: true,
                isNotMute: true,
                isResize: false,
                loadingText: "疯狂加载中...",
                operateBtns: {
                  audio: false,
                  fullscreen: false,
                  play: false,
                  screenshot: false
                },
                showBandwidth: false, // 显示网速
                supportDblclickFullscreen: true,
                text: "",
                timeout: 10,
                useMSE: true,
                useWCS: false,
                videoBuffer: 0.2, // 最大缓冲时长，单位秒
                // background: "bg.jpg",
                // hasAudio:false,
                vod: undefined,
              },
              options
        )
    )
    
    video1.play(src);
}

const stop = () => {
    if (player) player.destroy();
}

watch(
    () => props.src,
    (newVal, olVal) => {
        if (newVal) {
            console.log("newVal:", newVal);
            stop();
            start(newVal);
        }
    },
    { deep: true }
)

onMounted(() => start());

onUnmounted(() => stop());

</script>

<style lang="scss" scoped>
@include yx(videojs-player) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-inner{
        background: rgba(13, 14, 27, 1);
    }
}
</style>