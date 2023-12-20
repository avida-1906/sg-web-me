<script setup lang='ts'>
interface Props {
  modelValue?: string
  placeholder?: string
  maxlength?: string
  cols?: string
  rows?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: '200',
  cols: '30',
  rows: '8',
})
const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

const _placeholder = ref(props.placeholder)

function handleInput(e: any) {
  const v = e.target.value
  emit('input', v)
  emit('update:modelValue', v)
}
function handleFocus() {
  _placeholder.value = ''
  emit('focus')
}
function handleBlur() {
  _placeholder.value = props.placeholder
  emit('blur')
}
</script>

<template>
  <textarea
    :value="modelValue" :maxlength="maxlength" :cols="cols" :rows="rows"
    :placeholder="_placeholder" @blur="handleBlur" @focus="handleFocus"
    @input="handleInput"
  />
</template>

<style lang='scss' scoped>
textarea {
  width: 100%;
  background: var(--tg-primary-main);
  padding: var(--tg-spacing-12);
  border-radius: var(--tg-radius-default);
  font-size: var(--tg-font-size-xs);
  color: var(--tg-text-lightgrey);
  border: var(--tg-border-width-sm) solid var(--tg-border-color-main);
  transition: var(--tg-transition);
  outline: none;

  &:hover {
    border-color: var(--tg-border-color-deep-grey);
  }
}
</style>
