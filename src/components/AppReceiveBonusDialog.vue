<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { FeedBackItem } from '~/stores/chat'

interface Props {
  feedBackItem?: FeedBackItem
  totalBonus?: string
  vipBonus?: string
  vipBonusId?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['confirm'])

const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const appStore = useAppStore()
const { exchangeRateData } = storeToRefs(appStore)
const chatStore = useChatStore()
const { openNotify } = useNotify()
const { width } = useWindowSize()

const currentNetwork = ref('')
const activeCurrency = ref<CurrencyData | null>()
const isMobile = ref(width.value < 768)

const rate = computed(() => {
  const temp = exchangeRateData.value?.rates
  if (temp && temp['706'] && activeCurrency.value)
    return temp['706'][activeCurrency.value.cur] || '1'
  return '1'
})
const money = computed(() =>
  props.feedBackItem?.amount ?? props.totalBonus ?? props.vipBonus)
const ratedMoney = computed(() => {
  if (rate.value && activeCurrency.value)
    return mul(+money.value, +rate.value)
})
const isVirCurrency = computed(() => {
  if (activeCurrency.value)
    return application.isVirtualCurrency(activeCurrency.value.type)

  return false
})

const { run: runDrawBonus, loading } = useRequest(ApiMemberFeedbackBonusDraw, {
  onSuccess: () => {
    if (props.feedBackItem)
      chatStore.setFeedbackItem({ ...props.feedBackItem, bonusState: 2 })
    openNotify({ type: 'success', message: t('receive_success') })
    appStore.getBalanceData()
    closeDialog()
  },
})

const { run: runDrawVipBonus, loading: vipLoading } = useRequest(ApiMemberApplyVipBonus, {
  onSuccess: () => {
    openNotify({ type: 'success', message: t('receive_success') })
    appStore.getBalanceData()
    closeDialog()
  },
})

function receiveBonus() {
  emit('confirm')
  if (props.feedBackItem
    && props.feedBackItem.bonusState === 1
    && props.feedBackItem.feed_id
    && !loading.value)
    runDrawBonus({ feed_id: props.feedBackItem.feed_id, cur: activeCurrency.value?.cur ?? '706' })

  else if (props.totalBonus && +props.totalBonus > 0)
    runDrawBonus({ feed_id: '', cur: activeCurrency.value?.cur ?? '706' })

  else if (props.vipBonus)
    runDrawVipBonus({ cur: activeCurrency.value?.cur ?? '706', id: props.vipBonusId ?? '' })
}

function changeCurrency(item: CurrencyData, network: string) {
  activeCurrency.value = item
  currentNetwork.value = network
}
</script>

<template>
  <div class="app-receive-bonus" :class="{ 'is-mobile': isMobile }">
    <div class="choose-label">
      <span>{{ $t('current_wait_receive_label') }}：</span>
      <span class="money">{{ money }}<BaseIcon name="coin-usdt" /></span>
      <span>{{ $t('choose_bonus_receive_label') }}</span>
    </div>
    <div class="currency-wrap">
      <AppSelectCurrency
        :show-balance="false"
        :network="isVirCurrency"
        placeholder="search"
        @change="changeCurrency"
      />
      <div class="rate">
        {{ $t('current_exchange_rate') }}：{{ rate }}
      </div>
    </div>
    <div v-if="activeCurrency" class="about-receive">
      {{ $t('bonus_receive_expect') }}：
      <span>
        <AppAmount :amount="`${ratedMoney}`" :currency-type="activeCurrency.type" />
      </span>
    </div>
    <div class="buttons">
      <BaseButton size="md" @click="closeDialog">
        {{ $t('cancel') }}
      </BaseButton>
      <BaseButton
        bg-style="primary"
        size="md"
        :loading="loading || vipLoading"
        @click="receiveBonus"
      >
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
  &.is-mobile {
    .choose-label {
      display: inline;
      text-align: left;
    }
  }
  .money {
    color: var(--tg-text-warn);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    display: inline-flex;
    align-items: center;
    gap: var(--tg-spacing-4);
    svg {
      margin-right: var(--tg-spacing-6);
    }
  }
  .choose-label {
    display: flex;
    align-items: center;
    color: var(--tg-secondary-light);
    line-height: var(--tg-spacing-20);
    flex-wrap: wrap;
    word-break: break-all;
  }
  .currency-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--tg-spacing-8);
    flex-wrap: wrap;
    width: 100%;
    .rate {
      font-weight: var(--tg-font-weight-semibold);
    }
  }
  .about-receive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--tg-font-weight-semibold);
    > span {
      color: var(--tg-text-warn);
    }
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
