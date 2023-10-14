<script setup lang='ts'>
interface Props {
  modelValue?: any
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
  msg?: string
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
})
const emit = defineEmits(['update:modelValue', 'select'])

const {
  bool: isPopperOpen,
  setTrue: setPopperOpen,
  setFalse: setPopperClose,
} = useBoolean(false)
const parent = ref<HTMLElement | null>(null)
const { width } = useElementSize(parent)

const error = computed(() => !!props.msg)
const selectedOption = computed(() =>
  props.options.find(a => a.value === props.modelValue))
const popperLabel = computed(() =>
  props.options.find(a => a.value === props.modelValue)?.label ?? '-')
const popperLabelBank = computed(() =>
  props.options.find(a => a.value === props.modelValue)?.value ?? '')

function onChange(event: any) {
  const v = event.target.value

  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('select', v)
}
function onClickPopperItem(v: any) {
  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('select', v)
}
function onClickPopper() {
  if (props.disabled)
    return
  setPopperOpen()
}
</script>

<template>
  <template v-if="popper">
    <VDropdown
      :disabled="disabled"
      :distance="6"
      :popper-class="theme ? 'theme-black' : ''"
      @hide="setPopperClose"
    >
      <div
        ref="parent"
        class="popper-label"
        :class="{ disabled, 'show-border': banks }"
        @click="onClickPopper"
      >
        <slot name="label" :data="selectedOption">
          <span v-if="!banks">{{ popperLabel }}</span>
          <span v-else>
            <BaseIcon v-if="popperLabelBank" name="fiat-bank" /> {{ popperLabelBank }}
          </span>
        </slot>

        <div class="icon" :class="{ up: isPopperOpen }">
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
      <template #popper="{ hide }">
        <div class="scroll-y need-pad-y popper-wrap">
          <a
            v-for="item, i in options" :key="i"
            :class="{
              'popper-option-dark': theme,
              'popper-option': !theme,
              'active': item.value === modelValue,
            }"
            @click="hide();onClickPopperItem(item.value)"
          >
            <slot
              name="option"
              :data="{ item, parentWidth: width, active: item.value === modelValue }"
            >
              {{ item.label }}
            </slot>
          </a>
        </div>
      </template>
    </VDropdown>
  </template>

  <div v-else class="base-select">
    <div :class="[layout]">
      <label v-if="label">{{ label }} <span v-if="must" class="must">*</span></label>
      <div class="select-warp">
        <select
          :value="modelValue"
          :class="{ disabled, small, error }"
          :disabled="disabled" @change="onChange"
        >
          <option style="display: none;" disabled value="" />
          <option
            v-for="o, i in options"
            :key="i"
            :selected="o.value === modelValue"
            :value="o.value"
          >
            {{ o.label }}
          </option>
        </select>
        <div class="icon">
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
    </div>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --tg-base-select-style-padding-x: var(--tg-spacing-10);
  --tg-base-select-style-padding-y: var(--tg-spacing-11);
  --tg-base-select-style-padding-right: var(--tg-base-select-style-padding-x);
  --tg-base-select-hover-bg-color: var(--tg-secondary-deepdark);
  --tg-base-select-popper-style-padding-x: var(--tg-spacing-button-padding-horizontal-md);
  --tg-base-select-popper-style-padding-y: var(--tg-spacing-button-padding-vertical-md);
  --tg-base-select-popper-label-color: var(--tg-text-white);
  --tg-base-select-popper-label-hover-color: var(--tg-text-white);
}
</style>

<style lang='scss' scoped>
.popper-label {
  padding: var(--tg-base-select-popper-style-padding-y) var(--tg-base-select-popper-style-padding-x);
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-base-select-popper-label-color);
  background-color: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-sm);
  transition: all ease .25s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  &.show-border{
    border: 2px solid  var(--tg-border-color-main);
    border-radius: var(--tg-radius-default);
  }
  >span {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .icon {
    font-size: 10px;
    display: flex;
    align-items: center;
    transition: all ease .25s;
    margin-left: var(--tg-spacing-8);
  }

  .up {
    transform: rotate(180deg);
  }

  &:hover {
    color: var(--tg-base-select-popper-label-hover-color);
    background-color: var(--tg-base-select-hover-bg-color);
    --tg-icon-color: var(--tg-text-white)
  }

  &:active {
    transform: scale(0.96);
  }
  &.disabled{
    opacity: 0.5;
    cursor: not-allowed;
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
  --tg-icon-color: var(--tg-secondary-main);

  &:hover {
    background-color: var(--tg-text-lightgrey);
  }

  &.active {
    color: var(--tg-text-blue);
    --tg-icon-color: var(--tg-text-blue);
  }
}

.popper-option-dark {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-s) var(--tg-spacing-button-padding-horizontal-s);
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
  font-weight: var(--tg-font-weight-semibold);

  &:hover, &.active {
    background-color: var(--tg-sub-blue);
  }
}

// base-select
.base-select {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);

  .must {
    color: var(--tg-text-error);
  }

  .msg {
    margin-top: var(--tg-spacing-6);
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;

    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error);
      margin-left: var(--tg-spacing-4);
    }
  }
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
    border-color: var(--tg-border-color-main);
    background-color: var(--tg-secondary-dark);
    box-shadow: var(--tg-box-shadow);
    color: var(--tg-text-white);
    position: relative;
    border-radius: var(--tg-radius-default);

    &:hover {
      border-color: var(--tg-border-color-deep-grey);
    }

    &.small {
      padding: var(--tg-spacing-7) var(--tg-spacing-28) var(--tg-spacing-7) var(--tg-spacing-7);
    }

    &.error {
      border-color: var(--tg-text-error);
    }
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

<style lang="scss">
/* 全局修改，需要组件传select-bank class才可以 */
.theme-black {
  .v-popper__inner {
    background-color: var(--tg-secondary-main) !important;
  }

  .v-popper__arrow-container {

    .v-popper__arrow-inner,
    .v-popper__arrow-outer {
      border-color: var(--tg-secondary-main);
    }
  }
}
</style>
