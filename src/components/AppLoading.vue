<script setup lang='ts'>
defineProps<{ fullScreen?: boolean }>()
</script>

<template>
  <div :class="{ 'loading-content-height': fullScreen }">
    <BaseAspectRatio ratio="2/1">
      <div class="content">
        <BaseLoading />
      </div>
    </BaseAspectRatio>
  </div>
</template>

<style lang='scss' scoped>
.content{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
