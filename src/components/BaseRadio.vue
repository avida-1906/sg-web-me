<script setup lang='ts'>
interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['click'])

const onSelect = inject<(v: string) => void>('onSelect', () => {})
const sValue = inject<ComputedRef<string>>('sValue')
const shape = inject('shape')
const disabled = inject('disabled')

const isChecked = computed(() => props.value === sValue?.value)

function onCheck() {
  if (disabled)
    return
  emit('click', props.value)
  onSelect(props.value)
}
</script>

<template>
  <div class="base-radio" :class="{ disabled, active: isChecked }" @click="onCheck">
    <span class="icon" :class="[shape]">
      <span v-if="shape === 'circle'" class="dot" />
      <span v-else class="hook" />
    </span>
    <slot />
  </div>
</template>

<style lang='scss' scoped>
.base-radio {
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  cursor: pointer;
  display: flex;
  align-items: center;

  .circle {
    border-radius: 50%;

    .dot {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: var(--tg-text-white);
      display: none;
    }
  }

  .square {
    border-radius: var(--tg-radius-default);

    .hook {
      width: 21px;
      height: 21px;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=');
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center center;
      display: none;
    }
  }

  .icon {
    width: 21px;
    height: 21px;
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
  }

  &:hover {
    .icon {
      border-color: var(--tg-text-grey);
    }
  }
}

.active {
  .icon {
    border-color: var(--tg-text-grey);
    .dot {
      display: inline-block;
    }

    .hook {
      display: block;
    }
  }

}

.disabled {
  cursor: not-allowed;
  opacity: 0.75;

  &:hover {
    .icon {
      border-color: var(--tg-secondary-main);
    }
  }
}
.disabled.active{
  &:hover {
    .icon {
      border-color: var(--tg-text-grey);
    }
  }
}
</style>
