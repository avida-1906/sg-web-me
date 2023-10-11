<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()
</script>

<template>
  <div class="tg-sports-favourites" :class="{ 'on-page': onPage }">
    favourites
    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-favourites {
  &.on-page{
    margin-top: 0;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
