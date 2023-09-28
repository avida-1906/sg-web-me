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
  popper?: boolean
  theme?: boolean // 主题默认白色，true黑色
  banks?: boolean // 银行卡选择 展示的数据格式不同
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

// popper
const { bool, setTrue, setFalse } = useBoolean(false)
const popperLabel = computed(() => props.options.find(a => a.value === props.modelValue)?.label ?? '-')
const popperLabelBank = computed(() => props.options.find(a => a.value === props.modelValue)?.value ?? '')
function onClickPopperItem(v: any) {
  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('select', v)
}

//   自定义银行卡select
const parent = ref<HTMLElement | null>(null)
const { width } = useElementSize(parent)
</script>

<template>
  <template v-if="popper">
    <VDropdown :distance="6" :popper-class="theme ? 'theme-black' : ''" @hide="setFalse">
      <div ref="parent" class="popper-label" @click="setTrue">
        <span v-if="!banks">{{ popperLabel }}</span>
        <span v-else><BaseIcon v-if="popperLabelBank" name="fiat-bank" />  {{ popperLabelBank }}</span>
        <div class="icon" :class="{ up: bool }">
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
      <template #popper>
        <div class="scroll-y need-pad-y popper-wrap">
          <div
            v-for="item, i in options" :key="i" v-close-popper class="popper-option"
            @click="onClickPopperItem(item.value)"
          >
            <slot :data="{ item, parentWidth: width }">
              {{ item.label }}
            </slot>
          </div>
        </div>
      </template>
    </VDropdown>
  </template>

  <div v-else class="base-select" :class="[layout]">
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

<style lang="scss">
:root {
  --tg-base-select-style-padding-x: var(--tg-spacing-10);
  --tg-base-select-style-padding-y: var(--tg-spacing-11);
  --tg-base-select-style-padding-right: var(--tg-base-select-style-padding-x);
}
</style>

<style lang='scss' scoped>
.popper-label {
  padding: var(--tg-spacing-button-padding-vertical-md) var(--tg-spacing-button-padding-horizontal-md);
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  background-color: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-sm);
  transition: all ease .25s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;

  > span {
    margin-right: var(--tg-spacing-8);
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .icon {
    font-size: 10px;
    display: flex;
    align-items: center;
    transition: all ease .25s;
  }

  .up {
    transform: rotate(180deg);
  }

  &:hover {
    background-color: var(--tg-secondary-deepdark);
  }
}

.popper-wrap {
  display: flex;
  flex-direction: column;
  max-height: 20em;

  &::-webkit-scrollbar-thumb {
    background: var(--tg-secondary-light);
  }
}

.popper-option {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
  font-weight: var(--tg-font-weight-semibold);

  &:hover {
    background-color: var(--tg-text-lightgrey);
  }
}

// base-select
.base-select {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
}

.select-warp {
  width: 100%;
  position: relative;

  select {
    width: 100%;
    padding: var(--tg-base-select-style-padding-y) var(--tg-base-select-style-padding-x);
    padding-right: var(--tg-base-select-style-padding-right);
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
    margin-bottom: var(--tg-spacing-4);
    font-weight: var(--tg-font-weight-semibold);
  }

}

.horizontal {
  display: flex;
  align-items: center;

  label {
    width: 100px;
    margin-right: var(--tg-spacing-10);
    font-weight: var(--tg-font-weight-semibold);
  }
}
</style>

<style>
/* 全局修改，需要组件传select-bank class才可以 */
.theme-black{
  .v-popper__inner{
    background-color: var(--tg-secondary-main) !important;
  }
  .v-popper__arrow-container{
    .v-popper__arrow-inner, .v-popper__arrow-outer{
      border-color:var(--tg-secondary-main);
    }
  }
}
</style>
