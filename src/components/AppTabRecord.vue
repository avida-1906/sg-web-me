<script lang="ts" setup>
interface Props {
  tabs: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  emptyText: string
  downloadText?: string
}

const props = withDefaults(defineProps<Props>(), {})

// 加密货币存款
const recordDepositCoin = useList(ApiFinanceRecordDepositCoin,
  { manual: true }, { page_size: 10 })
// 法定货币存款
const recordDepositBank = useList(ApiFinancRecordDepositBank,
  { manual: true }, { page_size: 10 })
// 加密货币取款
const recordWithdrawCoin = useList(ApiFinanceRecordWithdrawCoin,
  { manual: true }, { page_size: 10 })
// 法定货币取款
const recordWithdrawBank = useList(ApiFinanceRecordWithdrawBank,
  { manual: true }, { page_size: 10 })

const tab = ref(props.tabs[0].value)
const activeRecord = ref<any>(
  tab.value === 'byte_coin' ? recordDepositCoin : recordWithdrawCoin)

const getList = computed(() => {
  return activeRecord.value.list
})
const getPage = computed(() => {
  return {
    pageSize: 10,
    page: activeRecord.value.page,
    total: activeRecord.value.total,
  }
})

function tabChange(val: string) {
  if (val === 'byte_coin')
    activeRecord.value = recordDepositCoin
  else if (val === 'real_coin')
    activeRecord.value = recordDepositBank
  else if (val === 'byte_w_coin')
    activeRecord.value = recordWithdrawCoin
  else if (val === 'real_w_coin')
    activeRecord.value = recordWithdrawBank
  activeRecord.value.page = 1
  activeRecord.value.list.length = 0
  activeRecord.value.run()
}
function pagePrevious() {
  activeRecord.value.prev()
  activeRecord.value.run()
}
function pageNext() {
  activeRecord.value.next()
  activeRecord.value.run()
}
function formatState(state: number) {
  // <!--1：成功，2：拒绝，3，审核中，4：删除，5：三方异常，6：出款中-- >
  switch (state) {
    case 1: return '成功'
    case 2: return '拒绝'
    case 3: return '审核中'
    case 4: return '删除'
    case 5: return '三方异常'
    case 6: return '出款中'
    default: return '--'
  }
}

activeRecord.value.run()
</script>

<template>
  <section class="tg-app-tab-record">
    <div class="top">
      <BaseTab v-model="tab" :list="tabs" :center="false" @change="tabChange" />
    </div>
    <div class="middle">
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
      <div v-else class="empty">
        <BaseEmpty :description="emptyText" icon="empty-1" />
      </div>
      <div class="page-stack-wrap mt-24">
        <AppStack
          :pagination-data="getPage"
          @previous="pagePrevious" @next="pageNext"
        />
      </div>
      <div v-if="downloadText" class="download-btn mt-24">
        <BaseButton size="md">
          {{ downloadText }}
        </BaseButton>
      </div>
    </div>
    <div v-if="activeRecord.loading" class="center record-loading">
      <BaseLoading />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-app-tab-record {
  position: relative;
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
}
.footer-buttons {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  opacity: 0.5;
}
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
.record-loading{
  position: absolute;
  width: calc(100% + 48px);
  height: calc(100% + 48px);
  left: -24px;
  top: -24px;
  // margin: -24px;
  background-color: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.45)};
}
</style>
