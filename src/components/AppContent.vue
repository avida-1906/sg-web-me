<script lang="ts" setup>
const route = useRoute()
// 是否游戏页面
const isCasinoGames = computed(() => route.name === 'casino-games')
</script>

<template>
  <slot v-if="isCasinoGames" />
  <section v-else class="page-content">
    <div class="home-container margin-auto">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.margin-auto {
  margin: 0 auto;
}
</style>
