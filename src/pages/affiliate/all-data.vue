<script lang="ts" setup>
const currentPage = ref(1)
</script>

<template>
  <div>
    <BasePagination v-model:current-page="currentPage" :total="1008" />
  </div>
</template>

<style lang="scss" scoped>

</style>
