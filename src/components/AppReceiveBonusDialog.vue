<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { FeedBackItem } from '~/stores/chat'

interface Props {
  feedBackItem?: FeedBackItem
  totalBonus?: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const appStore = useAppStore()
const { exchangeRateData } = storeToRefs(appStore)
const chatStore = useChatStore()
const { isVirtualCurrency } = useCurrencyData()
const { openNotify } = useNotify()

const currentNetwork = ref('')
const activeCurrency = ref<CurrencyData | null>()

const rate = computed(() => {
  const temp = exchangeRateData.value?.rates
  if (temp && temp.USDT && activeCurrency.value)
    return temp.USDT[activeCurrency.value.type] || '1'
  return '1'
})
const money = computed(() => props.feedBackItem?.amount ?? props.totalBonus)
const ratedMoney = computed(() => {
  if (rate.value && activeCurrency.value)
    return mul(+money.value, +rate.value)
})
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return isVirtualCurrency(activeCurrency.value.type)

  return false
})

const { run: runDrawBonus, loading } = useRequest(ApiMemberFeedbackBonusDraw, {
  onSuccess: () => {
    if (props.feedBackItem)
      chatStore.setFeedbackItem({ ...props.feedBackItem, bonusState: 2 })
    openNotify({ type: 'success', message: t('receive_success') })
  },
})

const closeDialog = inject('closeDialog', () => {})

function receiveBonus() {
  if (props.feedBackItem
    && props.feedBackItem.bonusState === 1
    && props.feedBackItem.feed_id
    && !loading.value)
    runDrawBonus({ feed_id: props.feedBackItem.feed_id })
  else if (props.totalBonus && +props.totalBonus > 0)
    runDrawBonus({ feed_id: '' })
}

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
}
</script>

<template>
  <div class="app-receive-bonus">
    <div class="money">
      {{ feedBackItem?.amount ?? totalBonus }}USDT
    </div>
    <div class="choose-label">
      {{ $t('choose_bonus_receive_label') }}：
    </div>
    <div class="currency-wrap">
      <AppSelectCurrency
        :show-balance="false"
        :network="isVirCurrency"
        @change="changeCurrency"
      />
      <div class="rate">
        {{ $t('current_exchange_rate') }}：{{ rate }}
      </div>
    </div>
    <div v-if="activeCurrency" class="about-receive">
      {{ $t('bonus_receive_expect') }}：
      <AppAmount :amount="`${ratedMoney}`" :currency-type="activeCurrency.type" />
    </div>
    <div class="buttons">
      <BaseButton size="md" @click="closeDialog">
        {{ $t('cancel') }}
      </BaseButton>
      <BaseButton bg-style="primary" size="md" :loading="loading" @click="receiveBonus">
        {{ $t('confirm_receive') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-receive-bonus {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--tg-spacing-16);
  text-align: center;
  padding: var(--tg-spacing-4) var(--tg-spacing-16) var(--tg-spacing-16);
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  .money {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-lg);
    font-weight: var(--tg-font-weight-semibold);
  }
  .choose-label {
    color: var(--tg-secondary-light);
    line-height: var(--tg-spacing-20);
  }
  .currency-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--tg-spacing-8);
    .rate {
      font-weight: var(--tg-font-weight-semibold);
    }
  }
  .about-receive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--tg-font-weight-semibold);
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-12);
    width: 100%;
    button {
      flex: 1;
    }
  }
}
</style>
