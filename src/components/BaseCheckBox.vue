<script setup lang='ts'>
const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

function onClick() {
  if (props.disabled)
    return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="base-check-box" :class="{ disabled }">
    <span class="square" :class="{ active: modelValue }" @click="onClick">
      <span v-show="modelValue" class="hook" />
    </span>

    <slot />
  </div>
</template>

<style lang='scss' scoped>
.base-check-box {
  display: flex;
  align-items: center;
  color: var(--tg-secondary-light);

  .square {
    transition: all ease .25s;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
    cursor: pointer;
    margin-right: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: var(--tg-secondary-main);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    height: 21px;
    border-radius: var(--tg-radius-default);

    .hook {
      width: 21px;
      height: 21px;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=');
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &:hover{
      border-color: var(--tg-text-grey);
    }
  }
  .active{
    border-color: var(--tg-text-grey);
  }
}
.disabled{
  cursor: not-allowed;
  opacity: 0.75;
  .square{
    cursor: not-allowed;
    &:hover{
      border-color: var(--tg-secondary-main);
    }
  }
  .active{
    border-color: var(--tg-text-grey);
    &:hover{
      border-color: var(--tg-text-grey);
    }
  }
}
</style>
