<script lang="ts" setup>
const campaignsList = [
  {
    title: '活动名称01',
  },
  {
    title: '活动名称02',
  },
]

const showContent = function () {}
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
    <div
      v-for="item, index in campaignsList"
      :key="index"
      class="campaigns-list-column"
    >
      <BaseCollapse @click-show="showContent()">
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
        <template #content>
          <div class="content-spacing">
            <div>
              <section class="stats-grid">
                <div class="stat">
                  <span>活动点击量</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>推荐用户</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>总存款次数</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>独立存款</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>佣金率</span>
                  <span class="value">0.10</span>
                </div>
              </section>
              <AppCopyLine
                title="链接"
                msg="HB3XU3LIJ56T6YTUOM4FKW33NU5DE2DCFEZEKUT2IUXGYNJEJF2A"
              />
            </div>
            <div class="balance-grid">
              <section>
                <span>可用佣金</span>
              </section>
              <section>
                <span>总佣金</span>
              </section>
            </div>
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

<style lang="scss" scoped>
.copy-wrap {
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
}
.content-spacing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--tg-spacing-16);
  padding: var(--tg-spacing-32);
  .stats-grid {
    .stat {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
      line-height: 1.5;
      display: inline-flex;
      align-items: center;
      text-align: left;
      justify-content: flex-start;
      .value {
        color: var(--tg-secondary-light);
        font-variant-numeric: tabular-nums;
      }
    }
  }
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: var(--tg-spacing-32);
  .stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.balance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--tg-spacing-16);
}
.tg-affiliate-campaigns {
  margin-bottom: 38px;
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
</style>

<route lang="yaml">
meta:
  browserTitle: 联盟活动 – Stake.com
</route>
