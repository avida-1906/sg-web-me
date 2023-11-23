<script setup lang='ts'>
defineProps<{
  loading?: boolean
  list: any[]
}>()
const { t } = useI18n()
</script>

<template>
  <div v-show="loading" class="wrapper">
    <BaseLoading />
  </div>
  <div v-if="!loading && (list.length === 0 || !list)" class="wrapper">
    <BaseEmpty icon="empty-2" :description="t('data_empty')" />
  </div>
</template>

<style lang='scss' scoped>
.wrapper{
  width: 100%;
  height: 20vh;
  max-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
