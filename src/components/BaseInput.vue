<script setup lang='ts'>
interface Props {
  modelValue?: string | number
  label?: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password' | 'number' | 'email'
  placeholder?: string
  msg?: string
  must?: boolean
  textarea?: boolean
  mb0?: boolean
  disabled?: boolean
  max?: number | string
  msgAfterTouched?: boolean
  textCenter?: boolean
  name?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  type: 'text',
  textarea: false,
  name: '',
})

const emit = defineEmits(
  ['update:modelValue', 'input', 'blur', 'focus', 'downEnter', 'onRightButton', 'paste'],
)

const { bool: isFocus, setTrue, setFalse } = useBoolean(false)
const {
  bool: isTouched,
  setTrue: setTouchTrue,
  setFalse: setTouchFalse,
} = useBoolean(false)
const iTextarea = ref()
const iInput = ref()
const _type = ref(props.type)

const error = computed(() => {
  if (props.msgAfterTouched)
    return isTouched.value && !!props.msg
  return !!props.msg
})
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

function onBlur(event: any) {
  setFalse()
  !!event.target.value && setTouchTrue()
  emit('blur')
}

function getFocus() {
  iTextarea.value?.focus()
  iInput.value?.focus()
  onFocus()
}

function setBlur() {
  iTextarea.value?.blur()
  iInput.value?.blur()
  onBlur({ target: { value: 1 } })
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

function onCompositionStart() {
  console.log('composition start')
}

function onCompositionEnd() {
  console.log('composition end')
}

function catchIt() {
  getFocus()
}

defineExpose({ getFocus, setTouchTrue, setTouchFalse, iInput, isTouched, setBlur })
</script>

<template>
  <div class="base-input">
    <div :class="[layout]" @click="catchIt">
      <label v-if="label">{{ label }} <span v-if="must">*</span></label>
      <div class="input-wrap" :class="{ mb0 }">
        <div
          class="input-box"
          :class="{
            'active': isFocus,
            'error': error && !isFocus,
            'check-dom-error': error,
            'radio-r-o': $slots['right-button'],
            'readonly': readonly,
          }"
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
              :readonly="readonly"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
              @keydown.enter="keyDownEnter"
              @paste="onPaste"
              @compositionstart="onCompositionStart"
              @compositionend="onCompositionEnd"
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
            :readonly="readonly"
            :class="{
              'p-r-0': $slots['right-icon'],
              'p-l-0': $slots['left-icon'],
              'textCenter': textCenter,
              'readonly': readonly,
            }"
            :autocomplete="`new-${_type}`"
            title=""
            :name="name"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @paste="onPaste"
            @keydown.enter="keyDownEnter"
            @compositionstart="onCompositionStart"
            @compositionend="onCompositionEnd"
          >
          <BaseButton
            v-if="isPassword" type="text" size="none"
            class="eye" @click="toggleType"
          >
            <BaseIcon :name="`uni-eye-${_type === 'password' ? 'open' : 'close'}`" />
          </BaseButton>
          <div v-show="$slots['right-icon']" class="right-icon">
            <slot name="right-icon" />
          </div>
        </div>
        <div
          v-show="$slots['right-button']" class="right-button"
          @click.stop="onRightButton"
        >
          <slot name="right-button" />
        </div>
      </div>
    </div>
    <div v-show="error" class="msg">
      <!-- <BaseIcon class="error-icon" name="uni-warning" /> -->
      <BaseIcon class="error-icon" name="uni-warning-color" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style>
:root{
  --tg-base-input-style-background-color: transparent;
  --tg-base-input-style-pad-x: var(--tg-spacing-input-padding-horizontal);
  --tg-base-input-style-pad-y: var(--tg-spacing-input-padding-vertical);
  --tg-base-input-style-right-icon-pad-v: var(--tg-spacing-8);
  --tg-base-input-style-placeholder-color: var(--tg-text-white);
  --tg-base-input-style-placeholder-opacity: 0.3;
  --tg-base-input-style-pad-left: var(--tg-base-input-style-pad-x);
  --tg-base-input-textarea-pad: var(--tg-spacing-8);
  --tg-base-input-textarea-minheight: 2.8em;
  --tg-base-input-right-button-padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
  --tg-base-input-style-border: var(--tg-border-width-sm) solid var(--tg-border-color-main);
  --tg-base-input-style-font-weight: var(--tg-font-weight-semibold);
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
    // box-shadow: var(--tg-box-shadow);
    // border: 2px solid var(--tg-secondary-main);
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
    font-weight: var(--tg-font-weight-semibold);
    padding: var(--tg-base-input-textarea-pad);
    transition: none;
    &::placeholder {
      color: var(--tg-text-white);
      opacity: 0.3;
    }
  }

  pre {
    min-height: var(--tg-base-input-textarea-minheight);
    max-height: 6.4em;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
    overflow: auto;
    font-weight: var(--tg-font-weight-semibold);
    &::placeholder {
      color: var(--tg-text-white);
      opacity: 0.3;
    }
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
    padding-top: 8px;
    padding-bottom: 4px;
    --tg-icon-color: var(--tg-text-error-sub);
    .error-icon {
      font-size: var(--tg-font-size-xs);
    }

    span {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-error-sub);
      margin-left: var(--tg-spacing-8);
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
    // align-items: center;
    box-shadow: var(--tg-box-shadow);
    border-radius: var(--tg-radius-default);
    overflow: hidden;

    .right-button {
      padding: var(--tg-base-input-right-button-padding);
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
    border: var(--tg-base-input-style-border);
    position: relative;
    transition: all ease .25s;
    display: flex;
    align-items: center;

    &:hover:not(.error) {
      border-color: var(--tg-border-color-deep-grey);
    }

    &.readonly {
      background-color: var(--tg-secondary-main);
    }

    input {
      line-height: 1;
      width: 100%;
      background-color: var(--tg-base-input-style-background-color);
      color: var(--tg-text-white);
      border: none;
      outline: none;
      padding: var(--tg-base-input-style-pad-y) var(--tg-base-input-style-pad-x);
      padding-left: var(--tg-base-input-style-pad-left);
      font-weight: var(--tg-base-input-style-font-weight);
      &::placeholder {
        color: var(--tg-base-input-style-placeholder-color);
        opacity: var(--tg-base-input-style-placeholder-opacity);
      }

      &.textCenter {
        text-align: center;
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

    .textCenter {
      text-align: center;
    }

    .eye {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--tg-font-size-md);
      cursor: pointer;
      display: flex;
      padding: var(--tg-spacing-10) var(--tg-spacing-16);
    }
    .left-icon {
      padding: var(--tg-spacing-8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-icon {
      padding: var(--tg-base-input-style-right-icon-pad-v) var(--tg-spacing-8);
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
