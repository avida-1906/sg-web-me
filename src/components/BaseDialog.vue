<script lang="ts" setup name="base-dialog">
interface Props {
  show: boolean
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits('update:show')
</script>

<template>
  <section v-if="show" class="tg-base-dialog">
    <div class="overlay" />
    <div class="card">
      <div class="header">
        <h2>
          <BaseIcon name="uni-trend" />
          <span>Statistics</span>
        </h2>
        <div><BaseIcon name="uni-close" /></div>
      </div>
      <div class="content scrollY scroll-contain">
        <div class="modal-content">
          <slot>
            <div class="content">
              弹窗内容文本
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .tg-base-dialog {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--tg-z-index-10);
    padding: var(--tg-spacing-12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-default);
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(14,18,36,.7);
      touch-action: none;
    }
  }
</style>
