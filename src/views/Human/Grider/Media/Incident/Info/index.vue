<template>
  <div class="yx-human-media-incident">
    <div class="yx-human-media-incident-left">
      <div class="yx-human-media-incident-basic">
        <div class="yx-human-media-incident-props">
          <div class="yx-human-media-incident-prop">
            <div class="yx-human-media-incident-prop-key">
              <img :src="iocImage" alt="" srcset="" /> 事件编号:
            </div>
            <div class="yx-human-media-incident-prop-value">
              {{ incident.ANJIANBIANHAO ?? '--' }}
            </div>
          </div>
          <div class="yx-human-media-incident-prop">
            <div class="yx-human-media-incident-prop-key">
              <img :src="iocImage" alt="" srcset="" /> 上报时间:
            </div>
            <div class="yx-human-media-incident-prop-value">{{ incident.ENTERTIME ?? '--' }}</div>
          </div>
          <div class="yx-human-media-incident-prop">
            <div class="yx-human-media-incident-prop-key">
              <img :src="iocImage" alt="" srcset="" /> 事件地址:
            </div>
            <div class="yx-human-media-incident-prop-value">{{ incident.PLACE ?? '--' }}</div>
          </div>
        </div>
        <div class="yx-human-media-incident-moreBtn" @click="handleShowMore">
          更多信息 <i class="iconfont icon-arrow-double-right" />
        </div>
      </div>
      <div class="yx-human-media-incident-middle">
        <div class="yx-human-media-incident-props">
          <div class="yx-human-media-incident-prop yx-human-media-incident-prop-1">
            <div class="yx-human-media-incident-prop-key">
              <img :src="iocImage" alt="" srcset="" /> 事件类别:
            </div>
            <div class="yx-human-media-incident-prop-value">{{ incident.SUBSERVICE ?? '--' }}</div>
          </div>
          <div class="yx-human-media-incident-prop">
            <div class="yx-human-media-incident-prop-key">
              <img :src="iocImage" alt="" srcset="" /> 事件名称:
            </div>
            <div class="yx-human-media-incident-prop-value">{{ incident.BUSITYPE3 ?? '--' }}</div>
          </div>
        </div>
        <div class="yx-human-media-incident-media-wrapper">
          <div
            v-for="(item, i) in beforerepairimages"
            @click="handleReviewImage"
            class="yx-human-media-incident-media-box"
            :key="i"
          >
            <img :src="item.FILENAME" />
          </div>
        </div>
        <div
          @click="handleReviewVideo"
          class="yx-human-media-incident-moreBtn yx-human-media-incident-moreBtn-1"
        >
          <img :src="sxjImage" alt="" srcset="" /> 事件回放
        </div>
      </div>
      <div class="yx-human-media-incident-last">
        <div class="yx-human-media-incident-props">
          <div class="yx-human-media-incident-prop yx-human-media-incident-prop-1">
            <div class="yx-human-media-incident-prop-key bold">
              <img :src="iocImage" alt="" srcset="" /> 办理结果:
            </div>
            <div class="yx-human-media-incident-prop-value bold">
              {{ incident.OUTRESULT ?? '--' }}
            </div>
          </div>
        </div>
        <div class="yx-human-media-incident-media-wrapper">
          <div
            @click="handleReviewImageafterrepair"
            v-for="(item, index) in afterrepairimages"
            class="yx-human-media-incident-media-box"
            :key="index"
          >
            <img :src="item.FILENAME" />
          </div>
        </div>
      </div>
    </div>
    <div class="yx-human-media-incident-right">
      <div class="yx-human-media-incident-sTitle">
        {{ data.route.title }}
        <i
          v-if="data.route.index !== 0"
          @click="handleCloseLocalRoute"
          class="iconfont icon-close-bold"
        />
      </div>
      <div class="yx-human-media-incident-right-inner">
        <Steps v-if="data.route.index === 0" :options="moments" />
        <Images v-if="data.route.index === 1" :options="beforerepairimages" />
        <Videos v-if="data.route.index === 2" :options="handleImages" />
        <Images v-if="data.route.index === 3" :options="afterrepairimages" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Steps from './Steps'
import Images from './Images'
import Videos from './Videos'
import TestImage from '@/assets/logo.svg'
import { Incident } from '@/api/modules'
import iocImage from '@/assets/images/shijianleibietongji.png'
import sxjImage from '@/assets/images/sxj.png'

const route = useRoute()

const moments = reactive([])
const incident = reactive({})
const beforerepairimages = reactive([]) //修复前
const afterrepairimages = reactive([]) //修复后
const handleImages = reactive([])

const asyncGet = async () => {
  console.log(route.query)
  const data = await Incident.Get(route.query)
  Object.keys(data).forEach((key) => {
    incident[key] = data[key]
  })
}

const asyncGetMedia = async () => {
  const data = await Incident.GetMedia(route.query)
  beforerepairimages.length = 0
  data.forEach((item) => {
    if (item.ATTTYPE == '修复前') {
      beforerepairimages.push(item)
    } else if (item.ATTTYPE == '修复后') {
      let imgurl = 'http://10.99.89.14:5000/file/' + item.FILENAME
      item.FILENAME = imgurl
      afterrepairimages.push(item)
    }
  })
}

const asyncGetMoments = async () => {
  const data = await Incident.GetMoments(route.query)
  let list = ['结案', '办理', '接收', '分中心分拨', '上报']

  let lisdata = []

  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    for (let j = 0; j < data.length; j++) {
      const element2 = data[j]
      if (element == element2.LINK) {
        lisdata.push(element2)
        break
      }
    }
  }
  moments.length = 0
  moments.push(...(lisdata ?? []))
}

const defaultRoute = { index: 0, title: '事件动态', component: Steps }
const routeStack = reactive([defaultRoute])

const data = reactive({
  route: routeStack[routeStack.length - 1]
})

watch(
  () => routeStack,
  () => {
    data.route = routeStack[routeStack.length - 1]
  },
  { deep: true }
)

const emit = defineEmits(['showMore'])
const handleShowMore = () => {
  emit('showMore')
}

const pushRoute = (route) => {
  const index = routeStack.findIndex((item) => item.index === route.index)
  if (index !== -1) {
    routeStack.splice(index, 1)
  }
  routeStack.push(route)
}

const popRoute = () => {
  routeStack.pop()
  if (routeStack.length <= 0) {
    routeStack.push(defaultRoute)
  }
}

const handleReviewImage = () => {
  pushRoute({ index: 1, title: '事件图片', component: Images })
}

const handleReviewImageafterrepair = () => {
  pushRoute({ index: 3, title: '办理结果图片', component: Images })
}

const handleReviewVideo = () => {
  pushRoute({ index: 2, title: '事件回放', component: Videos })
}

const handleCloseLocalRoute = () => {
  popRoute()
}

onMounted(() => {
  asyncGet()
  asyncGetMedia()
  asyncGetMoments()
})
</script>

<style lang="scss" scoped>
@include yx(human-media-incident) {
  @extend .fill-size;
  display: flex;

  &-left {
    width: 1287px;
    padding-left: 122px;
  }

  &-right {
    width: 977px;
    height: 1038px;
    margin: 39px 0 41px 0;
    background-color: #002770;
    box-sizing: border-box;
    border: 1px solid green;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &-inner {
      height: 100%;
      overflow: auto;
      padding-top: 32px;
    }
  }

  &-basic {
    position: relative;
    margin-right: 14px;
  }
  &-props {
    padding-bottom: 10px;
  }
  &-prop {
    font-size: 42px;
    font-family: MicrosoftYaHeiSemibold;
    color: #ffffff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    // line-height: 2;

    &-key {
      font-size: 42px;
      color: #fff;
      margin-right: 0.5em;
      img {
        width: 35px;
        height: 35px;
        float: left;
        margin: 16px 19px 0 36px;
      }
      &.bold {
        font-weight: bold;
      }
    }

    &-value {
      font-size: 42px;
      color: #fff;

      &.bold {
        font-weight: bold;
      }
    }
  }

  &-prop:nth-child(1) {
    margin-top: 72px;
  }

  &-prop-1 {
    margin-top: 23px !important;
  }
  &-moreBtn {
    position: absolute;
    right: 29px;
    top: 20px;
    font-size: 42px;
    font-weight: bold;
    color: #12f2fd;
    cursor: pointer;
    width: 222px;
    height: 62px;
    text-align: center;
    img {
      float: left;
      top: 20px;
      left: -26px;
      position: absolute;
    }
  }

  &-moreBtn-1 {
    top: 23px;
  }

  &-middle {
    border-top: 1px solid #00bff7;
    position: relative;
    margin-right: 14px;
  }

  &-media {
    &-wrapper {
      height: 202px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      overflow: auto;
      margin-bottom: 28px;
    }

    &-box {
      height: 100%;
      aspect-ratio: 356/202;
      padding: 0.5cqh;
      box-sizing: border-box;

      img {
        background-color: #002770;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-last {
    border-top: 1px solid #00bff7;
    position: relative;
    margin-right: 14px;
  }

  &-sTitle {
    width: 199px;
    height: 62px;
    padding: 53px 0 0 31px;
    font-size: 42px;
    font-weight: bold;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .iconfont {
      font-size: 2.6cqh;
      margin-right: 1em;
    }
  }
  &-right-inner {
    :deep() {
      .yx-iSteps-inner {
        .yx-step-item:last-child {
          .yx-step-item-hd::after {
            content: unset;
          }
        }
      }
    }
  }
}
</style>