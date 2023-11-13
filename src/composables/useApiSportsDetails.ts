import type { TPat } from '~/apis/types'
import type { IBasePanelType, IBreadCrumbItem } from '~/types'

/** 列表类型 */
export interface IDataListItem {
  /** 标题 */
  title: string
  /** 样式 */
  patType: TPat
  /** 数据 */
  betList: {
    /** 名称 */
    name: string
    /** 赔率 */
    odds: string
  }[]
}

/**
 * @module src/composables/useApiSportsDetails.ts
 * @description 体育赛事详情接口
 * @param si 球种ID
 * @param ei 赛事ID
 */
export function useApiSportDetails(si: number, ei: string) {
  const { data: sportInfo, run: runGetSportInfo } = useRequest(ApiSportEventInfo)

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

    console.error(sportInfo.value.list[0].ed)
    Object.assign(data, _map)

    return data
  })

  /** 数据列表 */
  const dataList = computed<IDataListItem[]>(() => {
    const data: IDataListItem[] = []

    if (
      false
      || !sportInfo.value
      || !sportInfo.value.list
      || !sportInfo.value.list.length
    )
      return []

    const ml = sportInfo.value.list[0].ml || []

    ml.forEach((item) => {
      const betList = item.ms || []
      const patType = item.pat
      const betListData = betList.map((bet) => {
        return {
          name: bet.sn,
          odds: bet.ov,
        }
      })

      data.push({
        patType,
        title: item.btn,
        betList: betListData,
      })
    })

    return data
  })

  onMounted(() => {
    runGetSportInfo({ si, ei })
  })

  return {
    dataList,
    breadcrumbData,
    handicapListData,
    basePanelData,
  }
}
