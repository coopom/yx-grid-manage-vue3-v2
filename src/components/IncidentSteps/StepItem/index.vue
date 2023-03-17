<template>
  <div class="yx-step-item">
    <div class="yx-step-item-inner">
      <div
        class="yx-step-item-hd"
        :style="`--before-color: ${StatusMap[props.data.LINK].color};`"
      ></div>
      <div class="yx-step-item-bd">
        <div class="yx-step-item-date">{{ props.data.ADQEXT_INSERT_TIME }}</div>
        <div class="yx-step-item-desc">
          {{ props.data.ORGNAME }}，操作员{{ props.data.RECUSER }}，{{ props.data.LINK }}
        </div>
        <div :style="`color: ${StatusMap[props.data.LINK].color};`" class="yx-step-item-status">
          {{ props.data.LINK }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const StatusMap = {
  结案: {
    color: '#00F7B4'
  },
  办理: {
    color: '#F78C00'
  },
  上报: {
    color: '#00BFF7'
  },
  分中心分拨: {
    color: '#F78C00'
  },
  接收: {
    color: '#F78C00'
  }
}
</script>

<style lang="scss" scoped>
@include yx(step-item) {
  position: relative;
  /* border: 1px solid red; */
  /* padding: 0.4cqh 0; */
  display: flex;

  &-inner {
    display: flex;
  }

  &-hd {
    width: 100px;
    height: 100%;
    /* border: 1px solid green; */
    position: relative;
    &::before {
      content: ' '; //attr(data-color);
      display: block;
      position: absolute;
      left: 50%;
      top: 10px;
      width: 32px;
      height: 32px;
      // border: 0.2cqh solid attr(data-color color);
      border-width: 4px;
      border-style: solid;
      border-color: var(--before-color);
      border-radius: 50%;
      background: rgba(0, 247, 180, 0.3);
      transform: translateX(-50%);
    }
    &::after {
      /* width: 0.2cqh; */
      content: ' ';
      display: block;
      position: absolute;
      left: 50%;
      top: 48px;
      height: calc(100% - 40px);
      border: 1px solid #00bff7;
      transform: translateX(-50%);
    }
  }

  &-date {
    font-size: 42px;
    color: rgba(255, 255, 255, 0.7);
    height: 51px;
    line-height: 51px;
  }

  &-desc {
    font-size: 42px;
    font-family: MicrosoftYaHeiSemibold;
    color: #ffffff;
    width: 822px;
    margin-bottom: 27px;
  }
  &-status {
    position: absolute;
    right: 20px;
    top: 0;
    height: 56px;
    line-height: 56px;
    font-size: 42px;
    font-family: AppleSystemUIFont;
    color: #fff;
  }
}
</style>