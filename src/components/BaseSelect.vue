<script setup lang='ts'>
interface Props {
  modelValue?: any
  options: {
    [text: string]: any
    label: string
    value: any
    disabled?: boolean
  }[]
  label?: string
  layout?: 'horizontal' | 'vertical'
  must?: boolean
  disabled?: boolean
  small?: boolean
  popper?: boolean
  /** 主题默认白色，true黑色 */
  theme?: boolean
  /** 边框  */
  border?: boolean
  msg?: string
  plainPopperLabel?: boolean
  popperClazz?: string
  distance?: number
  popperMaxHeight?: string
  showPlaceholder?: boolean
  placeholder?: string
  popperSearch?: boolean
  popperSearchPlaceholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  distance: 6,
  popperMaxHeight: '20em',
})
const emit = defineEmits(['update:modelValue', 'select', 'focus'])

const {
  bool: isPopperOpen,
  setTrue: setPopperOpen,
  setFalse: setPopperClose,
} = useBoolean(false)
const parent = ref<HTMLElement | null>(null)
const { width } = useElementSize(parent)
const { isMobile } = storeToRefs(useWindowStore())

const popperSearchValue = ref('')

const error = computed(() => !!props.msg)
const selectedOption = computed(() =>
  props.options.find(a => a.value === props.modelValue))
const popperLabel = computed(() =>
  props.options.find(a => a.value === props.modelValue)?.label ?? '')
const popperOptions = computed(() => {
  if (props.popperSearch)
    return props.options.filter(a => a.label.toLowerCase().includes(popperSearchValue.value.toLowerCase()))

  return props.options
})

function onChange(event: any) {
  const v = event.target.value

  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('select', v)
}
function onClickPopperItem(item: any, hide: () => void) {
  const v = item.value
  if (item.state === 2 || item.disabled)
    return
  else if (v === props.modelValue)
    return
  hide()
  emit('update:modelValue', v)
  emit('select', v)
}
function onPopperOpen() {
  setPopperOpen()
  emit('focus')
}
</script>

<template>
  <template v-if="popper">
    <VDropdown
      :disabled="disabled"
      :distance="distance"
      :popper-class="[theme ? 'theme-black' : '', popperClazz]"
      @hide="setPopperClose"
      @show="onPopperOpen"
    >
      <div
        ref="parent"
        class="popper-label"
        :class="{
          disabled,
          'show-border': border,
          'plain': plainPopperLabel,
          'border-red': !!msg,
          'pop-open': isPopperOpen,
        }"
      >
        <div class="content">
          <div class="content-label">
            <slot name="label" :data="selectedOption">
              <span class="inner-label">{{ popperLabel }}</span>
            </slot>
          </div>
          <div class="icon" :class="{ up: isPopperOpen }">
            <BaseIcon name="uni-arrow-down" />
          </div>
        </div>
      </div>
      <div v-show="msg" class="msg">
        <BaseIcon class="error-icon" name="uni-warning-color" />
        <span>{{ msg }}</span>
      </div>
      <template #popper="{ hide }">
        <div
          class="scroll-y need-pad-y popper-wrap" :style="{ maxHeight: popperMaxHeight }"
        >
          <div v-if="popperSearch" class="search-wrap">
            <BaseSearch
              v-model="popperSearchValue" class="top-search" white-style shape="square"
              :place-holder="popperSearchPlaceholder"
            />
          </div>

          <a
            v-for="item, i in popperOptions" :key="i"
            :class="{
              'popper-option-dark': theme,
              'popper-option': !theme,
              'active': item.value === modelValue,
              'disabled': item.disabled,
              'is-pop-mobile': isMobile,
              'is-pop-not-mobile': !isMobile,
              'popper-search': popperSearch,
            }"
            @click="onClickPopperItem(item, hide)"
          >
            <slot
              name="option"
              :data="{ item, parentWidth: width, active: item.value === modelValue }"
            >
              {{ item.label }}
            </slot>
            <!-- <div v-if="item.state === 2" class="bankcard-disable-text">
              <BaseIcon name="uni-disable" />
              暂不可用
            </div> -->
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
          :class="{
            disabled,
            small,
            error,
            'placeholder-select': showPlaceholder && !modelValue,
          }"
          :disabled="disabled"
          @change="onChange"
        >
          <option v-if="showPlaceholder" disabled value="">
            {{ placeholder }}
          </option>
          <option
            v-for="o, i in options"
            :key="i"
            :selected="o.value === modelValue"
            :value="o.value"
            :disabled="o.disabled"
          >
            {{ o.label }}
          </option>
        </select>
        <div v-if="!disabled" class="icon">
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
    </div>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning-color" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --tg-base-select-style-padding-x: var(--tg-spacing-10);
  --tg-base-select-style-padding-y: var(--tg-spacing-11);
  --tg-base-select-style-padding-right: var(--tg-base-select-style-padding-x);
  --tg-base-select-style-color: var(--tg-text-white);
  --tg-base-select-hover-bg-color: var(--tg-secondary-deepdark);
  --tg-base-select-popper-style-padding-x: var(--tg-spacing-button-padding-horizontal-sm);
  --tg-base-select-popper-style-padding-y: var(--tg-spacing-button-padding-vertical-sm);
  --tg-base-select-popper-label-color: var(--tg-text-white);
  --tg-base-select-popper-label-hover-color: var(--tg-text-white);
  --tg-base-select-style-font-size: var(--tg-font-size-default);
  --tg-base-select-popper-option-active-color: var(--tg-popper-hover-color-default);
  --tg-base-select-popper-active-color: var(--tg-text-blue);
  // --tg-base-select-popopen-bg-color: transparent;
  --tg-base-select-popper-bg-color:var(--tg-secondary-dark);
  --tg-base-select-popcontent-lineheight: 1.28572;
  --tg-base-select-popper-font-weight: var(--tg-font-weight-semibold);
  --tg-base-select-border: var(--tg-border-width-sm) solid var(--tg-border-color-main);
  --tg-base-select-box-shadow: var(--tg-box-shadow);
  --tg-base-select-icon-right: var(--tg-spacing-8);
  --tg-select-placeholder-color: var(--tg-text-placeholder);
  --tg-base-select-popper-search-width:136px;
}
</style>

<style lang='scss' scoped>
.popper-label {
  padding: var(--tg-base-select-popper-style-padding-y) var(--tg-base-select-popper-style-padding-x);
  font-weight: var(--tg-base-select-popper-font-weight);
  font-size: var(--tg-base-select-style-font-size);
  color: var(--tg-base-select-popper-label-color);
  background-color: var(--tg-base-select-popper-bg-color);
  border-radius: var(--tg-radius-default);
  transition: all ease .25s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  max-width: 100%;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: var(--tg-base-select-popcontent-lineheight);
    .content-label{
      overflow: hidden;

    }
    .inner-label {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden ;
    }
  }
  // &.pop-open {
  //   background-color: var(--tg-base-select-popopen-bg-color);
  // }
  &.plain {
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
  &.show-border{
    border: 2px solid  var(--tg-border-color-main);
    border-radius: var(--tg-radius-default);
  }
  &.border-red{
    border-color: var(--tg-text-error);
  }

  .icon {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: var(--tg-spacing-8);
    flex-shrink: 0;
  }

  .up {
    transform: rotate(180deg);
  }

  &:hover:not(.disabled) {
    color: var(--tg-base-select-popper-label-hover-color);
    background-color: var(--tg-base-select-hover-bg-color);
    --tg-icon-color: var(--tg-text-white);
  }

  &:active:not(.disabled) {
    .content-label {
      transform: scale(0.96);
    }
    color: var(--tg-base-select-popper-label-hover-color);
    background-color: var(--tg-base-select-hover-bg-color);
    --tg-icon-color: var(--tg-text-white);
  }
  &.disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.msg {
    margin-top: var(--tg-spacing-6);
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;
    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error-sub);
      margin-left: var(--tg-spacing-4);
    }
    .error-icon{
      --tg-icon-color: var(--tg-text-error-sub);
      font-size: var(--tg-font-size-xs);
      // margin-left: var(--tg-spacing-8);
    }
  }
.popper-wrap {
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar-thumb {
    background: var(--tg-secondary-light);
  }
}
.search-wrap{
  padding: 4px 12px;
  padding-bottom: 8px;
  width: var(--tg-base-select-popper-search-width);
  .top-search{
    --tg-base-search-icon-size: var(--tg-font-size-base);
    width: 100%;
    padding: 0 var(--tg-spacing-10);
    background-color: var(--tg-text-white);
    border-color: var(--tg-text-grey-light);
    --tg-icon-color: var(--tg-secondary-light);
    height: 39px;
  }
}

.popper-option {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
  font-size: var(--tg-font-size-default);
  color: var(--tg-popper-color-default);
  font-weight: var(--tg-font-weight-semibold);
  &:visited {
    color: var(--tg-popper-color-default);
  }
  &:hover {
    // background-color: var(--tg-text-lightgrey);
    // color: var(--tg-popper-hover-color-default);
  }
  &:active {
    color: var(--tg-popper-hover-color-default);
    transform: scale(0.96);
  }
  &.is-pop-not-mobile:hover {
    background-color: var(--tg-text-lightgrey);
    color: #000;
  }

  // &.active {
  //   --tg-icon-color: var(--tg-base-select-popper-option-active-color);
  //   color: var(--tg-base-select-popper-option-active-color);
  // }
  &.disabled:not(.active){
    opacity: 0.5;
    cursor: not-allowed;
    &:hover{
      color: var(--tg-popper-color-default);
    }
    &:active{
      transform: none;
    }
  }
  &.active{
    color: var(--tg-base-select-popper-active-color);
  }
  &.popper-search{
    display: flex;
    justify-content: center;
    padding: 8px 12px;
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
  font-size: var(--tg-base-select-style-font-size);

  .must {
    color: var(--tg-text-error);
  }

}

.select-warp {
  width: 100%;
  position: relative;

  select {
    width: 100%;
    padding: var(--tg-base-select-style-padding-y) var(--tg-base-select-style-padding-x);
    padding-right: var(--tg-base-select-style-padding-right);
    border: var(--tg-base-select-border);
    background-color: var(--tg-secondary-dark);
    box-shadow: var(--tg-base-select-box-shadow);
    color: var(--tg-base-select-style-color);
    position: relative;
    border-radius: var(--tg-radius-default);
    font-weight: var(--tg-base-select-popper-font-weight);

    &:hover {
      border-color: var(--tg-border-color-deep-grey);
    }

    &.small {
      padding: var(--tg-spacing-7) var(--tg-spacing-28) var(--tg-spacing-7) var(--tg-spacing-7);
    }

    &.error {
      border-color: var(--tg-text-error);
    }
    &.disabled {
      cursor: not-allowed;
    }
    &.placeholder-select{
      color: var(--tg-select-placeholder-color) !important;
      font-weight: var(--tg-font-weight-semibold);
    }
  }
  .icon {
    font-size: var(--tg-font-size-default);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--tg-base-select-icon-right);
    pointer-events: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
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
