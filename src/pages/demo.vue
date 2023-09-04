<script setup lang="ts">
const activeTab = ref('Button')
const tabList = [
  'Button',
  'Switch',
  'Radio',
]

const { copy } = useClipboard()
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
}
const radioList = [
  { value: 'usd', label: 'usd' },
  { value: 'eur', label: 'EUR' },
  { value: 'jpy', label: 'JPY' },
  { value: 'inr', label: 'INR' },
  { value: 'brl', label: 'BRL' },
  { value: 'cad', label: 'CAD' },
  { value: 'cny', label: 'CNY' },
  { value: 'idr', label: 'IDR' },
  { value: 'krw', label: 'KRW' },
  { value: 'mxn', label: 'MXN' },
  { value: 'php', label: 'PHP' },
  { value: 'rub', label: 'RUB' },
]
const isSwitch = ref(false)
function onSwitch(v: boolean) {
  console.log('🚀 ~ file: demo.vue:10 ~ onSwitch ~ v:', v)
}
</script>

<template>
  <div class="list">
    <BaseButton v-for="l in tabList" :key="l" style="margin-bottom: 10px;" @click="activeTab = l">
      {{ l }}
    </BaseButton>
  </div>
  <!-- 按钮 -->
  <div v-if="activeTab === 'Button'">
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
  </div>
  <!-- Switch -->
  <div v-else-if="activeTab === 'Switch'">
    <BaseSwitch v-model="isSwitch" @change="onSwitch" @click="copyCode('switch')" />
  </div>
  <!-- Radio -->
  <div v-else-if="activeTab === 'Radio'">
    <BaseRadioGroup :data="radioList" />
  </div>
</template>

<style scoped></style>
