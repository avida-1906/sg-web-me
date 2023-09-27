<script lang="ts" setup>
const showContent = function () {}
const campaignsList = [
  {
    title: '活动名称01',
  },
  {
    title: '活动名称02',
  },
]
</script>

<template>
  <div class="tg-affiliate-campaigns">
    <div class="stats-grid">
      <div class="stat">
        <span>活动点击量</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>推荐用户</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>总存款次数</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>独立存款</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>可用金额</span>
        <span>
          0.00000000
          <BaseIcon name="coin-btc" />
        </span>
      </div>
    </div>
    <div v-for="item, index in campaignsList" :key="index" class="campaigns-list-column">
      <BaseCollapse @click-head="showContent()">
        <template #title>
          <div class="title">
            {{ item.title }}
          </div>
        </template>
        <template #top-right>
          <div class="top-right">
            <span>佣金： 0.00000000</span>
            <BaseIcon name="coin-btc" />
          </div>
        </template>
      </BaseCollapse>
    </div>
    <div class="page-stack-wrap mt-24">
      <AppStack />
    </div>
    <BaseButton>
      创建新活动
    </BaseButton>
  </div>
</template>

<style lang="scss">
.tg-affiliate-campaigns {
  margin-bottom: 38px;
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
    grid-gap: var(--spacing-2);
    .stat {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
      line-height: 1.5;
      span:nth-child(2) {
        color: var(--tg-text-lightgrey);
      }
    }
  }
  .campaigns-list-column {
    margin-top: var(--tg-spacing-12);
    .title {
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
    }
    .top-right {
      span {
        color: var(--tg-text-lightgrey);
        font-size: var(--tg-font-size-default);
        font-weight: var(--tg-font-weight-normal);
      }
      .app-svg-icon {
        vertical-align: middle;
        margin: 0 var(--tg-spacing-6);
      }
    }
  }
}
button {
  margin-top: 28px;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
