<script setup lang='ts'>
interface CheckItem {
  value: string
  label: string
  isChecked?: boolean
  [text: string]: any
}
interface Props {
  list: Array<CheckItem>
  modelValue: string[]
  layout?: 'horizontal' | 'vertical'
  shape?: 'square' | 'circle'
  size?: 'small' | 'mid'
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  shape: 'square',
  size: 'small',
})
const emit = defineEmits(['update:modelValue', 'check'])
function checkValue(v: string) {
  return props.modelValue.findIndex(a => a === v) > -1
}
function onItemChecked(v: string, item: CheckItem) {
  item.isChecked = !item.isChecked
  const arr: string[] = cloneDeep(props.modelValue)
  if (checkValue(v))
    arr.splice(arr.findIndex(a => a === v), 1)

  else
    arr.push(v)

  emit('update:modelValue', arr)
  emit('check', arr)
}
</script>

<template>
  <div class="base-checkbox-group" :class="[layout]">
    <div
      v-for="item in list"
      :key="item.value"
      class="base-check-box"
      @click="onItemChecked(item.value, item)"
    >
      <span class="outer" :class="[shape, size, { active: checkValue(item.value) }]">
        <span v-show="checkValue(item.value)" class="icon" />
      </span>
      <slot :item="item">
        {{ item.label }}
      </slot>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-checkbox-group {
  display: flex;
}

.vertical {
  flex-direction: column;
}

.horizontal {
  flex-direction: row;
}

.base-check-box {
  display: flex;
  align-items: center;
  color: var(--tg-text-lightgrey);
  cursor: pointer;
  margin-bottom: var(--tg-spacing-8);

  &:last-of-type {
    margin-bottom: 0;
  }

  .outer {
    transition: all ease .25s;
    box-shadow: 0 1px 3px 0 #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.2)},
    0 1px 2px 0 #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.12)};
    margin-right: 8px;
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-border-color-main);
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=');
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &:hover {
       border-color: var(--tg-border-color-deep-grey);
    }
  }

  .small {
    width: 21px;
    height: 21px;
  }

  .mid {
    width: 24px;
    height: 24px;
  }

  .square {
    border-radius: var(--tg-radius-default);
  }

  .circle {
    border-radius: 100px;

    .icon {
      background-image: url('');
      border-radius: 50%;
      width: var(--tg-spacing-10);
      height: var(--tg-spacing-10);
      background-color: var(--tg-text-white);
    }
  }

  .active {
    border-color: var(--tg-border-color-main);
    background-color: var(--tg-secondary-main);
  }

  .active.focus {
     border-color: var(--tg-border-color-deep-grey);
    background-color: var(--tg-secondary-main);
  }

  .focus {
     border-color: var(--tg-border-color-deep-grey);
  }
}
</style>
