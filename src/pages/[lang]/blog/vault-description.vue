<script setup lang='ts'>
const { t } = useI18n()
const {
  currentGlobalCurrency,
} = storeToRefs(useAppStore())
const {
  renderBalanceList,
} = useCurrencyData()
console.log('🚀 ~ renderBalanceList:', renderBalanceList.value)

const curType = ref(currentGlobalCurrency.value)
const curCode = computed(() => {
  return renderBalanceList.value.find(a => a.type === currentGlobalCurrency.value)?.cur ?? '701'
})

const currencyOptions = computed(() => {
  return renderBalanceList.value.map((a) => {
    return {
      label: a.type,
      value: a.type,
      currencyType: a.type,
    }
  })
})

const { data } = useRequest(() => ApiMemberInterestGetConfig(curCode.value), { manual: false })
const minDepositAmount = computed(() => {
  if (data.value) {
    const arr = JSON.parse(data.value.config)
    return arr.find((a: any) => a.currency_id === +curCode.value)?.min_deposit
  }
  return ''
})
const interestRate = computed(() => {
  if (data.value) {
    const arr = JSON.parse(data.value.config)
    return arr.find((a: any) => a.currency_id === +curCode.value)?.interest_rate
  }
  return ''
})

watch(currentGlobalCurrency, (a) => {
  curType.value = a
})
</script>

<template>
  <div class="md:bg-tg-secondary-dark mx-auto max-w-650 md:my-16 md:rounded-[8px] md:p-20">
    <div class="flex justify-between px-2 py-19 md:px-15 md:py-17">
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ t('currency_type') }}
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ t('min_deposit_amount') }}
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ t('annual_interest_rate') }}
      </div>
    </div>
    <div class="bg-tg-secondary-grey flex justify-between rounded-[4px] px-2 py-19 md:px-15 md:py-17">
      <div class="text-tg-secondary-light max-w-160 w-full flex flex-col items-center text-center text-[14px] font-semibold leading-[20px]">
        <BaseSelect
          v-model="curType" popper :options="currencyOptions"
          style="--tg-base-select-popper-style-padding-x:0;--tg-base-select-popper-style-padding-y:0;--tg-base-select-popper-bg-color:transparent;"
        >
          <template #label="{ data }">
            <AppCurrencyIcon show-name :currency-type="data?.value" />
          </template>
          <template #option="{ data: { item } }">
            <AppCurrencyIcon show-name :currency-type="item.value" />
          </template>
        </BaseSelect>
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ numberToLocaleString(minDepositAmount) }}
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ numberToLocaleString(interestRate * 100) }}%
      </div>
    </div>

    <div class="mt-34 md:mt-23">
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_1') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_2_1') }}
          <span class="underline">
            {{ t('vault_des_casino') }}
          </span>
          {{ t('vault_des_2_2') }}
          <span class="underline">
            {{ t('vault_des_sports') }}
          </span>
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_3') }}

          <span class="underline">
            Meibo.com
          </span>
          {{ t('period') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_4') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_5') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_6') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_7') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-12 ml-[3vw] list-disc text-[14px] font-semibold leading-[1.42] md:ml-[20px]">
        <li>{{ t('vault_des_li1') }}</li>
        <li>{{ t('vault_des_li2') }}</li>
        <li>
          {{ t('vault_des_li3_1') }}
          <span class="underline">{{ t('vault_des_li3_2') }}</span>
        </li>
        <li>{{ t('vault_des_li4') }}</li>
        <li>{{ t('vault_des_li5') }}</li>
      </ul>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_8') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_9') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_10') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_11') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

<route lang="yaml">
name: blog
meta:
  layout: home
  </route>
