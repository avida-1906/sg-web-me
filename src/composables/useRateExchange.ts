export function useRateExchange() {
  const appStore = useAppStore()
  const { exchangeRateData } = storeToRefs(appStore)

  const exchangeRate = computed(() => exchangeRateData.value?.rates)

  return {
    exchangeRate,
  }
}
