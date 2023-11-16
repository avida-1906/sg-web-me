import type { TPat } from '~/apis/types'
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

  const { data: sportInfo, runAsync: runGetSportInfo } = useRequest(ApiSportEventInfo)

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
        path: `/sports/${SPORTS_PLAT_ID}/${list.si}`,
      },
      {
        title: list.pgn,
        path: `/sports/${SPORTS_PLAT_ID}/${list.si}/${list.pgid}`,
      },
      {
        title: list.cn,
        path: `/sports/${SPORTS_PLAT_ID}/${list.si}/${list.pgid}/${list.ci}`,
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
    }

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return data

    const _map: IBasePanelType = {
      startTime: application.timestampToTime(sportInfo.value.list[0].ed),
      homeTeamName: sportInfo.value.list[0].htn,
      awayTeamName: sportInfo.value.list[0].atn,
      remark: '',
      homeTeamScore: sportInfo.value.list[0].hp,
      awayTeamScore: sportInfo.value.list[0].ap,
    }

    const pol = sportInfo.value.list[0].pol

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
  const dataList = computed<IDataListItem[]>(() => {
    let data: IDataListItem[] = []

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return []

    const ml = sportInfo.value.list[0].ml || []

    console.error(ml.filter(item => item.pat === 2))

    data = ml.filter((item) => {
      return item.tgis.includes(currentTab.value) && item.btn.includes(searchName.value.trim())
    }).map((item) => {
      const betList = item.ms || []
      const patType = item.pat

      const patType1BetList = betList.map((bet) => {
        return {
          name: bet.sn,
          odds: bet.ov,
        }
      })

      betList.forEach((bet) => {
        const sp = bet.sp || ''
        const totalValue = sp.split('=')[1]

        if (totalValue)
          bet.sn = bet.sn.replace('{total}', totalValue)
      })

      // 按照 sn字段 分组
      const snGroup = betList.reduce((prev, cur) => {
        const sn = cur.sn
        const odds = cur.ov
        const snGroup = prev[sn] || []

        snGroup.push({
          name: sn,
          odds,
        })

        prev[sn] = snGroup

        return prev
      }, {} as Record<string, IBetObject[]>)

      return {
        mlid: item.mlid,
        patType,
        title: item.btn,
        patType1BetList,
        patType2BetMap: snGroup,
      }
    })

    return data
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
    runGetSportInfo,
  }
}
