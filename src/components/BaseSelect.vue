<script setup lang='ts'>
interface Props {
  modelValue: any
  options: {
    [text: string]: any
    label: string
    value: any
  }[]
  label?: string
  layout?: 'horizontal' | 'vertical'
  must?: boolean
  disabled?: boolean
  small?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
const emit = defineEmits(['update:modelValue', 'select'])

function onChange(event: any) {
  const v = event.target.value

  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('select', v)
}
</script>

<template>
  <div class="base-select" :class="[layout]">
    <label v-if="label">{{ label }} <span v-if="must">*</span></label>
    <div class="select-warp">
      <select :value="modelValue" :class="{ disabled, small }" :disabled="disabled" @change="onChange">
        <option style="display: none;" disabled value="" />
        <option v-for="o, i in options" :key="i" :selected="o.value === modelValue" :value="o.value">
          {{ o.label }}
        </option>
      </select>
      <div class="icon">
        <BaseIcon name="uni-arrow-down" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-select {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
}

.select-warp {
  width: 100%;
  position: relative;

  select {
    width: 100%;
    padding: var(--tg-spacing-11) var(--tg-spacing-10);
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-secondary-main);
    background-color: var(--tg-secondary-dark);
    box-shadow: var(--tg-box-shadow);
    color: var(--tg-text-white);
    position: relative;
    border-radius: var(--tg-radius-default);

    &:hover {
      border-color: var(--tg-text-grey);
    }
  }

  .small {
    padding: var(--tg-spacing-7) var(--tg-spacing-28) var(--tg-spacing-7) var(--tg-spacing-7);
  }

  .icon {
    font-size: var(--tg-font-size-default);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--tg-spacing-8);
    pointer-events: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.disabled {
  cursor: not-allowed;
}

.vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: var(--tg-spacing-7);
  }

}

.horizontal {
  display: flex;
  align-items: center;

  label {
    width: 100px;
    margin-right: var(--tg-spacing-10);
  }
}
</style>
