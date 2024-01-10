import type {
  ISportEventInfoMl,
  ISportsInfo,
  TPat,
} from '~/apis/types'
import type { IBasePanelType, IBreadCrumbItem } from '~/types'

interface IBetObject {
/** 名称 */
  name: string
  /** 赔率 */
  odds: string
}

/** 列表类型 */
export interface IDataListItem {
  mlid: string
  /** 标题 */
  title: string
  /** 样式 */
  patType: TPat
  /** 样式1数据 */
  patType1BetList: IBetObject[]
  /** 样式2数据 */
  patType2BetMap: Record<string, IBetObject[]>
}

/**
 * @module src/composables/useApiSportsDetails.ts
 * @description 体育赛事详情接口
 */
export function useApiSportDetails() {
  const { t } = useI18n()
  /** 当前选中的Tab */
  const currentTab = ref<number>(-1)
  /** 搜索名称 */
  const searchName = ref<string>('')
  /** 请求次数，用来渲染Loading */
  const requestCount = ref<number>(0)
  const sportInfo = ref<ISportsInfo>()
  /** 页面倒计时 */
  const eventTime = ref('')

  const { runAsync: runGetSportInfo, loading } = useRequest(
    ApiSportEventInfo, {
      onSuccess: (res) => {
        if (res.list && res.list.length && res.status === 1)
          sportInfo.value = res

        requestCount.value++
      },
      onError: () => {
        requestCount.value++
      },
    },
  )

  /** 是不是关盘 */
  const isClose = computed<boolean>(() => {
    if (sportInfo.value?.status === 3)
      return true

    return false
  })

  /** 面包屑数据 */
  const breadcrumbData = computed<IBreadCrumbItem[]>(() => {
    const data: IBreadCrumbItem[] = []

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return []

    const list = sportInfo.value.list[0]
    data.push(
      {
        title: list.sn,
        path: `/sports/${getSportsPlatId()}/${list.si}`,
      },
      {
        title: list.pgn,
        // eslint-disable-next-line max-len
        path: `/sports/${getSportsPlatId()}/${list.si}/${list.pgid}?${application.objectToUrlParams({ sn: list.sn, pgn: list.pgn })}`,
      },
      {
        title: list.cn,
        // eslint-disable-next-line max-len
        path: `/sports/${getSportsPlatId()}/${list.si}/${list.pgid}/${list.ci}?${application.objectToUrlParams({ sn: list.sn, pgn: list.pgn, cn: list.cn })}`,
      },
      {
        title: `${list.htn} - ${list.atn}`,
        path: '',
      },
    )

    return data
  })

  /** 盘口标签列表数据 */
  const handicapListData = computed<ISelectOptionNumber[]>(() => {
    const data: ISelectOptionNumber[] = []

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return []

    const tgl = sportInfo.value.list[0].tgl || []

    tgl.forEach((item) => {
      data.push({
        label: item.tgn,
        value: item.tgi,
      })
    })

    return data
  })

  /** 是否是滚球 */
  const isOnAir = computed<boolean>(() => {
    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return false

    const list0 = sportInfo.value.list[0]

    return list0.m === 3
  })

  /** 赛事是否暂停 */
  const isPause = computed<boolean>(() => {
    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return false

    const list0 = sportInfo.value.list[0]

    return list0.rbts === 3
  })

  /**
   * 比赛进度
   */
  const pageTitle = computed(() => {
    if (
      false
    || !sportInfo.value
    || !sportInfo.value.list
    || !sportInfo.value.list.length
    )
      return ''

    const rbtd = sportInfo.value.list[0].rbtd
    const ed = sportInfo.value.list[0].ed
    if (isOnAir.value)
      return `${eventTime.value}@@${rbtd}`
    else if (isPause.value)
      return `${rbtd}`
    else
      return timeToCustomizeFormat(ed)
  })

  /** 基础数据面板 */
  const basePanelData = computed<IBasePanelType>(() => {
    const data: IBasePanelType = {
      startTime: '',
      homeTeamName: '',
      awayTeamName: '',
      remark: '',
      homeTeamScore: 0,
      awayTeamScore: 0,
      atpic: '',
      htpic: '',
      spic: '',
      si: 0,
      pol: {},
    }

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return data

    const list0 = sportInfo.value.list[0]
    const _map: IBasePanelType = {
      startTime: pageTitle.value,
      homeTeamName: list0.htn,
      awayTeamName: list0.atn,
      remark: '',
      homeTeamScore: list0.hp,
      awayTeamScore: list0.ap,
      atpic: list0.atpic,
      htpic: list0.htpic,
      spic: list0.spic,
      si: list0.si,
      pol: list0.pol,
    }

    return Object.assign(data, _map)
  })

  /** 数据列表 */
  const dataList = computed<ISportEventInfoMl[]>(() => {
    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return []

    const ml = sportInfo.value.list[0].ml || []

    // console.error('pat===4', ml.filter(item => item.pat === 4))

    /** 过滤出渲染的数据 */
    const _filter = ml.filter((item) => {
      return item.tgis.includes(currentTab.value) && item.btn.includes(searchName.value.trim())
    })

    /**
     * 遍历 _filter，将 item.ms 循环，把 sn 中{total}替换成 sp字段中的值
     *
     * sn: 大 {total},sp: "total=2.5" => 大 2.5
     * sn: 大 {total} 小 {xxxx},sp: "total=2.5&xxxx=3.5" => 大 2.5 小 3.5
     */
    _filter.forEach((_mlItem) => {
      const _ms = _mlItem.ms
      _ms.forEach((item) => {
        const _sn = item.sn
        const _spStr = item.sp
        if (_spStr) {
          const _spObject = application.urlParamsToObject(_spStr)
          const _spKeys = Object.keys(_spObject)

          _spKeys.forEach((key) => {
            const _value = _spObject[key]
            const _reg = new RegExp(`{${key}}`, 'g')
            item.sn = _sn.replace(_reg, _value)
          })
        }
      })
    })

    const renderList: ISportEventInfoMl[] = []
    for (let i = 0; i < _filter.length; i++) {
      const mlItem = _filter[i]
      if (mlItem.pat === 1 || mlItem.pat === 3) {
        // 组合购物车需要的数据
        const _infoList = sportInfo.value.list[0]
        for (let j = 0; j < mlItem.ms.length; j++) {
          const _ms = mlItem.ms[j]

          _ms.cartInfo = getCartObject(mlItem, _ms, _infoList)
        }

        renderList.push(mlItem)
      }
      else if (mlItem.pat === 2 || mlItem.pat === 4) {
        const _msObject = renderList.find(ii => ii?.btn === mlItem.btn)

        // 组合购物车需要的数据
        const _infoList = sportInfo.value.list[0]
        for (let j = 0; j < mlItem.ms.length; j++) {
          const _ms = mlItem.ms[j]
          _ms.cartInfo = getCartObject(_msObject || mlItem, _ms, _infoList)
        }

        if (_msObject) {
          _msObject.other.push(...mlItem.ms)
        }
        else {
          mlItem.other = [...mlItem.ms]
          renderList.push(mlItem)
        }
      }
      else if (mlItem.pat === 6) {
        const list0 = sportInfo.value.list[0]
        const homeTeamName = list0.htn
        const awayTeamName = list0.atn
        const titleList = [homeTeamName, t('equal_round'), awayTeamName]
        const msList = mlItem.ms
        const zList = []
        const pList = []
        const kList = []
        for (let j = 0; j < msList.length; j++) {
          msList[j].cartInfo = getCartObject(mlItem, msList[j], list0)

          if (msList[j].sn.includes('-')) {
            const snList = msList[j].sn.split('-')
            if (snList[0] > snList[1])
              zList.push(msList[j])

            else if (snList[0] < snList[1])
              kList.push(msList[j])

            else
              pList.push(msList[j])
          }
          else {
            pList.push(msList[j])
          }
        }

        mlItem.pat6 = {
          titleList,
          list: flatten(zip(zList, pList, kList)),
        }

        renderList.push(mlItem)
      }
    }

    return renderList
  })

  /** 背景图片 */
  const bgImage = computed<string>(() => {
    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return ''

    const list0 = sportInfo.value.list[0]

    return list0.sbgpic
  })

  function resetRequestCount() {
    requestCount.value = 0
  }

  function setEventTime() {
    if (
      false
    || !sportInfo.value
    || !sportInfo.value.list
    || !sportInfo.value.list.length
    )
      return false

    const rbtt = sportInfo.value.list[0].rbtt
    const ts = sportInfo.value.list[0].ts
    const si = sportInfo.value.list[0].si
    const rbts = sportInfo.value.list[0].rbts

    getSportsLiveTime(eventTime, {
      rbtt,
      ts,
      si,
      rbts,
    }, dayjs)
  }

  watch(handicapListData, (val, oVal) => {
    if (val.length !== oVal.length)
      currentTab.value = val[0].value
  })

  onMounted(() => {
    sportsListCountdownBus.on(setEventTime)
  })

  onBeforeUnmount(() => {
    sportsListCountdownBus.off(setEventTime)
  })

  return {
    dataList,
    breadcrumbData,
    handicapListData,
    basePanelData,
    currentTab,
    searchName,
    sportInfo,
    loading,
    requestCount,
    bgImage,
    isOnAir,
    isPause,
    runGetSportInfo,
    resetRequestCount,
  }
}
