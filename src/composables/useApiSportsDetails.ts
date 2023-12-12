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
      startTime: application.timestampToTime(list0.ed),
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
     */
    if (pol) {
      if (pol['3'] !== void 0 || pol['4'] !== void 0) {
        _map.redCard = {
          homeTeam: pol['3'] || 0,
          awayTeam: pol['4'] || 0,
        }
      }

      if (pol['5'] !== void 0 || pol['6'] !== void 0) {
        _map.yellowCard = {
          homeTeam: pol['5'] || 0,
          awayTeam: pol['6'] || 0,
        }
      }

      if (pol['7'] !== void 0 || pol['8'] !== void 0) {
        _map.corner = {
          homeTeam: pol['7'] || 0,
          awayTeam: pol['8'] || 0,
        }
      }

      // 半场数据
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

      // 第1-4节数据
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

      _map.period = [
        ..._h,
        ..._p,
      ]

      // 加时数据
      if (pol['21'] !== void 0 || pol['22'] !== void 0) {
        _map.overtime = {
          homeTeam: pol['21'] || 0,
          awayTeam: pol['22'] || 0,
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

  watch(handicapListData, (val, oVal) => {
    if (val.length !== oVal.length)
      currentTab.value = val[0].value
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
    runGetSportInfo,
    resetRequestCount,
  }
}
