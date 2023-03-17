<template>
  <div class="yx-human-media-incident-more">
    <div @click="handleBack" class="yx-human-media-incident-more-back">
      <img :src="sImage" alt="" srcset="" /> 返回
    </div>
    <div class="yx-human-media-incident-more-props">
      <div class="yx-human-media-incident-more-props-inner">
        <div v-for="(item, i) in props" class="yx-human-media-incident-more-prop" :key="i">
          <div class="yx-human-media-incident-more-prop-key">{{ item.label }}</div>
          <div class="yx-human-media-incident-more-prop-value">
            {{ (item.renderText ? item.renderText(incident) : incident[item.prop]) ?? '--' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Incident } from '@/api/modules'
import sImage from '@/assets/images/zselect.jpg'
const route = useRoute()

const incident = reactive({})
const asyncGet = async () => {
  const data = await Incident.Get(route.query)

  data.USER_NEW = '区管控中心'

  Object.keys(data).forEach((key) => {
    incident[key] = data[key]
  })
}

const props = [
  { label: '操作员', prop: 'USER_NEW' },
  { label: '事件编号', prop: 'ANJIANBIANHAO' },
  { label: '上报单位', prop: 'ORGNAME' },
  { label: '上报时间', prop: 'ENTERTIME' },
  { label: '环节时限', prop: 'LINKLIMIT' },
  { label: '事件时限', prop: 'FLOWLIMIT' },
  { label: '业务类别', prop: 'SERVICE' },
  { label: '事件类别', prop: 'SUBSERVICE' },
  { label: '当前状态', prop: 'LINKNAME' },
  { label: '当前处理单位', prop: 'BANLIDANWEIMINGCHENG' },
  { label: '区域', prop: '', renderText: (data) => `${data['REG1']}/${data['REG2']}` },
  { label: '网格名称', prop: 'GRIDNO' },
  { label: '建筑物编码', prop: '' },
  { label: '房屋编码', prop: 'FANGWUBIANMA' },
  { label: '事件地址', prop: 'PLACE' },
  { label: '办理系统', prop: 'BANLIDANWEIMINGCHENG' },
  { label: '事件等级', prop: 'ABCTYPE' },
  { label: '楼栋/房屋信息', prop: 'LOUDONGXINXI' },
  { label: '进入当前环节时间', prop: 'ENTERTIME' },
  { label: '倒计时', prop: '' },
  { label: '事件名称', prop: 'BUSITYPE3' },
  { label: '事件描述', prop: 'DISC' },
  { label: '事件来源', prop: 'SRCSYSNAME' },
  { label: '转办系统名称', prop: 'OUTSYSNAME' },
  { label: '上一环节意见', prop: 'LASTINFO' },
  { label: '整治情况', prop: 'ZHENGZHIQINGKUANG' },
  { label: '建筑物地址', prop: '' },
  { label: '通知业主时间', prop: '' },
  { label: '隐患等级', prop: 'YINHUANDENGJI' },
  { label: '入库时间', prop: 'CREATETIME' },
  { label: '来源系统编号', prop: 'SRCSYSID' },
  { label: '时间在外系统编号', prop: '' },
  { label: '转办时间', prop: 'OUTTIME' }
]

const emit = defineEmits(['back'])
const handleBack = () => {
  emit('back')
}

onMounted(() => {
  asyncGet()
})
</script>

<style lang="scss" scoped>
@include yx(human-media-incident-more) {
  @extend .fill-size;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-left: 183px;

  &-back {
    height: 56px;
    font-size: 42px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    line-height: 56px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    margin-top: 64px;
    margin-bottom: 23px;

    .iconfont {
      width: 14px;
      height: 30px;
      margin-left: 35px;
    }
    img {
        margin-right: 20px;
    }
  }

  &-props {
    width: 2130px;
    height: 920px;
    overflow: auto;

    &-inner {
      display: flex;
      flex-wrap: wrap;
      padding-top: 2px;
    }
  }

  &-prop {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 42px;
    color: #fff;
    height: 102px;
    line-height: 102px;

    &-key {
      width: 400px;
      height: 102px;
      background: rgba(41, 120, 253, 0.5);
      border: 1px solid #00bff7;
      text-align: center;
    }

    &-value {
      width: 617px;
      height: 102px;
      border: 1px solid #00bff7;
      text-align: center;
      @include ellipsis();
    }

    &:first-child > &-key,
    &:first-child > &-value,
    &:nth-of-type(2) > &-key,
    &:nth-of-type(2) > &-value {
      border-top: 1px solid #00bff7;
    }

    &:nth-of-type(even) > &-key {
      border-left: 0px;
    }
  }
}
</style>