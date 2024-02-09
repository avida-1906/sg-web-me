<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  mode?: 'active' | 'black' | 'default' // 蓝色背景,黑色背景，灰色背景,
  color?: string // 自定义小圆点的颜色
  count?: number // 展示的数字，大于 max 时显示为 max+，为 0 时隐藏；number
  max?: number // 展示封顶的数字值
  showZero?: boolean // 当数值为 0 时，是否展示 Badge
  dot?: boolean // 不展示数字，只有一个小红点
  status?: 'success' | 'default' | 'fail' | '' // 设置 Badge 为状态点
  text?: string // 在设置了 status 的前提下有效，设置状态点的文本 string
  countStyle?: CSSProperties // 设置状态点的样式
  title?: string // 设置鼠标放在状态点上时显示的文字
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
  color: '',
  count: 0,
  max: 99,
  showZero: false,
  dot: false,
  status: '',
  text: '',
  countStyle: () => ({}),
  title: '',
})

const { bool: showContent, setBool } = useBoolean(true)

const presetColor = ['white', 'black', 'error', 'warn', 'green', 'blue']
const contentRef = ref()

const customStyle = computed(() => {
  if (props.color && !presetColor.includes(props.color)) {
    return {
      color: props.color,
      backgroundColor: props.color,
    }
  }
})

onMounted(() => {
  if (!props.status && !props.color)
    setBool(!!useSlots().default)
})
</script>

<template>
  <div class="m-badge" :class="[`${status ? 'badge-status' : ''}`, `${mode}-badge`]">
    <template v-if="status || color">
      <span
        class="u-status-dot"
        :class="[`status-${status || color}`]"
        :style="customStyle"
      />
      <span class="u-status-text">
        <slot>{{ text }}</slot>
      </span>
    </template>
    <template v-else>
      <span v-if="showContent" ref="contentRef">
        <slot />
      </span>
      <div
        v-show="showZero || count !== 0 || dot"
        class="m-badge-count"
        :class="{
          'small-num': count < 10,
          'only-number': !showContent,
          'only-dot': count === 0 && !showZero,
        }"
        :style="countStyle"
        :title="title || String(count)"
      >
        <span v-if="!dot" class="m-number">
          <span class="u-number">{{ count > max ? `${max}+` : count }}</span>
        </span>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
:root{
  --tg-badge-font-size: var(--tg-font-size-xs);
  --tg-badge-padding-x: var(--tg-spacing-6);
  --tg-badge-line-height: 1.5;
  --tg-badge-size:8px;
  --tg-badge-min-width: 1.8em;
  --tg-badge-height: auto;
  --tg-badge-border-radius: var(--tg-radius-lg);
}
</style>

<style lang="scss" scoped>
.active-badge{
  --tg-badge-background-color: var(--tg-text-lightblue);
  --tg-badge-color: #04172d;
}
.black-badge{
  --tg-badge-background-color: var(--tg-secondary-deepdark);
  --tg-badge-color: var(--tg-secondary-light);
}
.default-badge{
  --tg-badge-background-color: var(--tg-secondary-main);
  --tg-badge-color: var(--tg-text-grey-light);
}
.m-badge {
  line-height: 1;
  position: relative;
  // display: inline-block;
  width: fit-content;
  .u-status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: var(--tg-badge-size);
    height: var(--tg-badge-size);
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
    margin-inline-start: 4px;
    color: inherit;
    font-size: inherit;
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
    transform: translate(65%, -50%);
    transform-origin: 100% 0%;
    overflow: hidden;
    padding: 0 var(--tg-badge-padding-x);
    z-index: auto;
    min-width: var(--tg-badge-min-width);
    height: var(--tg-badge-height);
    color: var(--tg-badge-color);//默认字体颜色
    font-size: var(--tg-badge-font-size);
    line-height: var(--tg-badge-line-height);
    white-space: nowrap;
    text-align: center;
    background: var(--tg-badge-background-color);//默认背景颜色
    border-radius: var(--tg-badge-border-radius);
    // box-shadow: 0 0 0 1px var(--tg-badge-background-color);
    .m-number {
      position: relative;
      display: inline-block;
      font-weight: var(--tg-font-weight-semibold);
      .u-number {
        display: inline-block;
        margin: 0;
      }
    }
  }
  // .small-num {
  //   padding: 0;
  // }
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
    box-shadow: 0 0 0 1px var(--tg-text-lightblue);;
    padding: 0;
  }
}
.badge-status {
  line-height: inherit;
  vertical-align: baseline;
}
</style>
