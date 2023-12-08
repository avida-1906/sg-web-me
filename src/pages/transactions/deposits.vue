<script lang="ts" setup>
const { t } = useI18n()
usePageTitle({ prefix: t('transaction_deposit') })
// 加密货币存款
const {
  run: runinanceRecordDepositCoin,
  list: coinList, prev: coinPrev, next: coinNext,
  total: coinTotal, page: coinPage,
} = useList(ApiFinanceRecordDepositCoin,
  { manual: true }, { page_size: 10 })
// 法定货币存款
const {
  run: runFinancRecordDepositBank,
  list, prev, next, page, total,
} = useList(ApiFinancRecordDepositBank,
  { manual: true }, { page_size: 10 })

const tabList = reactive([
  { label: t('currency_byte_coin'), value: 'byte_coin' },
  { label: t('currency_law_coin'), value: 'real_coin' },
])
const tabVal = ref('')

const getList = computed(() => {
  if (tabVal.value === 'byte_coin')
    return coinList.value
  else if (tabVal.value === 'real_coin')
    return list.value
  else
    return []
})
const getPage = computed(() => {
  switch (tabVal.value) {
    case 'byte_coin': return {
      pageSize: 10,
      page: coinPage.value,
      total: coinTotal.value,
    }
    case 'real_coin': return {
      pageSize: 10,
      page: page.value,
      total: total.value,
    }
    default: return {
      pageSize: 10,
      page: 1,
      total: 0,
    }
  }
})

function formatState(state: number) {
  // <!--1：成功，2：拒绝，3，审核中，4：删除，5：三方异常，6：出款中-- >
  switch (state) {
    case 1: return '成功'
    case 2: return '拒绝'
    case 3: return '审核中'
    case 4: return '删除'
    case 5: return '三方异常'
    case 6: return '出款中'
    default:return '--'
  }
}
function changeTab(val: string) {
  tabVal.value = val
  if (val === 'byte_coin') {
    coinPage.value = 1
    runinanceRecordDepositCoin()
  }
  else if (val === 'real_coin') {
    page.value = 1
    runFinancRecordDepositBank()
  }
}
function pagePrevious() {
  prev()
  coinPrev()
  runFinancRecordDepositBank()
}
function pageNext() {
  next()
  coinNext()
  runFinancRecordDepositBank()
}
</script>

<template>
  <section class="tg-deposits-record-page">
    <AppTabRecord
      :tabs="tabList"
      :empty-text="getList.length ? '' : $t('finance_deposit_empty_text')"
      :download-text="$t('finance_deposit_download_text')"
      :pagination-data="getPage"
      @tab="changeTab"
      @previous="pagePrevious" @next="pageNext"
    >
      <template #content>
        <div v-if="getList.length" class="record-box">
          <div
            v-for="item of getList" :key="item.order_number"
            class="record-item center"
          >
            <div class="item-left">
              <BaseIcon name="sport-success" />
            </div>
            <div class="item-right">
              <div class="flex-between">
                <span style="color:var(--tg-text-white)">
                  {{ formatState(item.state) }}</span>
                <AppAmount
                  :amount="item.finally_amount"
                  :currency-type="getCurrencyConfigByCode(item.currency_id)?.name"
                />
              </div>
              <div class="flex-between">
                <span>{{ timeToFormat(item.created_at) }}</span>
                <BaseIcon style="font-size: 12px;" name="uni-jump-page" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppTabRecord>
  </section>
</template>

<style lang="scss" scoped>
.tg-deposits-record-page{
  .record-box{
    margin-top: 16px;
    .record-item{
      gap: 8px;
      border-radius: var(--tg-radius-default);
      padding: 8px 12px;
      &:nth-child(odd){
        background-color: #213743;
      }
    }
    .item-left{

    }
    .item-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .flex-between{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--tg-font-size-default);
      line-height: 1.2;
      color: #B1BAD3;
    }
  }
}
</style>

<route lang="yaml">
  </route>
