<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const router = useRouter()
const { t } = useI18n()

const currentTab = ref('1')
const tabList = [
  { label: t('sports_active'), value: '1' },
  { label: t('sports_settled'), value: '2' },
]
const { page, prev, next, hasMore } = useList(ApiMemberFavList)
</script>

<template>
  <div class="tg-sports-my-bets" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
    </div>
    <div class="tab-bar">
      <BaseTab v-model="currentTab" :list="tabList" :center="false" />
    </div>
    <div class="empty">
      <BaseEmpty>
        <template #icon>
          <div>
            <BaseIcon
              style="
                font-size: var(--tg-empty-icon-size);
                margin-bottom: var(--tg-spacing-24);"
              name="uni-empty-betslip"
            />
          </div>
        </template>
        <template #description>
          <span>{{ t('sports_no_active_bet') }}</span>
        </template>
        <template #default>
          <BaseButton
            type="text"
            size="none"
            style=" --tg-base-button-text-default-color:var(--tg-text-white)"
            @click="router.push(`/sports/${getSportsPlatId()}`)"
          >
            {{ t('sports_betting_now') }}
          </BaseButton>
        </template>
      </BaseEmpty>
    </div>
    <div class="btns">
      <BaseButton type="text" :disabled="page === 1" @click="prev">
        {{ $t('page_prev') }}
      </BaseButton>
      <BaseButton type="text" :disabled="!hasMore" @click="next">
        {{ $t('page_next') }}
      </BaseButton>
    </div>
    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-my-bets {
  margin-top: var(--tg-spacing-24);
  padding-top: var(--tg-spacing-12);
  &.on-page{
    margin-top: 0;
    padding-top: 0;
  }

  .tab-bar {
    margin-top: var(--tg-spacing-24);
    margin-bottom: var(--tg-spacing-24);
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    min-height: 150px;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--tg-spacing-56);
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
