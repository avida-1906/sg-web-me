<script lang="ts" setup name="base-drag-dialog">
interface Props {
  show: boolean
  icon: string
  title: string
  initX?: number
  initY?: number
}

const props = withDefaults(defineProps<Props>(), {
  initX: 40,
  initY: 40,
})

const emit = defineEmits(['update:show', 'close'])

const dragRef = ref()
const titleRef = ref()

const { x, y } = useDraggable(dragRef, {
  initialValue: { x: props.initX, y: props.initY },
  draggingElement: titleRef,
})

const computedStyle = computed(() => {
  if (dragRef.value) {
    const { width, height } = dragRef.value.getBoundingClientRect()
    const maxX = window.innerWidth - width
    const maxY = window.innerHeight - height
    const left = x.value <= 0 ? 0 : (maxX <= x.value ? maxX : x.value)
    const top = y.value <= 0 ? 0 : (maxY <= y.value ? maxY : y.value)
    return {
      left: `${left}px`,
      top: `${top}px`,
    }
  }
  else {
    return {
      left: `${props.initX}px`,
      top: `${props.initY}px`,
    }
  }
})

function updateShow(value: boolean) {
  emit('update:show', value)
  if (!value) {
    setTimeout(() => {
      emit('close')
    }, 300)
  }
}

function close() {
  updateShow(false)
}
</script>

<template>
  <section v-if="show" ref="dragRef" class="tg-base-drag-dialog" :style="computedStyle">
    <div class="no-select header">
      <div ref="titleRef" class="title">
        <BaseIcon :name="icon" />
        <span>{{ title }}</span>
      </div>
      <div class="close" @click="close">
        <BaseIcon name="uni-close" />
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  inset: 0 0 0 0;
  background-color: grey;
}
.tg-base-drag-dialog {
  touch-action: none;
  position: fixed;
  display: flex;
  border-radius: var(--tg-radius-md);
  box-shadow: rgba(27, 23, 23, 0.2) 0px 4px 6px -1px, rgba(0, 0, 0, 0.12) 0px 2px 4px -1px;
  background: var(--tg-secondary-grey);
  color: #d5dceb;
  min-width: 280px;
  max-width: 90vw;
  flex-direction: column;
  z-index: var(--tg-z-index-top);
  .header {
    touch-action: none;
    display: flex;
    font-weight: var(--tg-font-weight-semibold);
    white-space: nowrap;
    flex-direction: row;
    justify-content: flex-end;
    background: var(--tg-primary-main);
    border-radius: var(--tg-radius-md) var(--tg-radius-md) 0 0;
    font-size: var(--tg-font-size-default);
    .title {
      touch-action: none;
      cursor: move;
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-button-padding-horizontal-xs);
      padding-left: var(--tg-spacing-button-padding-horizontal-sm);
      svg {
        font-size: var(--tg-font-size-base);
      }
    }
    .close {
      cursor: pointer;
      padding: var(--tg-spacing-button-padding-horizontal-xs);
    }
  }
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    border-bottom-left-radius: var(--tg-radius-default);
    border-bottom-right-radius: var(--tg-radius-default);
    overflow: hidden;
  }
}
</style>
