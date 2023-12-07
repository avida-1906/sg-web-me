export function useSportSelectSettle(settleValue?: number) {
  const { t } = useI18n()
  const {
    selected: settle,
    list: settleList,
  } = useSelect([
    { label: t('sports_active'), value: 0, icon: 'navbar-active' },
    { label: t('sports_settled'), value: 1, icon: 'navbar-settled' },
  ])

  if (settleValue !== void 0)
    settle.value = settleValue

  return {
    settle,
    settleList,
  }
}
