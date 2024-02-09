/**
 * 获取游戏类型数据
 */
export function useScaleData() {
  const { t } = useI18n()

  /** 1真人 2捕鱼 3电子 4体育 5棋牌 6电竞 */
  const list = [
    { label: t('game_type_slot_short_name'), value: '3', icon: 'chess-slot-machine' },
    { label: t('fishing'), value: '2', icon: 'uni-fishing' },
    { label: t('chess'), value: '5', icon: 'tabbar-game' },
    { label: t('live'), value: '1', icon: 'chess-live-casino' },
    { label: t('sports'), value: '4', icon: 'spt-soccer' },
    // { label: t('electric_game'), value: '6' },
  ]

  return {
    list,
  }
}
