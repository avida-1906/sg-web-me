<script setup lang='ts'>
const { query } = useRoute()
const name = ref(query.name?.toString() ?? '')
const pn = ref(query.pn?.toString() ?? '')
const pid = ref(query.pid?.toString() ?? '')

const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
</script>

<template>
  <div class="casino-games">
    <div class="game-wrapper" :class="{ max: appContentWidth > 930 }">
      <LimboIndex />
    </div>
  </div>
  <section class="page-content">
    <AppDesc :name="name" :plat-name="pn" :pid="pid" />
    <div class="margin-auto home-container mt-32">
      <div v-if="!isMobile" class="layout-spacing">
        <AppBetData mode="casino" />
      </div>
    </div>
  </section>
</template>

<style lang='scss' scoped>
.casino-games {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3vw;

  .game-wrapper {
    width: 100%;
    max-width: 1200px;
    margin-top: 3vw;

    &.max {
      margin-top: var(--tg-spacing-40);
    }
  }
}

.mt-32 {
  margin-top: var(--tg-spacing-32);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
