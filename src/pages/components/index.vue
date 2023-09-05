<script lang="ts" setup>
import ids from 'virtual:svg-icons-names'

const { copy } = useClipboard()

function toast() {
  const div = document.createElement('div')
  div.innerHTML = 'Copied'
  div.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 5px;
    z-index: 999;
  `
  document.body.appendChild(div)

  setTimeout(() => {
    document.body.removeChild(div)
  }, 1000)
}

function copyIcon(id: string) {
  copy(`<BaseIcon name="${id}" />`)
  toast()
}

function showNotify() {
  showBaseNotify({
    title: '欢迎',
    message: '欢迎马尼拉湾的吴彦祖',
    onClose: () => {
      console.warn('notify closed')
    },
  })
}
function copyCode(type: string) {
  switch (type) {
    // 按钮
    case 'btn':
      copy('<BaseButton>Click</BaseButton>')
      break
    case 'btn1':
      copy('<BaseButton bg-style="primary">Click</BaseButton>')
      break
    case 'btn2':
      copy('<BaseButton bg-style="secondary">Click</BaseButton>')
      break
    case 'btn3':
      copy('<BaseButton type="text">Click</BaseButton>')
      break
    case 'btn4':
      copy('<BaseButton  type="line">Click</BaseButton>')
      break
    case 'btn5':
      copy('<BaseButton type="round-line-left">Click</BaseButton>')
      break
    case 'btn6':
      copy('<BaseButton type="round-line-right">Click</BaseButton>')
      break
    case 'btn7':
      copy('<BaseButton round>Click</BaseButton>')
      break
    case 'switch':
      copy('<BaseSwitch v-model="isSwitch" @change="onSwitch" />')
      break

    default:
      break
  }
  toast()
}
const isSwitch = ref(false)
function onSwitch(v: boolean) {
  console.log('🚀 ~ file: demo.vue:10 ~ onSwitch ~ v:', v)
}
const radioList = [
  { value: 'usd', label: 'usd' },
  { value: 'eur', label: 'EUR' },
  { value: 'jpy', label: 'JPY' },
  { value: 'inr', label: 'INR' },
  { value: 'brl', label: 'BRL' },
  { value: 'cad', label: 'CAD', disabled: true },
  { value: 'cny', label: 'CNY' },
  { value: 'idr', label: 'IDR' },
  { value: 'krw', label: 'KRW' },
  { value: 'mxn', label: 'MXN' },
  { value: 'php', label: 'PHP', disabled: true },
  { value: 'rub', label: 'RUB' },
]
const radioValue = ref('php')
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseIcon">
        <ul class="icon-wrap m0 p0">
          <li v-for="id in ids" :key="id" class="item" @click="() => copyIcon(id.slice(5))">
            <BaseIcon :name="id.slice(5)" />
          </li>
        </ul>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseButton">
        <div style="margin-bottom: 10px;">
          <BaseButton @click="copyCode('btn')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton bg-style="primary" @click="copyCode('btn1')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton bg-style="secondary" @click="copyCode('btn2')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="text" @click="copyCode('btn3')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="line" @click="copyCode('btn4')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="round-line-left" @click="copyCode('btn5')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="round-line-right" @click="copyCode('btn6')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton round @click="copyCode('btn7')">
            Click
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSwitch">
        <BaseSwitch v-model="isSwitch" @change="onSwitch" @click="copyCode('switch')" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseRadioGroup">
        <BaseRadioGroup v-model="radioValue" :data="radioList" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseLoading">
        <div class="box">
          <BaseLoading />
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseNotify">
        <div class="box">
          <BaseButton @click="showNotify">
            展示弹窗提示信息
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.box {
  padding: 20px;
  position: relative;
  text-align: center;
}

.icon-wrap {
  display: flex;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    width: 60px;
    font-size: 50px;
  }
}
</style>
