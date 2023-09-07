<script setup lang='ts'>
interface Props {
  modelValue?: string
  label: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  msg?: string
  must?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  type: 'text',
  placeholder: '请输入内容',
})
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus'])

const isFocus = ref(false)
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
  isFocus.value = true
  emit('focus')
}
function onBlur() {
  isFocus.value = false
  emit('blur')
}
</script>

<template>
  <div class="base-input">
    <div :class="[layout]">
      <label>{{ label }} <span v-if="must">*</span></label>
      <div class="input-box" :class="{ active: isFocus, error: isError }">
        <input
          :value="modelValue" :placeholder="placeholder" :type="_type" @input="onInput" @focus="onFocus"
          @blur="onBlur"
        >
        <div v-if="isPassword" class="eye" @click="toggleType">
          <BaseIcon :name="`uni-eye-${_type === 'password' ? 'open' : 'close'}`" />
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
    color: var(--tg-secondary-light);
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

  .input-box {
    width: 100%;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    box-shadow: var(--tg-box-shadow);
    border-width: var(--tg-border-width-sm);
    border-style: solid;
    border-color: var(--tg-secondary-main);
    margin-bottom: var(--tg-spacing-6);
    position: relative;
    transition: all ease .25s;

    &:hover {
      border-color: var(--tg-text-grey);
    }

    input {
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

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
      }
    }

    .eye {
      position: absolute;
      right: var(--tg-spacing-6);
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--tg-font-size-md);
      cursor: pointer;
    }
  }

  .active {
    border-color: var(--tg-text-grey);
  }

  .error {
    border-color: var(--tg-text-error);

    &:hover {
      border-color: var(--tg-text-error);
    }
  }
}
</style>
