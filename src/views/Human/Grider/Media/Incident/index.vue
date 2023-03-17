<template>
  <div class="yx-human-media-incident-view">
    <div class="yx-human-media-incident-view-inner">
      <IncidentInfo v-if="!data.isShowMore" @showMore="handleDisplayMore(true)" />
      <IncidentMore v-else @back="handleDisplayMore(false)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import IncidentInfo from './Info'
import IncidentMore from './More.vue'
import { Incident } from '@/api/modules'

const route = useRoute()
const data = reactive({
  isShowMore: false
})

onMounted(() => {
  const query = route.query
})

const handleDisplayMore = (show) => {
  data.isShowMore = show
}
</script>

<style lang="scss" scoped>
@include yx(human-media-incident-view) {
  width: 2474px;
  height: 1118px;
  background: url(/src/assets/images/panel_03.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>