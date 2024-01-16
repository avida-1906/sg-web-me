<script setup lang='ts'>
const { t } = useI18n()
const {
  currentGlobalCurrency,
} = storeToRefs(useAppStore())
const {
  renderBalanceList,
} = useCurrencyData()

const curType = ref(currentGlobalCurrency.value)
const curCode = computed(() => {
  return renderBalanceList.value.find(a => a.type === curType.value)?.cur ?? '701'
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

const { data, runAsync, loading } = useRequest(() => ApiMemberInterestGetConfig(curCode.value))
const minDepositAmount = computed(() => {
  if (data.value) {
    const arr = JSON.parse(data.value.config)
    return arr.find((a: any) => a.currency_id === +curCode.value)?.min_deposit ?? 0
  }
  return ''
})
const interestRate = computed(() => {
  if (data.value) {
    const arr = JSON.parse(data.value.config)
    return arr.find((a: any) => a.currency_id === +curCode.value)?.interest_rate ?? 0
  }
  return ''
})

watch(currentGlobalCurrency, (a) => {
  curType.value = a
})
watch(curCode, () => {
  runAsync()
})

await application.allSettled([runAsync()])
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
        {{ loading ? '-' : application.numberToLocaleString(minDepositAmount) }}
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ loading ? '-' : `${application.numberToLocaleString(interestRate)}%` }}
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
          <span class="">
            {{ t('vault_des_casino') }}
          </span>
          {{ t('vault_des_2_2') }}
          <span class="">
            {{ t('vault_des_sports') }}
          </span>
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_3') }}

          <span class="">
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
        <li><div>{{ t('vault_des_li1') }}</div></li>
        <li><div>{{ t('vault_des_li2') }}</div></li>
        <li>
          <div>
            {{ t('vault_des_li3_1') }}
            <span class="">{{ t('vault_des_li3_2') }}</span>
          </div>
        </li>
        <li><div>{{ t('vault_des_li4') }}</div></li>
        <li><div>{{ t('vault_des_li5') }}</div></li>
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
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_11') }}
          <span class="">{{ t('vault_des_card') }}</span>
          <span class="">{{ t('vault_des_dice') }}</span>
          <span class="">{{ t('vault_des_slots') }}</span>
          {{ t('vault_des_12') }}
          <span class="">{{ t('vault_des_live') }}</span>
          {{ t('and') }}
          <span class="">{{ t('vault_des_upcoming') }}</span>
          {{ t('vault_des_13') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_14') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_15') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_16') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_17') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_18') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_19') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-12 ml-[3vw] list-disc text-[14px] font-semibold leading-[1.42] md:ml-[20px]">
        <li><div>{{ t('vault_des_li6') }}</div></li>
        <li><div>{{ t('vault_des_li7') }}</div></li>
        <li><div>{{ t('vault_des_li8') }}</div></li>
        <li><div>{{ t('vault_des_li9') }}</div></li>
        <li><div>{{ t('vault_des_li10') }}</div></li>
        <li><div>{{ t('vault_des_li11') }}</div></li>
      </ul>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_20') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_21') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_22') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_23') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_24') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_25') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_26') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_27') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_28') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_29') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-12 ml-[3vw] list-disc text-[14px] font-semibold leading-[1.42] md:ml-[20px]">
        <li><div>{{ t('vault_des_li12') }}</div></li>
        <li><div>{{ t('vault_des_li13') }}</div></li>
        <li><div>{{ t('vault_des_li14') }}</div></li>
        <li><div>{{ t('vault_des_li15') }}</div></li>
        <li><div>{{ t('vault_des_li16') }}</div></li>
        <li><div>{{ t('vault_des_li17') }}</div></li>
        <li><div>{{ t('vault_des_li18') }}</div></li>
        <li><div>{{ t('vault_des_li19') }}</div></li>
        <li><div>{{ t('vault_des_li20') }}</div></li>
        <li><div>{{ t('vault_des_li21') }}</div></li>
        <li><div>{{ t('vault_des_li22') }}</div></li>
        <li><div>{{ t('vault_des_li23') }}</div></li>
        <li><div>{{ t('vault_des_li24') }}</div></li>
        <li><div>{{ t('vault_des_li25') }}</div></li>
        <li><div>{{ t('vault_des_li26') }}</div></li>
        <li><div>{{ t('vault_des_li27') }}</div></li>
        <li><div>{{ t('vault_des_li28') }}</div></li>
        <li><div>{{ t('vault_des_li29') }}</div></li>
        <li><div>{{ t('vault_des_li30') }}</div></li>
      </ul>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_30') }}
        </div>
      </div>
      <!-- 🔖🔖🔖 -->
      <div>
        <div class="text-tg-text-white mb-8 text-[18px] font-semibold leading-[1.42]">
          {{ t('vault_des_31') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_32') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_33') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_34') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light mb-12 text-[14px] font-semibold leading-[1.42]">
          {{ t('vault_des_35') }}
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
