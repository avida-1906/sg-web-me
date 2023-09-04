<script setup lang="ts">
const activeTab = ref('Button')
const tabList = [
  'Button',
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

    default:
      break
  }
}
</script>

<template>
  <div class="list">
    <BaseButton v-for="l in tabList" :key="l" @click="activeTab = l">
      {{ l }}
    </BaseButton>
  </div>
  <div v-if="activeTab === 'Button'">
    <BaseButton @click="copyCode('btn')">
      Click
    </BaseButton>
    <BaseButton bg-style="primary" @click="copyCode('btn1')">
      Click
    </BaseButton>
    <BaseButton bg-style="secondary" @click="copyCode('btn2')">
      Click
    </BaseButton>
    <BaseButton type="text" @click="copyCode('btn3')">
      Click
    </BaseButton>
    <BaseButton type="line" @click="copyCode('btn4')">
      Click
    </BaseButton>
    <BaseButton type="round-line-left" @click="copyCode('btn5')">
      Click
    </BaseButton>
    <BaseButton type="round-line-right" @click="copyCode('btn6')">
      Click
    </BaseButton>
    <BaseButton round @click="copyCode('btn7')">
      Click
    </BaseButton>
  </div>
</template>

<style scoped></style>
