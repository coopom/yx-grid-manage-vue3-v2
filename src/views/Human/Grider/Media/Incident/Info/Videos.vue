<template>
    <div class="yx-human-media-incident-videos">
        <VideoJSPlayer :src="src" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { AIProbe } from "@/api/modules"
import VideoJSPlayer from "@/components/VideoJSPlayer"

const {
    VITE_YT_USER,
    VITE_YT_PASS
} = import.meta.env;

const route = useRoute();
const src = ref("");

const asyncGet = async () => {
    const res = await AIProbe.Login({
        username: VITE_YT_USER,
        password: VITE_YT_PASS
    })
        .then(() => {
            return AIProbe.GetHistoryVideo(route.query);
        });
    let url = res.liveUrlList.flv;
    // let url = res.liveUrlList.hls;
    // if(url) {
    //     url = url.replace(".m3u8", "/hls.m3u8")
    // };
    src.value = url;
    console.log("data:", res);
}

onMounted(() => {
    asyncGet();
})

</script>

<style lang="scss" scoped>
@include yx(human-media-incident-videos) {
    width: 100%;
    height: 100%;
    overflow: hidden;

    video {
        width: 100%;
        height: 100%;
        object-fit: fill;
        background: #000;
    }
}
</style>