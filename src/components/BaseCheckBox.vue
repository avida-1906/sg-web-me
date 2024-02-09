<script setup lang='ts'>
interface Props {
  modelValue: boolean
  disabled?: boolean
  shape?: 'square' | 'circle'
  msg?: string
  error?: boolean
}
const props = withDefaults(defineProps<Props>(), { shape: 'square' })
const emit = defineEmits(['update:modelValue', 'check'])

const { bool, setTrue, setFalse } = useBoolean(false)
const outerRef = ref()
onClickOutside(outerRef, () => {
  setFalse()
})

function onClick() {
  if (props.disabled)
    return

  setTrue()
  emit('update:modelValue', !props.modelValue)
  emit('check', !props.modelValue)
}
</script>

<template>
  <div class="base-check-box">
    <div class="check-box-wrap" :class="{ disabled }" @click="onClick">
      <span
        ref="outerRef"
        class="outer"
        :class="[shape, { active: modelValue, focus: bool, error }]"
      >
        <span v-show="modelValue" class="icon" />
      </span>

      <span class="label">
        <slot />
      </span>
    </div>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning-color" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-checkbox-error-color: var(--tg-text-error);
  --tg-base-checkbox-error-border-color: var(--tg-text-error);
  --tg-base-checkbox-error-icon-size: var(--tg-font-size-md);
  --tg-base-checkbox-msg-margin-top: var(--tg-spacing-6);
  --tg-base-checkbox-error-icon-color: var(--tg-text-error-sub);
  --tg-base-checkbox-wrap-width: auto;
  --tg-base-checkbox-label-color:var(--tg-secondary-light);
}
</style>

<style lang='scss' scoped>
.error-icon {
  --tg-icon-color: var(--tg-base-checkbox-error-icon-color);
}
.base-check-box {
  display: flex;
  flex-direction: column;

  .msg {
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 4px;
    .error-icon {
      font-size: var(--tg-base-checkbox-error-icon-size);
    }
    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-base-checkbox-error-color);
      margin-left: var(--tg-spacing-8);
    }
  }
}

.check-box-wrap {
  display: flex;
  align-items: center;
  color: var(--tg-secondary-light);
  cursor: pointer;
  font-weight: var(--tg-font-weight-semibold);
  width: var(--tg-base-checkbox-wrap-width);
  .label{
    color: var(--tg-base-checkbox-label-color);
  }

  &:hover {
    .outer {
      border-color: var(--tg-border-color-deep-grey);
    }
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
    width: 21px;
    height: 21px;

    .icon {
      width: 21px;
      height: 21px;
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=');
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &:hover {
       border-color: var(--tg-border-color-deep-grey);
    }
  }

  .square {
    border-radius: var(--tg-radius-default);
  }

  .circle {
    border-radius: 100px;

    .icon {
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

  .error {
    border-color: var(--tg-base-checkbox-error-border-color);
  }
}

.disabled {
  cursor: not-allowed;
  &:hover {
    .outer {
      border-color: var(--tg-border-color-main);
    }
    .active {
      border-color: var(--tg-border-color-deep-grey);
    }
  }
  .outer {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      border-color: var(--tg-border-color-main);
    }
  }

  .active {
     border-color: var(--tg-border-color-deep-grey);

    &:hover {
       border-color: var(--tg-border-color-deep-grey);
    }
  }
}
</style>
