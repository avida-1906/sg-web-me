<script lang="ts" setup>
const props = defineProps<{ except?: boolean }>()
const route = useRoute()
// 是否游戏页面
const isCasinoGames = computed(() => {
  return route.name?.toString().includes('casino-games') && !props.except
})
</script>

<template>
  <section
    class="page-content"
    :class="{ 'p-0': isCasinoGames }"
  >
    <div class="margin-auto" :class="[{ 'home-container': !isCasinoGames }]">
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
