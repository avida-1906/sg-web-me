import type {
  ISportEventInfoMl,
  ISportsInfo,
  TPat,
} from '~/apis/types'
import type { IBasePanelType, IBreadCrumbItem, PanelTypeItem } from '~/types'

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
      return `${eventTime.value} ${rbtd}`
    else if (isPause.value)
      return `${rbtd}`
    else
      return timeToFormat(ed)
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
    }

    const pol = list0.pol

    /**
     * 3 主队红牌
     * 4 客队红牌
     * 5 主队⻩牌
     * 6 客队⻩牌
     * 7 主队⾓球
     * 8 客队⾓球
     * 9 主队上半场⽐分——1H
     * 10 客队上半场⽐分——1H
     * 11 主队下半场⽐分——2H
     * 12 客队下半场⽐分——2H
     * 13 主队第⼀节⽐分——1st
     * 14 客队第⼀节⽐分——1st
     * 15 主队第⼆节⽐分——2nd
     * 16 客队第⼆节⽐分——2nd
     * 17 主队第三节⽐分——3rd
     * 18 客队第三节⽐分——3rd
     * 19 主队第四节⽐分——4th
     * 20 客队第四节⽐分——4th
     * 21 主队加时赛⽐分
     * 22 客队加时赛⽐分
     * 25,  // 第一盘 主队 网球, 排球
     * 26,  // 第一盘 客队 网球, 排球
      27,  // 第二盘 主队 网球, 排球
      28,  // 第二盘 客队 网球, 排球
      29,  // 第三盘 主队 网球, 排球
      30,  // 第三盘 客队 网球, 排球
      31,  // 第四盘 主队 网球, 排球
      32,  // 第四盘 客队 网球, 排球
      33,  // 第五盘 主队 网球, 排球
      34,  // 第五盘 客队 网球, 排球

      37,  // 第1局 主队 乒乓球
      38,  // 第1局 客队 乒乓球
      39,  // 第2局 主队 乒乓球
      40,  // 第2局 客队 乒乓球
      41,  // 第3局 主队 乒乓球
      42,  // 第3局 客队 乒乓球
      43,  // 第4局 主队 乒乓球
      44,  // 第4局 客队 乒乓球
      45,  // 第5局 主队 乒乓球
      46,  // 第5局 客队 乒乓球
      47,  // 第6局 主队 乒乓球
      48,  // 第6局 客队 乒乓球
      49,  // 第7局 主队 乒乓球
      50,  // 第7局 客队 乒乓球

      51,  // 第1局 主队 板球, 棒球
      52,  // 第1局 客队 板球, 棒球
      53,  // 第2局 主队 板球, 棒球
      54,  // 第2局 客队 板球, 棒球

      55,  // 加时 主队 板球
      56,  // 加时 客队 板球

      57,  // 第3局 主队 棒球
      58,  // 第3局 客队 棒球
      59,  // 第4局 主队 棒球
      60,  // 第4局 客队 棒球
      61,  // 第5局 主队 棒球
      62,  // 第5局 客队 棒球
      63,  // 第6局 主队 棒球
      64,  // 第6局 客队 棒球
      65,  // 第7局 主队 棒球
      66,  // 第7局 客队 棒球
      67,  // 第8局 主队 棒球
      68,  // 第8局 客队 棒球
      69,  // 第9局 主队 棒球
      70,  // 第9局 客队 棒球
      71,  // 加时局 主队 棒球
      72,  // 加时局 客队 棒球
     */
    if (pol) {
      _map.redCard = {
        homeTeam: pol['3'] || '-',
        awayTeam: pol['4'] || '-',
      }

      _map.yellowCard = {
        homeTeam: pol['5'] || '-',
        awayTeam: pol['6'] || '-',
      }

      _map.corner = {
        homeTeam: pol['7'] || '-',
        awayTeam: pol['8'] || '-',
      }

      // 半场数据 篮球
      const _h: PanelTypeItem[] = []
      if (pol['9'] !== void 0 || pol['10'] !== void 0) {
        _h.push({
          title: '1H',
          homeTeam: `${pol['9'] || 0}`,
          awayTeam: `${pol['10'] || 0}`,
        })
      }
      if (pol['11'] !== void 0 || pol['12'] !== void 0) {
        _h.push({
          title: '2H',
          homeTeam: `${pol['11'] || 0}`,
          awayTeam: `${pol['12'] || 0}`,
        })
      }
      // 第1-4节数据 篮球
      const _p: PanelTypeItem[] = []

      if (pol['13'] !== void 0 || pol['14'] !== void 0) {
        _p.push({
          title: '1st',
          homeTeam: `${pol['13'] || 0}`,
          awayTeam: `${pol['14'] || 0}`,
        })
      }

      if (pol['15'] !== void 0 || pol['16'] !== void 0) {
        _p.push({
          title: '2nd',
          homeTeam: `${pol['15'] || 0}`,
          awayTeam: `${pol['16'] || 0}`,
        })
      }

      if (pol['17'] !== void 0 || pol['18'] !== void 0) {
        _p.push({
          title: '3rd',
          homeTeam: `${pol['17'] || 0}`,
          awayTeam: `${pol['18'] || 0}`,
        })
      }

      if (pol['19'] !== void 0 || pol['20'] !== void 0) {
        _p.push({
          title: '4th',
          homeTeam: `${pol['19'] || 0}`,
          awayTeam: `${pol['20'] || 0}`,
        })
      }

      // 网球，排球
      if (pol['25'] !== void 0 || pol['26'] !== void 0) {
        _p.push({
          title: '1st',
          homeTeam: `${pol['25'] || 0}`,
          awayTeam: `${pol['26'] || 0}`,
        })
      }

      if (pol['27'] !== void 0 || pol['28'] !== void 0) {
        _p.push({
          title: '2nd',
          homeTeam: `${pol['27'] || 0}`,
          awayTeam: `${pol['28'] || 0}`,
        })
      }

      if (pol['29'] !== void 0 || pol['30'] !== void 0) {
        _p.push({
          title: '3rd',
          homeTeam: `${pol['29'] || 0}`,
          awayTeam: `${pol['30'] || 0}`,
        })
      }

      if (pol['31'] !== void 0 || pol['32'] !== void 0) {
        _p.push({
          title: '4th',
          homeTeam: `${pol['31'] || 0}`,
          awayTeam: `${pol['32'] || 0}`,
        })
      }

      if (pol['33'] !== void 0 || pol['34'] !== void 0) {
        _p.push({
          title: '5th',
          homeTeam: `${pol['33'] || 0}`,
          awayTeam: `${pol['34'] || 0}`,
        })
      }

      // 乒乓球
      if (pol['37'] !== void 0 || pol['38'] !== void 0) {
        _p.push({
          title: '1st',
          homeTeam: `${pol['37'] || 0}`,
          awayTeam: `${pol['38'] || 0}`,
        })
      }

      if (pol['39'] !== void 0 || pol['40'] !== void 0) {
        _p.push({
          title: '2nd',
          homeTeam: `${pol['39'] || 0}`,
          awayTeam: `${pol['40'] || 0}`,
        })
      }

      if (pol['41'] !== void 0 || pol['42'] !== void 0) {
        _p.push({
          title: '3rd',
          homeTeam: `${pol['41'] || 0}`,
          awayTeam: `${pol['42'] || 0}`,
        })
      }

      if (pol['43'] !== void 0 || pol['44'] !== void 0) {
        _p.push({
          title: '4th',
          homeTeam: `${pol['43'] || 0}`,
          awayTeam: `${pol['44'] || 0}`,
        })
      }

      if (pol['45'] !== void 0 || pol['46'] !== void 0) {
        _p.push({
          title: '5th',
          homeTeam: `${pol['45'] || 0}`,
          awayTeam: `${pol['46'] || 0}`,
        })
      }

      if (pol['47'] !== void 0 || pol['48'] !== void 0) {
        _p.push({
          title: '6th',
          homeTeam: `${pol['47'] || 0}`,
          awayTeam: `${pol['48'] || 0}`,
        })
      }

      if (pol['49'] !== void 0 || pol['50'] !== void 0) {
        _p.push({
          title: '7th',
          homeTeam: `${pol['49'] || 0}`,
          awayTeam: `${pol['50'] || 0}`,
        })
      }

      // 板球
      if (pol['51'] !== void 0 || pol['52'] !== void 0) {
        _p.push({
          title: '1st',
          homeTeam: `${pol['51'] || 0}`,
          awayTeam: `${pol['52'] || 0}`,
        })
      }

      if (pol['53'] !== void 0 || pol['54'] !== void 0) {
        _p.push({
          title: '2nd',
          homeTeam: `${pol['53'] || 0}`,
          awayTeam: `${pol['54'] || 0}`,
        })
      }

      // 棒球
      if (pol['57'] !== void 0 || pol['58'] !== void 0) {
        _p.push({
          title: '3rd',
          homeTeam: `${pol['57'] || 0}`,
          awayTeam: `${pol['58'] || 0}`,
        })
      }

      if (pol['59'] !== void 0 || pol['60'] !== void 0) {
        _p.push({
          title: '4th',
          homeTeam: `${pol['59'] || 0}`,
          awayTeam: `${pol['60'] || 0}`,
        })
      }

      if (pol['61'] !== void 0 || pol['62'] !== void 0) {
        _p.push({
          title: '5th',
          homeTeam: `${pol['61'] || 0}`,
          awayTeam: `${pol['62'] || 0}`,
        })
      }

      if (pol['63'] !== void 0 || pol['64'] !== void 0) {
        _p.push({
          title: '6th',
          homeTeam: `${pol['63'] || 0}`,
          awayTeam: `${pol['64'] || 0}`,
        })
      }

      if (pol['65'] !== void 0 || pol['66'] !== void 0) {
        _p.push({
          title: '7th',
          homeTeam: `${pol['65'] || 0}`,
          awayTeam: `${pol['66'] || 0}`,
        })
      }

      if (pol['67'] !== void 0 || pol['68'] !== void 0) {
        _p.push({
          title: '8th',
          homeTeam: `${pol['67'] || 0}`,
          awayTeam: `${pol['68'] || 0}`,
        })
      }

      if (pol['69'] !== void 0 || pol['70'] !== void 0) {
        _p.push({
          title: '9th',
          homeTeam: `${pol['69'] || 0}`,
          awayTeam: `${pol['70'] || 0}`,
        })
      }

      _map.period = [
        ..._h,
        ..._p,
      ]

      // 加时数据
      if (pol['21'] !== void 0 || pol['22'] !== void 0) {
        // 篮球
        _map.overtime = {
          homeTeam: pol['21'] || 0,
          awayTeam: pol['22'] || 0,
        }
      }
      else if (pol['55'] !== void 0 || pol['56'] !== void 0) {
        // 板球
        _map.overtime = {
          homeTeam: pol['55'] || 0,
          awayTeam: pol['56'] || 0,
        }
      }
      else if (pol['71'] !== void 0 || pol['72'] !== void 0) {
        // 棒球
        _map.overtime = {
          homeTeam: pol['71'] || 0,
          awayTeam: pol['72'] || 0,
        }
      }
    }

    Object.assign(data, _map)

    return data
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
    })
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
