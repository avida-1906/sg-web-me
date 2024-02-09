<script setup lang='ts'>
const currentTab = ref('')
const tabList = [
  { value: '1', label: '1' },
  { value: '1', label: '1' },
  { value: '1', label: '1' },
]
function getWidth() {
  return `${(Math.ceil(Math.random() * 70) + 80).toFixed()}px`
}
</script>

<template>
  <div class="app-sports-search-result">
    <BaseTab v-model="currentTab" :list="tabList" :center="false">
      <template #tab>
        <BaseSkeleton
          width="50px" height="14px" animated="ani-opacity"
          style="--tg-skeleton-background-color:var(--tg-text-grey);"
        />
      </template>
    </BaseTab>

    <div class="result-list">
      <div v-for="i in 5" :key="i" class="result-item">
        <BaseSkeleton :width="getWidth()" height="18px" animated="ani-opacity" />
        <BaseSkeleton width="180px" height="18px" animated="ani-opacity" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-search-result {
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
}

.result-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tg-spacing-24);
  margin-top: 24px;
  padding-left: 30px;

  .result-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--tg-spacing-12);
  }
}
</style>
