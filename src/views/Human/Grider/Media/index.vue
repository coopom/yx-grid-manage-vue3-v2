<template>
  <div class="yx-human-grider-media">
    <div class="yx-human-grider-media-title">{{ data.busitype3 ?? '--' }}</div>
    <div class="yx-human-grider-media-props">
      <div class="yx-human-grider-media-prop">
        <div class="yx-human-grider-media-prop-key">
          <span>设备编号</span>
        </div>
        <div class="yx-human-grider-media-prop-value">
          <span>{{ data.objid ?? '--' }}</span>
        </div>
      </div>
      <div class="yx-human-grider-media-prop">
        <div class="yx-human-grider-media-prop-key">
          <span>所在网格</span>
        </div>
        <div class="yx-human-grider-media-prop-value yx-human-grider-media-prop-value-1">
          <span>{{ data.gridno ?? '--' }}</span>
        </div>
      </div>
      <div class="yx-human-grider-media-prop">
        <div class="yx-human-grider-media-prop-key">
          <span>网格员</span>
        </div>
        <div class="yx-human-grider-media-prop-value yx-human-grider-media-prop-value-1">
          <span>{{ data.ownerby ?? '--' }}</span>
        </div>
      </div>
    </div>
    <div class="yx-human-grider-media-props">
      <div class="yx-human-grider-media-prop yx-human-grider-media-prop-1">
        <div class="yx-human-grider-media-prop-key">
          <span>地址</span>
        </div>
        <div class="yx-human-grider-media-prop-value yx-human-grider-media-prop-value-2">
          <img :src="dz" alt="" />
          <span>{{ data.place ?? '--' }}</span>
        </div>
      </div>
    </div>
    <div class="yx-human-grider-media-info">
      <div class="yx-human-grider-media-info-left">
        <div class="yx-human-grider-media-info-left-box">
          <div class="yx-human-grider-media-info-left-box-vlue">
            <span>{{ data.dateFlow ?? '--' }}</span>
            <span>件</span>
          </div>
          <div class="yx-human-grider-media-info-left-box-key">今日上报事件</div>
        </div>
        <div class="yx-human-grider-media-info-left-box">
          <div class="yx-human-grider-media-info-left-box-vlue">
            <span>{{ data.monthFlow ?? '--' }}</span>
            <span>件</span>
          </div>
          <div class="yx-human-grider-media-info-left-box-key">本月上报事件</div>
        </div>
        <div class="yx-human-grider-media-info-left-box">
          <div class="yx-human-grider-media-info-left-box-vlue">
            <span>{{ data.yearFlow ?? '--' }}</span>
            <span>类</span>
          </div>
          <div class="yx-human-grider-media-info-left-box-key">已识别事件</div>
        </div>
        <div class="yx-human-grider-media-info-left-box">
          <div class="yx-human-grider-media-info-left-box-vlue">
            <span>{{ data.seq ?? '--' }}</span>
            <span>米</span>
          </div>
          <div class="yx-human-grider-media-info-left-box-key">可识别范围</div>
        </div>
      </div>
      <div class="yx-human-grider-media-info-right">
        <Vue3VideoPlayer v-show="data.url" :src="data.url" />
      </div>
    </div>
    <div class="yx-human-grider-media-list">
      <div class="yx-human-grider-media-list-box" v-for="item in controbut" :key="item">
        <img :src="item.src" alt="" />
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AIProbe } from '@/api/modules'
import { list } from '@/api/modules/AIProbe'
import monitor1 from '@/assets/images/human_media_monitor11.png'
import monitor2 from '@/assets/images/human_media_monitor22.png'
import monitor3 from '@/assets/images/human_media_monitor33.png'
import monitor4 from '@/assets/images/human_media_monitor44.png'
import dz from '@/assets/images/dz.png'
import Vue3VideoPlayer from '@/components/Vue3VideoPlayer'
const data = reactive({
  url: ''
})

const controbut = [
  {
    src: monitor1,
    value: '多场景识别'
  },
  {
    src: monitor2,
    value: '远中近视角'
  },
  {
    src: monitor3,
    value: '间隔式巡查'
  },
  {
    src: monitor4,
    value: '全天候值守'
  }
]

const route = useRoute()
const asyncGet = async () => {
  const gbNo = route.query.gbNo
  const probe = list.find((item) => item.gbNo === gbNo)
  const res = await AIProbe.Get(gbNo)
  Object.keys(res).forEach((key) => {
    data[key] = res[key]
  })
  data.lng = probe.lng
  data.lat = probe.lat
}
watch(
  () => route.query.gbNo,
  () => {
    asyncGet()
  }
)

onMounted(() => {
  asyncGet()
  asyncGetM3U8()
})
onUnmounted(() => {
  stopHeart()
})
const { VITE_XH_USER, VITE_XH_PASS } = import.meta.env
const asyncGetM3U8 = async () => {
  AIProbe.LoginXH({
    loginName: VITE_XH_USER,
    password: VITE_XH_PASS
  })
    .then((res) => {
      const { id, sessionid } = res
      return { id, sessionid }
    })
    .then(({ id, sessionid }) => {
      return AIProbe.GetXHStream({
        userid: id,
        ...route.query
      })
    })
    .then((res) => {
      const { sessionid, hlsUrl } = res
      startHeart(sessionid)
      data.url = hlsUrl
    })
}

let timer = -1
const startHeart = (sessionid) => {
  timer = setInterval(async () => {
    await AIProbe.GetXHHeart({
      sessionid: sessionid
    })
  }, 1000)
}

const stopHeart = () => {
  if (timer) clearInterval(timer)
}
</script>

<style lang="scss" scoped>
@include yx(human-grider-media) {
  width: 1672px;
  height: 1118px;
  background: url(/src/assets/images/panel_02.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;

  &-title {
    padding: 70px 0 0 153px;
    max-width: 1519px;
    height: 61px;
    font-size: 46px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #ffffff;
    line-height: 61px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &-props {
    padding: 51px 0 0 159px;
    height: 94px;
  }

  &-prop {
    width: 520px;
    height: 92px;
    border-radius: 6px;
    border: 1px solid #2b73f0;
    float: left;
    &-key {
      width: 219px;
      background: #2b73f0;
      border-radius: 6px;
      text-align: center;
      line-height: 92px;
      float: left;
    }
    &-value {
      width: 279px;
      font-size: 42px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      text-align: center;
      line-height: 92px;
      float: left;
      padding: 0 10px;
    }
    &-value-1 {
      width: 196px;
    }
    span {
      display: block;
      font-size: 42px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &-value-2 {
      width: 1192px;
      text-align: unset;
      img {
        width: 37px;
        height: 37px;
        padding: 29px 18px 0 51px;
        float: left;
      }
      span {
        color: #00edff;
        width: 90%;
      }
    }
  }

  &-prop:nth-child(2),
  &-prop:nth-child(3) {
    margin-left: 18px;
    width: 437px;
    height: 92px;
  }

  &-props:nth-child(3) {
    padding-top: 33px;
  }

  &-prop-1 {
    width: 1434px;
    height: 92px;
  }

  &-info {
    padding: 65px 40px 0 173px;
    height: 384px;
    &-left {
      width: 639px;
      height: 384px;
      float: left;
      &-box {
        width: 311px;
        height: 184px;
        background: rgba(16, 82, 210, 0.6);
        border-radius: 12px;
        opacity: 0.6;
        float: left;
        &-vlue {
          text-align: center;
          padding-top: 29px;
          span {
            font-size: 50px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #f7b500;
          }
          span:nth-child(2) {
            font-size: 38px;
            font-family: MicrosoftYaHei;
            color: #ffffffff;
          }
        }
        &-key {
          text-align: center;
          font-size: 38px;
          font-family: MicrosoftYaHei;
          color: #ffffff;
        }
      }
      &-box:nth-child(2),
      &-box:nth-child(4) {
        margin-left: 17px;
      }
      &-box:nth-child(3),
      &-box:nth-child(4) {
        margin-top: 16px;
      }
    }
    &-right {
      margin: 6px 0 0 40px;
      width: 668px;
      height: 378px;
      float: left;
    }
  }

  &-list {
    padding: 53px 0 0 125px;
    &-box {
      width: 303px;
      height: 83px;
      border-radius: 6px;
      border: 1px solid #58fff7;
      margin-left: 48px;
      line-height: 83px;
      float: left;
      img {
        width: 48px;
        height: 48px;
        padding: 19px 11px 0 25px;
        float: left;
      }
      span {
        font-size: 38px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
      }
    }
  }
}
</style>