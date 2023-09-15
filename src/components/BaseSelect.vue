<script setup lang='ts'>
interface Props {
  modelValue: any
  options: {
    [text: string]: any
    label: string
    value: any
  }[]
  label: string
  layout?: 'horizontal' | 'vertical'
  must?: boolean
  disabled?: boolean
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
    <label>{{ label }} <span v-if="must">*</span></label>
    <div class="select-warp">
      <select :value="modelValue" :class="{ disabled }" :disabled="disabled" @change="onChange">
        <option style="display: none;" disabled value="" />
        <option v-for="o, i in options" :key="i" :selected="o.value === modelValue" :value="o.value">
          {{ o.label }}
        </option>
      </select>
      <div class="icon">
        <BaseIcon name="uni-arrow-down-big" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-select {
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
}

.select-warp {
  width: 100%;
  position: relative;

  select {
    width: 100%;
    padding: 11px 10px;
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

  .icon {
    font-size: var(--tg-font-size-md);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    pointer-events: none;
    cursor: pointer;
  }
}
.disabled{
  cursor: not-allowed;
}

.vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 7px;
  }

}

.horizontal {
  display: flex;
  align-items: center;

  label {
    width: 100px;
    margin-right: 10px;
  }
}
</style>
