import type { ISportsMyBetSlipItem } from '~/apis/types'
import { i18n } from '~/modules/i18n'

const { t } = i18n.global

/**
 * 获取体育投注记录
 */
export function useApiSportBetList(settle: Ref<number>, isFetch?: boolean) {
  if (isFetch === undefined)
    isFetch = true

  const { currentGlobalCurrency } = storeToRefs(useAppStore())

  const {
    list: _list,
    runAsync: runGetSportBetList,
    loading,
    total,
    page,
    page_size,
    next,
    prev,
  } = useList(ApiSportBetList, {
    onBefore() {
      _list.value = []
    },
  }, {
    page_size: 20,
  })

  const currentGlobalCurCode = computed(() => {
    return getCurrencyConfig(currentGlobalCurrency.value).cur
  })

  const sportBetList = computed<ISportsMyBetSlipItem[]>(() => {
    if (_list.value.length === 0)
      return []

    return _list.value
  })

  function fetch() {
    runGetSportBetList({
      kind: 'normal',
      cur: currentGlobalCurCode.value,
      settle: settle.value,
    })
  }

  if (isFetch) {
    fetch()

    watch([currentGlobalCurrency, settle], () => {
      fetch()
    })
  }

  return {
    sportBetList,
    loading,
    total,
    page,
    page_size,
    runGetSportBetList,
    next,
    prev,
  }
}
