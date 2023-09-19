<script setup lang='ts'>
const { isFullScreen } = storeToRefs(useWindowStore())
const router = useRouter()
</script>

<template>
  <div>
    isFullScreen?:{{ isFullScreen }}
    <BaseButton @click="router.push('/casino')">
      casino
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>

</style>
