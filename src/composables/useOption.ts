/** 滚球筛选项目 */
const rollingBallSelectOption: ISelectOption[] = [
  {
    label: '总分盘',
    value: '1',
  },
  {
    label: '让分盘',
    value: '2',
  },
  {
    label: '获胜盘',
    value: '3',
  },
]

type TSelect = 'rollingBallSelectOption'

/**
 * 选择器
 * @description 用于项目所有选择器列表
 */
export function useSelect(type: TSelect) {
  const optionMap = {
    rollingBallSelectOption,
  }

  return optionMap[type]
}
