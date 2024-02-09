<script setup lang="ts">
interface Gradient {
  '0%'?: string
  '100%'?: string
  from?: string
  to?: string
  direction?: 'right' | 'left'
}
interface Props {
  width?: number | string // 进度条总宽度
  percent?: number // 当前进度百分比
  strokeColor?: string | Gradient // 进度条的色彩，传入 string 时为纯色，传入 object 时为渐变
  strokeWidth?: number // 进度条线的宽度，单位px
  showInfo?: boolean // 是否显示进度数值或状态图标
  type?: 'line' | 'circle' // 进度条类型
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  percent: 0,
  strokeColor: '#1f8bff',
  strokeWidth: 8,
  showInfo: true,
  type: 'line',
})

const totalWidth = computed(() => { // 进度条总宽度
  if (typeof props.width === 'number')
    return `${props.width}px`

  else
    return props.width
})
const perimeter = computed(() => { // 圆条周长
  return (100 - props.strokeWidth) * Math.PI
})
const path = computed(() => { // 圆条轨道路径指令
  const long = (100 - props.strokeWidth)
  return `M 50,50 m 0,-${(long / 2)}
   a ${(long / 2)},${(long / 2)} 0 1 1 0,${long}
   a ${(long / 2)},${(long / 2)} 0 1 1 0,-${long}`
})
const lineColor = computed(() => {
  if (typeof props.strokeColor === 'string') {
    return props.strokeColor
  }
  else {
    return `linear-gradient(to ${props.strokeColor.direction || 'right'},
    ${props.strokeColor['0%'] || props.strokeColor.from},
    ${props.strokeColor['100%'] || props.strokeColor.to})`
  }
})
</script>

<template>
  <div
    v-if="type === 'line'" class="m-progress-line"
    :style="`width: ${totalWidth}; height: ${strokeWidth < 24 ? 24 : strokeWidth}px;`"
  >
    <div class="m-progress-inner">
      <div
        class="u-progress-bg"
        :style="`background:${lineColor};
        width: ${percent >= 100 ? 100 : percent}%;
        height: ${strokeWidth}px;
        `"
      />
    </div>
    <template v-if="showInfo">
      <Transition mode="out-in">
        <span v-if="percent >= 100" class="m-success">
          <BaseIcon class="u-icon" name="password-hook-2" />
        </span>
        <p v-else class="u-progress-text">
          {{ percent >= 100 ? 100 : percent }}%
        </p>
      </Transition>
    </template>
  </div>
  <div
    v-else
    class="m-progress-circle"
    :style="`width: ${totalWidth}; height: ${totalWidth};`"
  >
    <svg class="u-progress-circle" viewBox="0 0 100 100">
      <path
        :d="path"
        stroke-linecap="round"
        class="u-progress-circle-trail"
        :stroke-width="strokeWidth"
        :style="`stroke-dasharray: ${perimeter}px, ${perimeter}px;`" fill-opacity="0"
      />
      <path
        :d="path"
        stroke-linecap="round"
        class="u-progress-circle-path"
        :class="{ success: percent >= 100 }"
        :stroke-width="strokeWidth" :stroke="lineColor"
        :style="`stroke-dasharray: ${(percent / 100) * perimeter}px,
         ${perimeter}px;`" :opacity="percent === 0 ? 0 : 1"
        fill-opacity="0"
      />
    </svg>
    <template v-if="showInfo">
      <Transition mode="out-in">
        <BaseIcon v-if="percent >= 100" class="u-icon" name="password-hook-2" />
        <p v-else class="u-progress-text">
          {{ percent >= 100 ? 100 : percent }}%
        </p>
      </Transition>
    </template>
  </div>
</template>

<style lang="scss">
:root{
 --tg-base-progress-inner-bg: var(--tg-secondary-light);
 --tg-base-progress-active-bg: var(--tg-sub-blue);
}
</style>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// @success: #52C41A;

.m-progress-line {
  display: flex;
  align-items: center;

  .m-progress-inner {
    width: 100%;
    background: var( --tg-base-progress-inner-bg);
    border-radius: 100px;

    .u-progress-bg {
      position: relative;
      background-color: var(--tg-base-progress-active-bg);
      border-radius: 100px;
      transition: all .3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
  }

  .m-success {
    width: 40px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1; // 默认 1.即空间不足时，项目将缩小

    .u-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      fill: var(--tg-primary-success);
    }
  }

  .u-progress-text {
    flex-shrink: 1; // 默认 1.即空间不足时，项目将缩小
    width: 40px;
    text-align: center;
    font-size: var(--tg-font-size-default);
    padding-left: 4px;
    color: var(--tg-text-white);
  }
}

.m-progress-circle {
  display: inline-block;
  position: relative;

  .u-progress-circle {
    .u-progress-circle-trail {
      stroke: var(--tg-secondary-light);
      stroke-dashoffset: 0;
      transition: stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s ease 0s, stroke-width .06s ease .3s, opacity .3s ease 0s;
    }

    .u-progress-circle-path {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s ease 0s, stroke-width .06s ease .3s, opacity .3s ease 0s;
    }

    .success {
      stroke: var(--tg-primary-success);
    }
  }

  .u-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 30px;
    height: 30px;
    fill:  var(--tg-primary-success);
  }

  .u-progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: var(--tg-spacing-button-padding-horizontal-lg);
    line-height: 1;
    text-align: center;
    color: var(--tg-text-white);
  }
}
</style>
