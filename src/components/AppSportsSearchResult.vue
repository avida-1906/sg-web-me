<script setup lang='ts'>
const currentTab = ref('1')
const tabList = ref([
  { label: '足球', value: '1', num: '5' },
  { label: '篮球', value: '2', num: '5' },
  { label: '赛车', value: '3', num: '10' },
])
const breadList = ref([
  { value: '1', label: '电子足球' },
  { value: '2', label: 'Gt Sports League' },
  { value: '3', label: 'GT Nations League' },
])
</script>

<template>
  <div class="app-sports-search-result">
    <BaseTab v-model="currentTab" :list="tabList" :center="false">
      <template #tab="{ item }">
        <div class="tab">
          <label>{{ item.label }}</label>
          <span>{{ item.num }}</span>
        </div>
      </template>
    </BaseTab>

    <div class="result-list">
      <div v-for="i in 5" :key="i" class="result-item">
        <div class="game-name">
          <span>Sevilla FC (Mad)</span> -
          <span>FC Barcelona (Moic)</span>
        </div>
        <div class="status">
          已结束
        </div>
        <BaseBreadcrumbs :list="breadList" />
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

.tab {
  display: flex;
  line-height: 1.5;
  white-space: nowrap;

  label {
    margin-right: var(--tg-spacing-8);
  }

  span {
    padding: 0 var(--tg-spacing-7);
    border-radius: 50px;
    background-color: var(--tg-secondary-main);
  }
}

.result-list {

  .result-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--tg-spacing-8);
    padding: var(--tg-spacing-8) var(--tg-spacing-16);
    border-bottom: var(--tg-secondary-main) solid 2px;
    font-size: var(--tg-font-size-default);

    &:last-of-type {
      border: none;
    }

    .game-name {
      span {
        color: var(--tg-text-white);
        cursor: pointer;
      }
    }

    .status {
      background-color: var(--tg-secondary-deepdark);
      border-radius: var(--tg-radius-sm);
      padding: 0 var(--tg-spacing-4);
      line-height: 1.5;
      font-size: var(--tg-font-size-xs);
    }
  }
}
</style>
