<script lang="ts" setup>
const date = ref([])
const currentPage = ref(1)
</script>

<template>
  <div>
    <BaseDatePicker v-model="date" />
    <BasePagination v-model:current-page="currentPage" :total="1008" />
  </div>
</template>

<style lang="scss" scoped>

</style>
