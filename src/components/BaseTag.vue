<script setup lang='ts'>
defineProps<{ text: string }>()
defineEmits(['click', 'close'])
</script>

<template>
  <div class="base-tag">
    <div class="warp">
      <span @click="$emit('click', text)">{{ text }}</span>
      <div class="icon" @click="$emit('close', text)">
        <BaseIcon name="uni-close" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-tag {
  font-size: var(--tg-font-size-xs);
  color: var(--tg-text-lightgrey);
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tg-secondary-main);
  border-radius: 100px;
  min-width: var(--tg-spacing-22);
  display: inline-block;
  padding: 0 var(--tg-spacing-6);

  .warp {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-8);
    padding: var(--tg-spacing-4);
    cursor: pointer;
    line-height: 1.5;

    span {
      font-weight: var(--tg-font-weight-semibold);

      &:hover {
        color: var(--tg-text-white);
      }

      &:active {
        transform: scale(0.96);
      }
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: var(--tg-font-size-xs);

      &:hover {
        --tg-icon-color: var(--tg-text-white);
      }

      &:active {
        transform: scale(0.96);
      }
    }
  }
}
</style>
