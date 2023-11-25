import type {
  ISportEventInfoMl,
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
  /** 当前选中的Tab */
  const currentTab = ref<number>(-1)
  /** 搜索名称 */
  const searchName = ref<string>('')

  const { data: sportInfo, runAsync: runGetSportInfo, loading } = useRequest(ApiSportEventInfo)

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
        path: `/sports/${getSportsPlatId()}/${list.si}/${list.pgid}`,
      },
      {
        title: list.cn,
        path: `/sports/${getSportsPlatId()}/${list.si}/${list.pgid}/${list.ci}`,
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
     */
    if (pol) {
      if (pol['3'] !== undefined || pol['4'] !== undefined) {
        _map.redCard = {
          homeTeam: pol['3'] || 0,
          awayTeam: pol['4'] || 0,
        }
      }

      if (pol['5'] !== undefined || pol['6'] !== undefined) {
        _map.yellowCard = {
          homeTeam: pol['5'] || 0,
          awayTeam: pol['6'] || 0,
        }
      }

      if (pol['7'] !== undefined || pol['8'] !== undefined) {
        _map.corner = {
          homeTeam: pol['7'] || 0,
          awayTeam: pol['8'] || 0,
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

    const renderList: ISportEventInfoMl[] = []
    for (let i = 0; i < _filter.length; i++) {
      const item = _filter[i]
      if (item.pat === 1 || item.pat === 3) {
        // 组合购物车需要的数据
        const _infoList = sportInfo.value.list[0]
        for (let j = 0; j < item.ms.length; j++) {
          const _ms = item.ms[j]
          _ms.cartInfo = getCartObject(item, _ms, _infoList)
        }

        renderList.push(item)
      }
      else if (item.pat === 2 || item.pat === 4) {
        const _msObject = renderList.find(ii => ii?.btn === item.btn)

        // 组合购物车需要的数据
        const _infoList = sportInfo.value.list[0]
        for (let j = 0; j < item.ms.length; j++) {
          const _ms = item.ms[j]
          _ms.cartInfo = getCartObject(_msObject || item, _ms, _infoList)
        }

        if (_msObject) {
          _msObject.other.push(...item.ms)
        }
        else {
          item.other = [...item.ms]
          renderList.push(item)
        }
      }
    }

    return renderList
  })

  watchEffect(() => {
    if (handicapListData.value.length)
      currentTab.value = handicapListData.value[0].value
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
    runGetSportInfo,
  }
}
