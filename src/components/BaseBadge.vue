<script setup lang="ts">
import type { CSSProperties } from 'vue'
enum Status {
  success = 'success',
  default = 'default',
  fail = 'fail',
}
interface Props {
  color?: string // 自定义小圆点的颜色
  count?: number // 展示的数字，大于 max 时显示为 max+，为 0 时隐藏；number
  max?: number // 展示封顶的数字值
  showZero?: boolean // 当数值为 0 时，是否展示 Badge
  dot?: boolean // 不展示数字，只有一个小红点
  status?: Status // 设置 Badge 为状态点
  text?: string // 在设置了 status 的前提下有效，设置状态点的文本 string
  countStyle?: CSSProperties // 设置状态点的样式
  title?: string // 设置鼠标放在状态点上时显示的文字
}
const props = withDefaults(defineProps<Props>(), {
  color: '',
  count: 0,
  max: 99,
  showZero: false,
  dot: false,
  status: undefined,
  text: '',
  countStyle: () => ({}),
  title: ''
})
const presetColor = ['white', 'black', 'error', 'warn', 'green', 'blue']
const customStyle = computed(() => {
  if (props.color && !presetColor.includes(props.color)) {
    return {
      color: props.color,
      backgroundColor: props.color
    } 
  }
})
const contentRef = ref()
const showContent = ref(true)
// const countRef = ref()
// const showCount = ref(1)
onMounted(() => {
  if (!props.status && !props.color) {
    showContent.value = !!useSlots().default
    // showContent.value = contentRef.value.offsetHeight
    // showCount.value = countRef.value.offsetHeight
    // console.log(useSlots().default, useSlots().count)
    // console.log(showContent.value,showCount.value)
  }
})
</script>
<template>
  <div class="m-badge" :class="{'badge-status': status}">
    <template v-if="status||color">
      <span class="u-status-dot" :class="[`status-${status||color}`]" :style="customStyle"></span>
      <span class="u-status-text">
        <slot>{{ text }}</slot>
      </span>
    </template>
    <template v-else>
      <span ref="contentRef" v-if="showContent">
        <slot></slot>
      </span>
      <!-- <span
        ref="countRef"
        v-if="showCount"
        class="m-count"
        :class="{'only-number': !showContent}">
        <slot name="count"></slot>
      </span> -->
      <div
        v-show="showZero || count !== 0 || dot"
        class="m-badge-count"
        :class="{'small-num': count < 10, 'only-number': !showContent, 'only-dot': count === 0 && !showZero}"
        :style="countStyle"
        :title="title || String(count)">
        <span v-if="!dot" class="m-number">
          <span class="u-number">{{ count > max ? max + '+' : count }}</span>
        </span>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.m-badge {
  color: var(--tg-text-dark);
  font-size: var(--tg-radius-2xl);
  line-height: 1;
  position: relative;
  display: inline-block;
  width: fit-content;
  .u-status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .status-success {
    color: var(--tg-primary-success);
    background-color: var(--tg-primary-success);
  }
  .status-fail {
    color: var(--tg-primary-fail);
    background-color:var(--tg-primary-fail);
  }
  .status-default {
    color: var(--tg-text-lightblue);
    background-color: var(--tg-text-lightblue);
  }
  .status-white {
    color: var(--tg-text-white);
    background-color: var(--tg-text-white);
  }
  .status-black {
    color: var(--tg-text-black);
    background-color: var(--tg-text-black);
  }
  .status-error {
    color: var(--tg-text-error);
    background-color: var(--tg-text-error);
  }
  .status-warn {
    color: var(--tg-text-warn);
    background-color: var(--tg-text-warn);
  }
  .status-green {
    color: var( --tg-text-green);
    background-color: var( --tg-text-green);
  }
  .status-blue {
    color: var(--tg-text-blue);
    background-color: var(--tg-text-blue);
  }
  .u-status-text {
    margin-inline-start: 8px;
    color: var(--tg-text-dark);
    font-size: 14px;
  }
  .m-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;
  }
  .m-badge-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0%;
    // .m-count();
    overflow: hidden;
    padding: 0 8px;
    z-index: auto;
    min-width: 20px;
    height: 20px;
    color: var(--tg-text-dark);//默认字体颜色
    font-weight: normal;
    font-size: var(--tg-font-size-xs);
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: var(--tg-text-lightblue);//默认背景颜色
    border-radius: var(--tg-radius-lg);
    box-shadow: 0 0 0 1px #ffffff;
    // transition: background .2s;
    .m-number {
      position: relative;
      display: inline-block;
      height: 20px;
      .u-number {
        display: inline-block;
        height: 20px;
        margin: 0;
      }
    }
  }
  .small-num {
    padding: 0;
  }
  .only-number {
    position: relative;
    top: auto;
    display: block;
    transform-origin: 50% 50%;
    transform: none;
  }
  .only-dot {
    z-index: auto;
    width: 6px;
    min-width: 6px;
    height: 6px;
    background: var(--tg-text-lightblue);//默认背景颜色
    border-radius: 100%;
    box-shadow: 0 0 0 1px #ffffff;
    padding: 0;
    // transition: background .3s;
  }
}
.badge-status {
  line-height: inherit;
  vertical-align: baseline;
}
</style>