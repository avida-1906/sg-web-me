<script setup lang="ts">
const activeTab = ref('Button')
const tabList = [
  'Button',
]
</script>

<template>
  <div class="list">
    <BaseButton v-for="l in tabList" :key="l" @click="activeTab = l">
      {{ l }}
    </BaseButton>
  </div>
  <div v-if="activeTab === 'Button'">
    <BaseButton @click="myCopy('hello world')">
      Click
    </BaseButton>
    <BaseButton bg-style="primary">
      Click
    </BaseButton>
    <BaseButton bg-style="secondary">
      Click
    </BaseButton>
    <BaseButton type="text">
      Click
    </BaseButton>
    <BaseButton type="line">
      Click
    </BaseButton>
    <BaseButton type="round-line-left">
      Click
    </BaseButton>
    <BaseButton type="round-line-right">
      Click
    </BaseButton>
  </div>
</template>

<style scoped>

</style>
