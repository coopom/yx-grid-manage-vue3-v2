<template>
    <div class="yx-videojs-player">
        <!-- <video muted="true" ref="refVideojsPlayer" class="video-js vjs-fluid vjs-default-skin yx-videojs-player-inner"
            controls preload="auto" style="
                                width: 100%; 
                                height: 100%; 
                                object-fit:contain;
                                background-color: #000;
                            ">
        </video> -->
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
    // new Player(refVideojsPlayer.value, {
    //     src: "http://219.151.31.38/liveplay-kk.rtxapp.com/live/program/live/hnwshd/4000000/mnf.m3u8"
    //     // src //: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8"
    // })
    // .readyPromise
    // .then((_player) => {
    //     log('_player',_player)
    //     player = _player;
    //     player.play();
    // })
    // .catch(err => {
    //     console.error("err:", err);
    // });
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
}
</style>