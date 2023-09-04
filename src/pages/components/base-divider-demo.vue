<script setup lang="ts">
const activeTab = ref('Divider')
const list = [
  { id: 1, key: 'left', name: '偏左' },
  { id: 2, key: 'center', name: '居中' },
  { id: 3, key: 'right', name: '偏右' },
  { id: 4, key: 'right', name: '偏移量20%', offset: '20%' },
]

const { copy } = useClipboard()
function copyCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy('<BaseDivider titlePlacement="left">偏左</BaseDivider>')
      break
    case 2:
      copy('<BaseDivider titlePlacement="center">居中</BaseDivider>')
      break
    case 3:
      copy('<BaseDivider titlePlacement="right">偏右</BaseDivider>')
      break
    case 4:
      copy('<BaseDivider titlePlacement="right" offset="20%">偏移量20%</BaseDivider>')
      break
    default:
      break
  }
}
</script>

<template>
  <div v-for="item in list" :key="item.id" class="center container">
    <BaseDivider :title-placement="item.key" :offset="item.offset">
      {{ item.name }}
    </BaseDivider>
    <BaseButton @click="copyCode(item.id)">
      copy
    </BaseButton>
  </div>
</template>

<style scoped></style>
