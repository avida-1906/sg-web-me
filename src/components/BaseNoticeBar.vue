<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** 滚动速度 */
  speed?: number
}>(), {
  speed: 20,
})

const baseNoticeRef = ref<HTMLElement | null>(null)
const scrollContentRef = ref<HTMLElement | null>(null)
const prefixRef = ref<HTMLElement | null>(null)

const { width: baseNoticeWidth } = useElementSize(baseNoticeRef)
const { width: prefixWidth } = useElementSize(prefixRef)

/** 运动时间 */
const scrollTime = computed(() => {
  return `${props.speed}s`
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
        '--base-notice-scroll-width': `${baseNoticeWidth}px`,
        '--base-notice-scroll-time': scrollTime,
        '--base-notice-prefix-width': `${prefixWidth}px`,
      }
    "
    @mouseenter="stopScroll"
    @mouseleave="startScroll"
  >
    <div ref="scrollContentRef" class="scroll-content">
      <slot />
    </div>
    <div ref="prefixRef" class="prefix">
      <slot name="prefix" />
    </div>
  </section>
</template>

<style>
:root {
  --base-notice-bar-color: var(--tg-secondary-light);
  --base-notice-bar-background-color: var(--tg-secondary-dark);
  --base-notice-bar-height: 40px;
  --base-notice-bar-radius: 40px;
  --base-notice-bar-font-size: var(--tg-font-size-default);
}
</style>

<style lang="scss" scoped>
  @keyframes scroll {
    0% {
      transform: translateX(var(--base-notice-scroll-width));
    }

    100% {
      transform: translateX(calc(-100% + var(--base-notice-prefix-width)));
    }
  }

  .base-notice-bar {
    color: var(--base-notice-bar-color);
    background-color: var(--base-notice-bar-background-color);
    height: var(--base-notice-bar-height);
    border-radius: var(--base-notice-bar-radius);
    font-size: var(--base-notice-bar-font-size);

    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: left;

    position: relative;

      .prefix {
        background-color: var(--base-notice-bar-background-color);

        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    .scroll-content {
      display: inline-block;
      animation: scroll var(--base-notice-scroll-time) linear infinite;

    }
  }
</style>
