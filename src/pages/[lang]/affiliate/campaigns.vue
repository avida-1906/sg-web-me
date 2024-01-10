<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate_activity', isT: true })
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
        <span>{{ $t('activity_clicks') }}</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>{{ $t('recommend_users') }}</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>{{ $t('total_deposits') }}</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>{{ $t('independent_deposit') }}</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>{{ $t('finance_funds_transfer_sort_available') }}</span>
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
            <span>{{ $t('finance_funds_transfer_sort_commission') }}： 0.00000000</span>
            <BaseIcon name="coin-btc" />
          </div>
        </template>
        <template #content>
          <div class="content-spacing">
            <div>
              <section class="stats-grid">
                <div class="stat">
                  <span>{{ $t('activity_clicks') }}</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>{{ $t('recommend_users') }}</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>{{ $t('total_deposits') }}</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>{{ $t('independent_deposit') }}</span>
                  <span class="value">0</span>
                </div>
                <div class="stat">
                  <span>{{ $t('commission_rate') }}</span>
                  <span class="value">0.10</span>
                </div>
              </section>
              <AppCopyLine
                :title="$t('link')"
                msg="HB3XU3LIJ56T6YTUOM4FKW33NU5DE2DCFEZEKUT2IUXGYNJEJF2A"
              />
            </div>
            <div class="balance-grid">
              <section>
                <span>{{ $t('avai_commission') }}</span>
              </section>
              <section>
                <span>{{ $t('total_commission') }}</span>
              </section>
            </div>
          </div>
        </template>
      </BaseCollapse>
    </div>
    <div class="page-stack-wrap tg-mt-24">
      <AppStack />
    </div>
    <BaseButton>
      {{ $t('new_active') }}
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
</route>
