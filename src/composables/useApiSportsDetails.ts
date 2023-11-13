import type { ISportEventInfo } from '~/apis/types'
import type { IBreadCrumbItem } from '~/types'

/** 面包屑类型 */
type IBreadcrumb = Pick<
  ISportEventInfo,
  'sn' | 'si' | 'pgn' | 'pgid' | 'cn' | 'ci' | 'htn' | 'hti' | 'atn' | 'ati'
>

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

  onMounted(() => {
    runGetSportInfo({ si, ei })
  })

  return {
    breadcrumbData,
  }
}
