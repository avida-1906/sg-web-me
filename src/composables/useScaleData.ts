/**
 * 获取游戏类型数据
 */
export function useScaleData() {
  const { t } = useI18n()

  /** 1真人 2捕鱼 3电子 4体育 5棋牌 6电竞 */
  const list = [
    { label: t('live'), value: '1' },
    { label: t('fishing'), value: '2' },
    { label: t('slot'), value: '3' },
    { label: t('sports'), value: '4' },
    { label: t('chess'), value: '5' },
    { label: t('electric_game'), value: '6' },
  ]

  return {
    list,
  }
}
