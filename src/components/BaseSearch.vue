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
const emit = defineEmits(['update:modelValue', 'input', 'search'])
const inputValue = ref(props.modelValue)

function onInput() {
  emit('update:modelValue', inputValue.value)
  emit('input', inputValue.value)
}
function onSearch() {
  emit('search')
}
function onClear() {
  inputValue.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="base-search" :class="[shape, { whiteStyle }]">
    <div v-show="$slots.left" class="left-box">
      <slot name="left" />
    </div>
    <div class="content-box">
      <BaseIcon name="uni-search" class="search-icon" />
      <input v-model="inputValue" type="text" :placeholder="placeHolder" @input="onInput" @keypress.enter="onSearch">

      <div v-if="clearable && inputValue" class="clear-icon" @click="onClear">
        <BaseIcon v-if="whiteStyle" name="uni-close" />
        <BaseIcon v-else name="uni-close-white" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-search {
  border-width: 2px;
  border-style: solid;
  border-color: var(--tg-secondary-main);
  background-color: var(--tg-secondary-dark);
  box-shadow: var(--tg-box-shadow);
  padding: 0 10px;
  display: flex;
  align-items: stretch;
  position: relative;

  .left-box {
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: var(--tg-secondary-main);
    padding-right: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .search-icon {
    margin-right: 5px;
  }

  .clear-icon {
    font-size: var(--tg-font-size-default);
    position: absolute;
    right: 18px;
    cursor: pointer;
  }

  .content-box {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: var(--tg-font-size-lg);
  }

  input {
    width: 85%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 7px;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);

    &::placeholder {
      color: var(--tg-text-white);
      opacity: 0.3;
    }
  }
}

.whiteStyle {
  background-color: var(--tg-text-white);
  color: var(--tg-secondary-main);

  input {

    &::placeholder {
      color: var(--tg-text-dark);
      opacity: 0.3;
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
