<script setup lang='ts'>
interface Props {
  modelValue?: string
  label?: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  msg?: string
  must?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  type: 'text',
})
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus'])
const { bool: isFocus, setTrue, setFalse } = useBoolean(false)
const isError = computed(() => !!props.msg)

const _type = ref(props.type)
const isPassword = computed(() => props.type === 'password')
function toggleType() {
  if (_type.value === 'text')
    return _type.value = 'password'
  _type.value = 'text'
}

function onInput(event: any) {
  const v = event.target.value
  emit('input', v)
  emit('update:modelValue', v)
}

function onFocus() {
  setTrue()
  emit('focus')
}
function onBlur() {
  setFalse()
  emit('blur')
}
</script>

<template>
  <div class="base-input">
    <div :class="[layout]">
      <label v-if="label">{{ label }} <span v-if="must">*</span></label>
      <div class="input-wrap">
        <div class="input-box" :class="{ 'active': isFocus, 'error': isError, 'radio-r-o': $slots['right-button'] }">
          <input
            :value="modelValue" min="0" :placeholder="placeholder" :type="_type" :class="{ 'p-r-0': $slots['right-icon'] }"
            @input="onInput" @focus="onFocus" @blur="onBlur"
          >
          <div v-if="isPassword" class="eye" @click="toggleType">
            <BaseIcon :name="`uni-eye-${_type === 'password' ? 'open' : 'close'}`" />
          </div>
          <div v-show="$slots['right-icon']" class="right-icon">
            <slot name="right-icon" />
          </div>
        </div>
        <div v-show="$slots['right-button']" class="right-button">
          <slot name="right-button" />
        </div>
      </div>
    </div>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-input {
  width: 100%;
  font-size: var(--tg-font-size-default);

  label {
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);
  }

  .msg {
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;

    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error);
      margin-left: var(--tg-spacing-4);
    }
  }

  .vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    label {
      margin-bottom: var(--tg-spacing-4);
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

  .input-wrap {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: var(--tg-box-shadow);
    border-radius: var(--tg-radius-default);
    overflow: hidden;
    margin-bottom: var(--tg-spacing-6);

    .right-button {
      padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
      cursor: pointer;
      display: flex;
      border-left: none;
      border-right: none;
      white-space: nowrap;
      line-height: 1;
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
      font-size: var(--tg-font-size-default);
      background-color: var(--tg-secondary-main);
      transition: all ease .25s;

      &:hover {
        background-color: var(--tg-text-grey);
      }
    }
  }

  .input-box {
    width: 100%;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-secondary-main);
    position: relative;
    transition: all ease .25s;
    display: flex;
    align-items: center;

    &:hover:not(.error) {
      border-color: var(--tg-text-grey);
    }

    input {
      line-height: 1;
      width: 100%;
      background-color: transparent;
      color: var(--tg-text-white);
      border: none;
      outline: none;
      padding: var(--tg-spacing-input-padding-vertical) var(--tg-spacing-input-padding-horizontal);

      &::placeholder {
        color: var(--tg-text-white);
        opacity: 0.3;
      }

      // &::-webkit-outer-spin-button,
      // &::-webkit-inner-spin-button {
      //   -webkit-appearance: none;
      //   appearance: none;
      //   margin: 0;
      // }
    }

    .p-r-0 {
      padding-right: 0;
    }

    .eye {
      position: absolute;
      right: var(--tg-spacing-6);
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--tg-font-size-md);
      cursor: pointer;
    }

    .right-icon {
      padding: var(--tg-spacing-8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .radio-r-o {
    border-radius: var(--tg-radius-default) 0 0 var(--tg-radius-default);
  }

  .active {
    border-color: var(--tg-text-grey);
  }

  .error {
    border-color: var(--tg-text-error);
  }
}
</style>
