<script setup lang='ts'>
interface Props {
  modelValue: string
  label: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password' | 'email'
  placeHolder?: string
  msg?: string
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'vertical',
  type: 'text',
  placeHolder: '请输入内容',
})
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus'])

const inputValue = ref(props.modelValue)
const isFocus = ref(false)
const isError = computed(() => !!props.msg)

function onInput() {
  emit('input', inputValue.value)
  emit('update:modelValue', inputValue.value)
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
  <div class="base-input" :class="[layout]">
    <label class="label">{{ label }}</label>
    <div class="input-wrapper">
      <div class="input-box" :class="{ active: isFocus, error: isError }">
        <input
          v-model="inputValue" :placeholder="placeHolder" :type="type" @input="onInput" @focus="onFocus"
          @blur="onBlur"
        >
      </div>
      <div v-show="msg" class="msg">
        <BaseIcon class="error-icon" name="uni-warning" />
        <span>{{ msg }}</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-input {
  width: 100%;
  font-size: var(--tg-font-size-default);

  .label {
    color: var(--tg-secondary-light);
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .msg {
      font-size: var(--tg-font-size-md);
      display: flex;
      align-items: center;

      span {
        font-size: var(--tg-font-size-xs);
        color: var(--tg-text-error);
        margin-left: 4px;
      }
    }

    .input-box {
      width: 100%;
      border-radius: var(--tg-radius-default);
      background: var(--tg-secondary-dark);
      box-shadow: var(--tg-box-shadow);
      border-width: 2px;
      border-style: solid;
      border-color: var(--tg-secondary-main);
      margin-bottom: 5.67px;

      &:hover {
        border-color: var(--tg-text-grey);
      }

      input {
        width: 100%;
        background-color: transparent;
        color: var(--tg-text-white);
        border: none;
        outline: none;
        padding: 8px 14px;

        &::placeholder {
          color: var(--tg-text-white);
          opacity: 0.3;
        }
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
}

.vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .label {
    margin-bottom: 7px;
  }
}
</style>
