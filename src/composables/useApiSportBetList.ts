import type { ISportsMyBetSlipItem } from '~/apis/types'

/**
 * 获取体育投注记录
 */
export function useApiSportBetList(
  settle: Ref<number>,
  isFetch?: boolean,
  noWatch?: boolean,
  afterCb?: () => void,
) {
  if (isFetch === void 0)
    isFetch = true

  if (noWatch === void 0)
    noWatch = false

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
    onAfter() {
      afterCb && afterCb()
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

  /** 未结算total */
  const totalUnsettled = computed(() => {
    if (_list.value.length === 0 || settle.value === 1)
      return 0

    return total.value
  })

  function fetch() {
    return new Promise((resolve) => {
      runGetSportBetList({
        cur: currentGlobalCurCode.value,
        settle: settle.value,
      }).finally(() => {
        resolve(true)
      })
    })
  }

  if (isFetch)
    fetch()

  if (!noWatch) {
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
    totalUnsettled,
    runGetSportBetList,
    next,
    prev,
    fetch,
  }
}
