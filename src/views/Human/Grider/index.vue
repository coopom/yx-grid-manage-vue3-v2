<template>
  <div class="yx-human-grider">
    <div class="yx-human">
      <div class="yx-human-routes">
        <div
          @click="handleClick(item)"
          :class="{ selected: route.path === item.path }"
          v-for="(item, i) in routes"
          class="yx-human-route"
          :key="i"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <RouterView @changeIncident="handleChangeIncident" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const list = reactive([
  {
    path: '/human/grider/media',
    title: '监控信息',
    paths: ['/human/grider/media']
  },
  {
    path: '/human/media/incidents',
    title: '涉及事件',
    paths: ['/human/grider/media', '/human/media/incidents']
  },
  {
    path: '/human/media/incident',
    title: '事件信息',
    paths: ['/human/media/incident']
  }
])

const routes = computed(() => {
  return list.filter((item) => item.paths.includes(route.path))
})

const router = useRouter()
const handleClick = (item) => {
  router.push(item.path)
}
const data = reactive({
    path: route.path
});
const implicits = [
  {
    title: '事件信息',
    path: '/human/media/incident',
    refPaths: ['/human/media/incident'],
    isFilter: true
  }
]
const pushImplicRoute = (path, options) => {
  const implicitRoute = implicits.find((item) => item.path === path)
  if (!implicitRoute) {
    return
  }

  const index = list.findIndex((item) => item.path === path)
  if (index === -1) {
    localRoutes.push(implicitRoute)
  }
  data.path = implicitRoute.path
  router.push({
    path,
    ...options
  })
}
const handleChangeIncident = (incident) => {
  pushImplicRoute('/human/media/incident', {
    query: {
      ...route.query,
      instid: incident.INSTID,
      caseId: incident.ANJIANBIANHAO,
      srcsysid: incident.SRCSYSID,
    }
  })
}
</script>

<style lang="scss" scoped>
@include yx(human) {
  position: absolute;
  transform: translateY(-100%);
  margin-left: -33px;
  &-routes {
    display: flex;
  }

  &-route {
    width: 308px;
    height: 94px;
    background: center url(@/assets/images/tab_route.png);
    background-size: 100% 100%;
    font-size: 46px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.selected {
      background: center url(@/assets/images/tab_route_selected.png);
      background-size: 100% 100%;
    }
  }
}

@include yx(human-grider) {
  //   position: relative;
}
</style>