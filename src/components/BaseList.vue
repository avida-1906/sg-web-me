<script setup lang='ts'>
interface Props {
  finished: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['load'])

const target = ref(null)
const { stop, isSupported } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isSupported.value) {
      if (isIntersecting && !props.finished)
        emit('load')

      else if (isIntersecting && props.finished)
        stop()
    }
  },
)
const moreText = computed(() => props.finished ? '没有更多了' : '加载中...')
</script>

<template>
  <div class="base-list scroll-y">
    <slot />
    <div ref="target" class="more">
      {{ moreText }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-list {
  width: 100%;
  height: 100%;

  .more {
    padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
    font-size: var(--tg-font-size-xs);
    color: var(--tg-text-lightgrey);
    text-align: center;
    line-height: 1.5;
  }
}
</style>
