<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** 滚动速度 */
  speed: number
}>(), {
  speed: 80,
})

const baseNoticeRef = ref<HTMLElement | null>(null)
const scrollContentRef = ref<HTMLElement | null>(null)

const { width } = useElementSize(baseNoticeRef)

/** 运动时间 */
const scrollTime = computed(() => {
  const _width = width.value
  const _speed = props.speed
  return `${_width / _speed}s`
})

/** 暂停滚动 */
function stopScroll() {
  const content = scrollContentRef.value

  if (content)
    content.style.animationPlayState = 'paused'
}

/** 开始滚动 */
function startScroll() {
  const content = scrollContentRef.value

  if (content)
    content.style.animationPlayState = 'running'
}
</script>

<template>
  <section
    ref="baseNoticeRef"
    class="base-notice-bar"
    :style="
      {
        '--base-notice-scroll-width': `${width}px`,
        '--base-notice-scroll-time': scrollTime,
      }
    "
    @mouseenter="stopScroll"
    @mouseleave="startScroll"
  >
    <div ref="scrollContentRef" class="scroll-content">
      <slot />
    </div>
  </section>
</template>

<style>
:root {
  --base-notice-bar-color: #fff;
  --base-notice-bar-background-color: #f00;
  --base-notice-bar-height: 80px;
  --base-notice-bar-radius: var(--tg-radius-md);
}
</style>

<style lang="scss" scoped>
  @keyframes scroll {
    0% {
      transform: translateX(var(--base-notice-scroll-width));
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .base-notice-bar {
    color: var(--base-notice-bar-color);
    border: 1px solid var(--base-notice-bar-background-color);
    height: var(--base-notice-bar-height);
    border-radius: var(--base-notice-bar-radius);

    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: left;

    .scroll-content {
      display: inline-block;
      animation: scroll var(--base-notice-scroll-time) linear infinite;
    }
  }
</style>
