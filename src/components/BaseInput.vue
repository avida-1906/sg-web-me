<script setup lang='ts'>
interface Props {
  modelValue?: string | number
  label?: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  msg?: string
  must?: boolean
  textarea?: boolean
  mb0?: boolean
  disabled?: boolean
  max?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  type: 'text',
  textarea: false,
})

const emit = defineEmits(
  ['update:modelValue', 'input', 'blur', 'focus', 'downEnter', 'onRightButton', 'paste'],
)

const { bool: isFocus, setTrue, setFalse } = useBoolean(false)

const iTextarea = ref()
const iInput = ref()
const _type = ref(props.type)

const error = computed(() => !!props.msg)
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

function getFocus() {
  iTextarea.value?.focus()
  iInput.value?.focus()
  onFocus()
}

function keyDownEnter(event: KeyboardEvent) {
  emit('downEnter', event)
}

function onRightButton() {
  emit('onRightButton')
}

function onPaste() {
  emit('paste')
}

defineExpose({ getFocus })
</script>

<template>
  <div class="base-input">
    <div :class="[layout]">
      <label v-if="label">{{ label }} <span v-if="must">*</span></label>
      <div class="input-wrap" :class="{ mb0 }">
        <div
          class="input-box"
          :class="{ 'active': isFocus, error, 'radio-r-o': $slots['right-button'] }"
        >
          <div v-show="$slots['left-icon']" class="left-icon">
            <slot name="left-icon" />
          </div>
          <div v-if="textarea" class="textarea-container">
            <pre aria-hidden="true">{{ modelValue }}</pre>
            <textarea
              ref="iTextarea"
              :value="modelValue"
              min="0"
              :maxlength="max"
              class="scroll-y"
              :placeholder="placeholder"
              :class="{ 'p-r-0': $slots['right-icon'] }"
              autocomplete="new-password"
              :disabled="disabled"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
              @keydown.enter="keyDownEnter"
              @paste="onPaste"
            />
          </div>
          <input
            v-else
            ref="iInput"
            :value="modelValue"
            min="0"
            :maxlength="max"
            :placeholder="placeholder"
            :type="_type"
            :disabled="disabled"
            :class="{ 'p-r-0': $slots['right-icon'], 'p-l-0': $slots['left-icon'] }"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @paste="onPaste"
            @keydown.enter="keyDownEnter"
          >
          <div v-if="isPassword" class="eye" @click="toggleType">
            <BaseIcon :name="`uni-eye-${_type === 'password' ? 'open' : 'close'}`" />
          </div>
          <div v-show="$slots['right-icon']" class="right-icon">
            <slot name="right-icon" />
          </div>
        </div>
        <div v-show="$slots['right-button']" class="right-button" @click="onRightButton">
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

<style>
:root{
  --tg-base-input-style-background-color: transparent;
}
</style>

<style lang='scss' scoped>
.textarea-container {
  position: relative;
  width: 100%;
  font-size: var(--tg-font-size-default);

  pre,
  textarea {
    line-height: 1.5;
    overflow: hidden;
    white-space: break-spaces;
    width: 100%;
    color: var(--tg-text-white);
    background: var(--tg-secondary-dark);
    box-shadow: var(--tg-box-shadow);
    // border: var(--input-border-width) solid var(--input-border);
    // border-radius: var(--input-border-radius);
    letter-spacing: 0;
    font-weight: var(--tg-font-weight-semibold);
    // transition: all var(--input-transition);
    outline: 0;
    margin: 0;
    cursor: text;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: var(--tg-font-size-default);
    padding: var(--tg-spacing-8);
    transition: none;
  }

  pre {
    min-height: 2.8em;
    max-height: 6.4em;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
    overflow: auto;
  }
}

.base-input {
  width: 100%;
  font-size: var(--tg-font-size-default);

  label {
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);

    span {
      color: var(--tg-text-error);
    }
  }

  .msg {
    font-size: var(--tg-font-size-md);
    display: flex;
    align-items: center;
    margin-top: var(--tg-spacing-6);

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
  .mb0{
    margin-bottom: 0;
  }

  .input-box {
    width: 100%;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-border-color-main);
    position: relative;
    transition: all ease .25s;
    display: flex;
    align-items: center;

    &:hover:not(.error) {
      border-color: var(--tg-border-color-deep-grey);
    }

    input {
      line-height: 1;
      width: 100%;
      background-color: var(--tg-base-input-style-background-color);
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
    .p-l-0 {
      padding-left: 0;
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
    .left-icon {
      padding: var(--tg-spacing-8);
      display: flex;
      align-items: center;
      justify-content: center;
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
    border-color: var(--tg-border-color-deep-grey);
  }

  .error {
    border-color: var(--tg-text-error);
  }
}
</style>
