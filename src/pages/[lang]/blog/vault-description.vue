<script setup lang='ts'>
const { t } = useI18n()
const { isMobile } = storeToRefs(useWindowStore())

const curType = ref('')

const { data, runAsync } = useRequest(ApiMemberInterestGetConfig)

const minDepositAmount = computed(() => {
  if (data.value)
    return data.value.find(a => a.currency_name === curType.value)?.min_deposit ?? 0

  return 0
})
const interestRate = computed(() => {
  if (data.value)
    return data.value.find(a => a.currency_name === curType.value)?.interest_rate ?? 0
  return 0
})
const contentText = computed(() => {
  if (data.value) {
    const str = data.value.find(a => a.currency_name === curType.value)?.content_text
    const lang = getCurrentLanguageForBackend()
    return str ? JSON.parse(str).text ? JSON.parse(str).text : JSON.parse(str)[lang] ? JSON.parse(str)[lang] : '' : ''
  }
  return ''
})

function changeCurrency(v: any) {
  curType.value = v.type
}

await application.allSettled([runAsync()])
</script>

<template>
  <div class="md:bg-tg-secondary-dark mx-auto max-w-650 select-none md:my-16 md:rounded-[8px] md:p-20">
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
    <div class="bg-tg-secondary-grey flex items-center justify-between rounded-[4px] px-2 md:px-15">
      <div class="text-tg-secondary-light max-w-160 w-full flex flex-col items-center text-center text-[14px] font-semibold leading-[20px]">
        <AppSelectCurrency
          :type="4"
          :show-balance="false"
          popper-clazz="app-wallet-cur"
          placeholder="search"
          :active-currency-list="data ?? []"
          :style="`--tg-app-select-currency-padding-x:0;--tg-app-select-currency-bg:transparent;
          --tg-app-select-currency-padding-y:${isMobile ? '19px' : '17px'};`"
          @change="changeCurrency"
        />
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ application.numberToLocaleString(+minDepositAmount) }}
      </div>
      <div class="text-tg-secondary-light max-w-160 w-full text-center text-[14px] font-semibold leading-[20px]">
        {{ `${application.numberToLocaleString(+interestRate)}%` }}
      </div>
    </div>

    <div v-show="contentText" class="mt-34 md:mt-23" v-html="contentText" />
  </div>
</template>

<style lang='scss' scoped>

</style>

<route lang="yaml">
name: blog
meta:
  layout: home
  </route>
