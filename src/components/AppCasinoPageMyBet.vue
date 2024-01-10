<script setup lang='ts'>
import type { ICasinoBetRecordItem } from '~/apis/types'

interface Props {
  isFirst: boolean
}
const props = defineProps<Props>()

const { t } = useI18n()
const { isMobile } = storeToRefs(useWindowStore())
const { openBetSlipDialog } = useDialogBetSlip()

const columns = computed(() => {
  if (isMobile.value) {
    return [
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
        align: 'left',
      },
      {
        title: t('sports_payment_amount'),
        width: 90,
        dataIndex: 'net_amount',
        slot: 'net_amount',
        align: 'right',
      },
    ]
  }
  return [
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
      align: 'left',
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
      align: 'right',
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
      align: 'right',
    },
  ]
})

const {
  list, prev, next, hasMore, page, runAsync, run,
  loading,
} = useList(ApiMemberCasinoRecordList, {}, { page_size: 10 })

function showDetail(data: ICasinoBetRecordItem) {
  openBetSlipDialog({ type: 'casino', data })
}

if (props.isFirst)
  await application.allSettled([runAsync({})])
else
  run({})
</script>

<template>
  <div class="casino-my-bets">
    <AppLoading v-if="loading" />
    <template v-else>
      <div v-if="list.length === 0" class="empty">
        <BaseIcon
          style="font-size: var(--tg-empty-icon-size);margin-bottom: 16px;"
          name="empty-1"
        />
        <div class="idiot">
          <span>{{ t('empty_casino_bet') }}</span>
          <BaseButton
            type="text" size="none"
            style="--tg-base-button-text-default-color:var(--tg-text-white)"
            @click="$router.push('/casino')"
          >
            {{ t('start_game_now') }}！
          </BaseButton>
        </div>
      </div>

      <BaseTable v-else :columns="columns" :data-source="list">
        <template #game_name="{ record: { game_name, game_class } }">
          <div class="game_name">
            <BaseIcon
              v-if="game_class === '1'" style="font-size: 16px;"
              name="chess-live-casino"
            />
            <BaseIcon v-else style="font-size: 16px;" name="chess-slot-machine" />
            {{ game_name }}
          </div>
        </template>
        <template #bill_no="{ record }">
          <BaseButton size="none" type="text" @click="showDetail(record)">
            <div class="bill_no">
              <BaseIcon v-if="!isMobile" style="font-size: 16px;" name="tabbar-bet" />
              <span>{{ record.bill_no }}</span>
            </div>
          </BaseButton>
        </template>
        <template #bet_time="{ record: { bet_time } }">
          <div>
            {{ timeToCustomizeFormat(bet_time) }}
          </div>
        </template>
        <template #bet_amount="{ record: { bet_amount, currency_id } }">
          <div class="amount">
            <AppAmount
              :amount="bet_amount"
              :currency-type="getCurrencyConfigByCode(currency_id)?.name"
            />
          </div>
        </template>
        <template #net_amount="{ record: { net_amount, currency_id } }">
          <div class="amount" :class="{ win: net_amount > 0 }">
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
    </template>
  </div>
</template>

<style lang='scss' scoped>
.casino-my-bets {
  margin-bottom: var(--tg-spacing-52);
}

.btns {
  display: flex;
  justify-content: center;
  --tg-base-button-text-default-color: var(--tg-text-white);
}

.empty {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 20px;
  padding: 16px;
  .idiot{
    display: flex;
    flex-direction: column;
    span {
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    margin-bottom: 4px;
  }
  }
}

.game_name {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-4);
}

.bill_no {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-4);

  span {
    display: inline-block;
    max-width: 9ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
  }
}

.amount {
  display: flex;
  justify-content: flex-end;

  &.win {
    color: var(--tg-text-green);
  }
}
</style>
