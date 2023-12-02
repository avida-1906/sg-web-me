<script setup lang='ts'>
const { t } = useI18n()

const columns = [
  {
    title: t('game'),
    width: 90,
    dataIndex: 'game_name',
    slot: 'game_name',
    align: 'left',
  },
  {
    title: t('bet_number'),
    width: 90,
    dataIndex: 'bill_no',
    slot: 'bill_no',
    align: 'center',
  },
  {
    title: t('date'),
    width: 90,
    dataIndex: 'bet_time',
    slot: 'bet_time',
    align: 'center',
  },
  {
    title: t('bet_amount'),
    width: 90,
    dataIndex: 'bet_amount',
    slot: 'bet_amount',
    align: 'center',
  },
  // {
  //   title: t('multiple_count'),
  //   width: 90,
  //   dataIndex: 'x',
  //   slot: 'x',
  //   align: 'center',
  // },
  {
    title: t('sports_payment_amount'),
    width: 90,
    dataIndex: 'net_amount',
    slot: 'net_amount',
    align: 'center',
  },
]

const { list, runAsync, prev, next, hasMore, page } = useList(ApiMemberCasinoRecordList,
  { }, { page_size: 10 })

await application.allSettled([runAsync({})])
</script>

<template>
  <div class="casino-my-bets">
    <div v-if="list.length === 0" class="empty">
      <BaseEmpty>
        <template #icon>
          <BaseIcon style="font-size: var(--tg-empty-icon-size);" name="empty-1" />
        </template>
        <template #description>
          <span>{{ t('empty_casino_bet') }}</span>
        </template>
        <template #default>
          <BaseButton
            type="text"
            size="none"
            style=" --tg-base-button-text-default-color:var(--tg-text-white)"
            @click="$router.push('/casino')"
          >
            {{ t('sports_betting_now') }}
          </BaseButton>
        </template>
      </BaseEmpty>
    </div>
    <BaseTable
      v-else
      :columns="columns"
      :data-source="list"
    >
      <template #bet_time="{ record: { bet_time } }">
        <div>
          {{ timeToFormat(bet_time) }}
        </div>
      </template>
      <template #bet_amount="{ record: { bet_amount, currency_id } }">
        <div>
          <AppAmount
            :amount="bet_amount"
            :currency-type="getCurrencyConfigByCode(currency_id)?.name"
          />
        </div>
      </template>
      <template #net_amount="{ record: { net_amount, currency_id } }">
        <div>
          <AppAmount
            :amount="net_amount"
            :currency-type="getCurrencyConfigByCode(currency_id)?.name"
          />
        </div>
      </template>
    </BaseTable>
    <div class="btns">
      <BaseButton :disabled="page === 1" type="text" @click="prev">
        {{ t('page_prev') }}
      </BaseButton>
      <BaseButton type="text" :disabled="!hasMore" @click="next">
        {{ t('page_next') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.casino-my-bets{
  margin-bottom: var(--tg-spacing-24);
}
.btns{
  display: flex;
  justify-content: center;

}
.empty{
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
