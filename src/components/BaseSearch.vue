<script setup lang='ts'>
interface Props {
  placeHolder?: string
  shape?: 'square' | 'round'
  modelValue: string
  clearable?: boolean
  whiteStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeHolder: 'Search...',
  shape: 'round',
})
const emit = defineEmits(
  ['update:modelValue', 'input', 'search', 'focus', 'blur', 'clear', 'close'],
)

const { bool: isFocus, setTrue, setFalse } = useBoolean(false)
const inputRef = ref()

function onInput(event: any) {
  const v = event.target.value
  emit('update:modelValue', v)
  emit('input', v)
}
function onFocus() {
  setTrue()
  emit('focus')
}
function onBlur() {
  setFalse()
  emit('blur')
}
function onSearch() {
  emit('search')
}
function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  if (!props.modelValue)
    emit('close')
}
function manualFocus() {
  inputRef.value.focus()
}
function manualBlur() {
  inputRef.value.blur()
}

defineExpose({ manualFocus, manualBlur })
</script>

<template>
  <div class="base-search" :class="[shape, { whiteStyle, active: isFocus }]">
    <div v-show="$slots.left" class="left-box">
      <slot name="left" />
    </div>
    <div class="content-box">
      <BaseIcon name="uni-search" class="search-icon" />
      <input
        ref="inputRef"
        :value="modelValue"
        type="text"
        :placeholder="placeHolder"
        @input="onInput"
        @keypress.enter="onSearch"
        @blur="onBlur" @focus="onFocus"
      >

      <div v-if="clearable" class="clear-icon" :class="{ whiteStyle }" @click="onClear">
        <BaseIcon name="uni-close" />
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-search-icon-size: var(--tg-font-size-lg);
}
</style>

<style lang='scss' scoped>
.search-icon.app-svg-icon {
  color: var(--tg-text-grey);
}
.base-search {
  border-width: var(--tg-border-width-sm);
  border-style: solid;
  border-color: var(--tg-border-color-main);
  background-color: var(--tg-secondary-dark);
  box-shadow: var(--tg-box-shadow);
  padding: 0 var(--tg-spacing-16);
  display: flex;
  align-items: stretch;
  position: relative;
  color: var(--tg-text-white);
  transition: all ease .25s;
  cursor: text;

  &:hover:not(.whiteStyle) {
     border-color: var(--tg-border-color-deep-grey);
  }

  .left-box {
    border-right-width: var(--tg-border-width-sm);
    border-right-style: solid;
    border-right-color: var(--tg-secondary-main);
    padding-right: var(--tg-spacing-5);
    margin-right: var(--tg-spacing-10);
    display: flex;
    align-items: center;
  }

  // .search-icon {
  //   margin-right: var(--tg-spacing-5);
  // }

  .clear-icon {
    padding-top: 2px;
    font-size: var(--tg-font-size-default);
    position: absolute;
    right: var(--tg-spacing-17);
    cursor: pointer;
    &:hover{
      --tg-icon-color: var(--tg-text-white);
    }
    &.whiteStyle{
      --tg-icon-color: var(--tg-secondary-main);
      cursor:default;
    }
  }

  .content-box {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: var(--tg-font-size-lg);
    .search-icon {
      font-size: var(--tg-base-search-icon-size);
    }
  }

  input {
    width: 85%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: var(--tg-spacing-input-padding-vertical) ;
    font-size: var(--tg-font-size-default);
    line-height: 1.5;
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    cursor: text;

    &::placeholder {
      color: var(--tg-text-placeholder);
      font-weight: var(--tg-font-weight-semibold);
    }
  }

}

.active {
   border-color: var(--tg-border-color-deep-grey);
}

.whiteStyle {
  background-color: var(--tg-text-white);
  color: var(--tg-text-secondary-main);
  border-color: var(--tg-border-color-grey);
  .search-icon.app-svg-icon {
    color: var(--tg-text-grey-light);
  }

  input {
    color: var(--tg-secondary-main);

    &::placeholder {
      color: var(--tg-secondary-main);
      font-weight: var(--tg-font-weight-semibold);
      opacity: 0.8;
    }
  }
}

.square {
  border-radius: var(--tg-radius-default);
}

.round {
  border-radius: 100px;
}
</style>
