import { i18n } from '~/modules/i18n'

const { t } = i18n.global

/** 滚球筛选项目 */
const rollingBallSelectOption: ISelectOption[] = [
  {
    label: t('sports_total_market'),
    value: '1',
  },
  {
    label: t('sports_handicap_market'),
    value: '2',
  },
  {
    label: t('sports_winner_market'),
    value: '3',
  },
]

type TSelect = 'rollingBallSelectOption'

/**
 * 选择器
 * @description 用于项目所有选择器列表
 */
export function useOption(type: TSelect) {
  const optionMap = {
    rollingBallSelectOption,
  }

  return optionMap[type]
}
