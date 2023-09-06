<script setup lang='ts'>
interface Props {
  modelValue?: string
  label: string
  layout?: 'horizontal' | 'vertical'
  type?: 'text' | 'password'
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
      margin-left: 4px;
    }
  }

  .vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    label {
      margin-bottom: 7px;
    }

  }
  .horizontal{
    display: flex;
    align-items: center;
    label {
      width: 100px;
      margin-right: 10px;
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
    position: relative;

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
    .eye{
      position: absolute;
      right: 6px;
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
