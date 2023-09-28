<script setup lang='ts'>
interface Props {
  msg: string
}
const props = withDefaults(defineProps<Props>(), {
})
// const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-copy-line">
    <div class="input-box">
      <input type="text" readonly :value="props.msg">
    </div>
    <div class="button-wrap">
      <button>
        <BaseIcon name="uni-doc" />
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
    .app-copy-line{
      width: 100%;
      display: flex;
      flex-shrink: 0;
      box-shadow: var(  --tg-text-shadow);
      border-radius: var(--tg-radius-default);
      .input-box{
        width: 100%;
        border-radius: var(--tg-radius-default);
        background: var(--tg-secondary-main);
        border-width: var(--tg-border-width-sm);
        border-style: solid;
        border-color: var(--tg-secondary-main);
        position: relative;
        transition: all ease .25s;
        display: flex;
        align-items: center;
        &:hover:not(.error) {
          border-color: var(--tg-text-grey);
        }
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        input {
          line-height: 1;
          width: 100%;
          background-color: transparent;
          color: var(--tg-text-white);
          border: none;
          outline: none;
          padding: var(--tg-spacing-input-padding-vertical) var(--tg-spacing-input-padding-horizontal);
          font-size: var(--tg-font-size-default);
        }
      }
      .button-wrap{
        background: var(--tg-secondary-main);
        padding: var(--tg-spacing-2) var(--tg-spacing-16);
        border-radius: var(--tg-radius-default);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: flex;
        align-items: center;
        &:hover{
          background-color: var(--tg-text-grey);
        }
      }
    }
</style>
