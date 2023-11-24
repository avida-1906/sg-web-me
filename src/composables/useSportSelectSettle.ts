import { i18n } from '~/modules/i18n'

const { t } = i18n.global

export function useSportSelectSettle(settleValue?: number) {
  const {
    selected: settle,
    list: settleList,
  } = useSelect([
    { label: t('sports_active'), value: 0 },
    { label: t('sports_settled'), value: 1 },
  ])

  if (settleValue !== undefined)
    settle.value = settleValue

  return {
    settle,
    settleList,
  }
}
