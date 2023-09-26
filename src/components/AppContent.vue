<script lang="ts" setup>
defineProps<{ isGamePage?: boolean }>()
</script>

<template>
  <section class="page-content" :class="{ 'p-0': isGamePage }">
    <div class="home-container margin-auto">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.margin-auto {
  margin: 0 auto;
}
.p-0{
  padding: 0;
}
</style>
