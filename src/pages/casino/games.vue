<script setup lang='ts'>
const isTheatre = ref(false) // 影院模式
function setIsTheatre(v: boolean) {
  isTheatre.value = v
}
</script>

<template>
  <div class="casino-games" :class="{ theatre: isTheatre }">
    <div class="home-container margin-auto">
      <AppIframe />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.casino-games {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3vw;

  .margin-auto {
    margin: 0 auto;
  }
}

.theatre {
  padding: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
