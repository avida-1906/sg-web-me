<script lang="ts" setup>
interface Props {
  tabs: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  emptyText: string
  downloadText?: string
  tabValue?: string | number
  contentType: 'deposit' | 'withdraw' | 'other'
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:tabValue'])

const { t } = useI18n()
const { isMobile } = storeToRefs(useWindowStore())
// 存款详情弹框
const { openDepositDetailDialog }
  = useDialogDepositDetail(props.contentType === 'deposit' ? t('deposit_detail') : t('withdraw_detail'))
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
// 其他
const financeRecordOther = useList(ApiFinanceRecordOther,
  { manual: true }, { page_size: 10 })

const tab = ref(props.tabs[0]?.value ?? '')
emit('update:tabValue', tab.value)
const activeRecord = ref<any>(getInit())

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
const isOther = computed(() => {
  return props.contentType === 'other'
})

function tabChange(val: string) {
  if (val === 'byte_coin')
    activeRecord.value = recordDepositCoin
  else if (val === 'real_coin')
    activeRecord.value = recordDepositBank
  else if (val === 'byt_w_coin')
    activeRecord.value = recordWithdrawCoin
  else if (val === 'real_w_coin')
    activeRecord.value = recordWithdrawBank
  else
    activeRecord.value = financeRecordOther
  activeRecord.value.page = 1
  activeRecord.value.list.length = 0
  runInit()
}
function pagePrevious() {
  activeRecord.value.prev()
  runInit()
}
function pageNext() {
  activeRecord.value.next()
  runInit()
}
function formatWithdrawState(state: number) {
  // <!--1：成功，2：拒绝，3，审核中，4：删除，5：三方异常，6：出款中-- >
  switch (state) {
    case 1: return t('checklist_completed')
    case 2: return t('failure')
    case 3: return t('dealing')
    case 4: return t('failure')
    case 5: return t('failure')
    case 6: return t('dealing')
    default: return '--'
  }
}
function formatDepositState(state: number) {
  // <!--1：成功，2：失败，3，支付中，4：删除，5:待审核 6：取消-- >
  switch (state) {
    case 1: return t('confirmed')
    case 2: return t('failure')
    case 3: return t('status_pending')
    case 4: return t('failure')
    case 5: return t('status_pending')
    case 6: return t('cancel')
    default: return '--'
  }
}
function getStateIcon(state: number) {
  switch (state) {
    case 1: return 'uni-record-success'
    case 2: return 'uni-record-err'
    case 3: return 'uni-record-confirm'
    case 4: return 'uni-record-err'
    case 5: return props.contentType === 'deposit' ? 'uni-record-confirm' : 'uni-record-err'
    case 6: return props.contentType === 'deposit' ? 'uni-record-cancel' : 'uni-record-confirm'
    default: return '--'
  }
}
function getInit() {
  switch (props.contentType) {
    case 'deposit': return recordDepositCoin
    case 'withdraw': return recordWithdrawCoin
    case 'other': return financeRecordOther
  }
}
function runInit() {
  if (isOther.value) {
    activeRecord.value.run({
      page: activeRecord.value.page,
      page_size: activeRecord.value.page_size,
      id: tab.value.toString(),
    })
  }
  else {
    activeRecord.value.run()
  }
}

watch(tab, (val) => {
  emit('update:tabValue', val)
})

if (isOther.value) {
  await application.allSettled(
    [
      activeRecord.value.runAsync({
        page: activeRecord.value.page,
        page_size: activeRecord.value.page_size,
        id: tab.value.toString(),
      }),
    ],
  )
}
else {
  activeRecord.value.run()
}
</script>

<template>
  <section class="tg-app-tab-record">
    <div v-if="!(isMobile && activeRecord.loading)">
      <div class="top">
        <BaseTab
          v-model="tab" :list="tabs" :center="false" need-scroll-at-init
          @change="tabChange"
        />
      </div>
      <div class="middle">
        <div v-if="getList.length" class="record-box">
          <div
            v-for="item of getList" :key="item.order_number"
            class="center record-item"
            :class="[isOther ? '' : 'cursor-pointer']"
            @click="(!isOther) && openDepositDetailDialog(item)"
          >
            <div v-if="!isOther" class="center item-left">
              <BaseIcon :name="getStateIcon(item.state)" />
            </div>
            <div class="item-right">
              <div class="flex-between">
                <span
                  v-if="isOther"
                  class="white"
                >{{ item.cash_type_name }}</span>
                <span v-else class="white">
                  {{ props.contentType === 'deposit'
                    ? formatDepositState(item.state)
                    : formatWithdrawState(item.state) }}</span>
                <AppAmount
                  :amount="item.finally_amount ?? item.amount"
                  :currency-type="getCurrencyConfigByCode(item.currency_id)?.name"
                />
              </div>
              <div class="flex-between">
                <span>{{ timeToCustomizeFormat(item.created_at) }}</span>
                <div
                  v-if="!isOther"
                  class="center" style="gap: var(--tg-spacing-4);"
                >
                  <span style="color:var(--tg-text-white);">{{ item.order_number }}</span>
                  <BaseIcon
                    style="font-size: var(--tg-font-size-xs);"
                    name="tabbar-bet"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty">
          <BaseEmpty :description="emptyText" icon="empty-1" />
        </div>
        <div v-show="activeRecord.total > 10" class="page-stack-wrap mt-24">
          <AppStack
            :pagination-data="getPage"
            scroll
            @previous="pagePrevious"
            @next="pageNext"
          />
        </div>
        <!-- <div v-if="downloadText" class="download-btn mt-24">
          <BaseButton size="md">
            {{ downloadText }}
          </BaseButton>
        </div> -->
      </div>
    </div>
    <div v-if="activeRecord.loading" class="center record-loading">
      <BaseLoading />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.empty {
  margin-top: var(--tg-spacing-24);
  :deep(.base-empty-description) {
    padding-bottom: 0;
    padding-top: var(--tg-spacing-16);
  }
}
.tg-app-tab-record {
  min-height: 195px;
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
}
// .footer-buttons {
//   font-size: var(--tg-font-size-default);
//   color: var(--tg-text-white);
//   opacity: 0.5;
// }
.record-box{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-top: var(--tg-spacing-16);
  .record-item{
    gap: var(--tg-spacing-8);
    border-radius: var(--tg-radius-default);
    padding: 8px 12px;
    background-color: var(--tg-secondary-grey);
  }
  .item-left{
    font-size: var(--tg-font-size-lg);
  }
  .item-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-4)
  }
  .flex-between{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--tg-font-size-default);
    line-height: 1.3215;
    color: var(--tg-secondary-light);
  }
  .white{
    color: var(--tg-text-white);
  }
}
.record-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.45)};
}
</style>
