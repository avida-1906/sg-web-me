<script setup lang='ts'>
interface Props {
  /** 密码 */
  modelValue: string
  /** 宽度是否auto */
  widthAuto?: boolean
  /** 错误提示 */
  msg?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  widthAuto: false,
})
const emit = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLElement>()
/** 光标位置 */
const textLength = ref<number | null>(null)
/** 已输入字符 */
const entered = ref<number>(0)

const onFocus = function () {
  inputRef.value?.focus()
  textLength.value = props.modelValue.length
}
const onBlur = function () {
  textLength.value = null
}
const changeText = function (e: any) {
  const value = e.target.value
  textLength.value = value.length
  entered.value = value.length
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="base-input-password">
    <input ref="inputRef" :value="modelValue" type="text" maxlength="6" @input="changeText" @blur="onBlur">
    <ul class="password-wrap" :class="{ 'width-auto': widthAuto }" @click="onFocus">
      <li v-for="item in 6" :key="item" :class="{ active: textLength === (item - 1), show: entered > (item - 1) }">
        <i />
        <b />
      </li>
    </ul>
    <div v-show="msg" class="msg">
      <BaseIcon class="error-icon" name="uni-warning" />
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-input-password{
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  .password-wrap{
    display: flex;
    width: 100%;
    gap: var(--tg-spacing-10);
    &.width-auto{
      justify-content: space-between;
    }
    li{
      position: relative;
      width: 40px;
      height: 40px;
      background: var(--tg-secondary-dark);
      box-shadow: var(--tg-box-shadow);
      border-radius: 4px;
      border: 2px var(--tg-secondary-main) solid;
      cursor: pointer;
      i{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background-color: var(--tg-secondary-main);
        border-radius: 100%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        visibility: hidden;
      }
      &.show{
        i{
          visibility: visible;
        }
      }
      &.active{
        b{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 60%;
          background-color: var(--tg-secondary-light);
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          animation: 1s cursor-flicker infinite;
          -webkit-animation: 1s cursor-flicker infinite;
        }
      }
      @keyframes cursor-flicker {
        0% {
        opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
      }
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
}
</style>
