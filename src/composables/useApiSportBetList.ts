import { i18n } from '~/modules/i18n'

const { t } = i18n.global

/**
 * 获取体育投注记录
 */
export function useApiSportBetList() {
  const {
    selected: settle,
    list: settleList,
  } = useSelect([
    { label: t('sports_active'), value: 0 },
    { label: t('sports_settled'), value: 1 },
  ])

  // const { list: sportBetList } = useList()

  return {
    settle,
    settleList,
  }
}
