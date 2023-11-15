export function useRateExchange() {
  const appStore = useAppStore()
  const { exchangeRateData } = storeToRefs(appStore)

  const exchangeRate = computed(() =>
    exchangeRateData.value && exchangeRateData.value.length ? exchangeRateData.value[0] : undefined)

  return {
    exchangeRate,
  }
}
