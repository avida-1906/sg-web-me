import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CasinoProviderItem } from '~/apis/types'

export const useCasinoStore = defineStore('casino', () => {
  const { list: bigPlats } = useList(ApiMemberPlatformList, {
    manual: false,
  })
  /** 游戏提供商数据(PG,EVO,...) */
  const { list } = useList(ApiMemberPlatformVenueList, {
    manual: false,
  })
  const platformList = computed(() => {
    const arr: CasinoProviderItem[] = []
    for (let i = 0; i < list.value.length; i++) {
      if (!arr.find(a => a.venue_id === list.value[i].venue_id))
        arr.push(list.value[i])
    }
    return arr
  })
  // 厂商列表读取/member/game/cate?cid=5
  const { data: cateProviderData } = useRequest(() => ApiMemberGameCate({ cid: '5' }), { manual: false })

  const { data, runAsync: runAsyncGameLobby } = useRequest(ApiMemberGameLobby, { manual: false })

  const casinoNav = computed(() => {
    if (data.value) {
      if (data.value.navs) {
        data.value.navs.unshift({
          cid: 'all',
          name: data.value.name,
          ty: -1,
          platform_id: 'all',
          icon: data.value.icon,
          background: '',
        })
        return data.value.navs.map((a) => {
          return {
            ...a,
            label:
             a.name,
            value: a.ty === 1 ? a.cid : a.platform_id,
          }
        })
      }
      return null
    }
    return []
  })
  const casinoGameList = computed(() => {
    if (data.value && data.value.items) {
      return data.value.items.map(a => ({
        ...a,
        title: a.name,
        list: [],
        path: a.ty === 1
          ? `/casino/group/category?cid=${a.cid}&name=${a.name}`
          : `/casino/group/provider?pid=${a.platform_id}&name=${a.name}`,
        useCloudImg: true,
      }))
    }
    return []
  })
  const casinoSidebar = computed(() => {
    if (data.value && data.value.sidebars) {
      return data.value.sidebars.map(a => ({
        ...a,
        title: a.name,
        list: [],
        path: a.cid === '5'
          ? '/casino/collection/provider'
          : a.ty === 1
            ? `/casino/group/category?cid=${a.cid}&name=${a.name}`
            : `/casino/group/provider?pid=${a.platform_id}&name=${a.name}`,
        useCloudImg: true,
      }))
    }
    return []
  })

  function getBg(cid: string) {
    if (data.value) {
      const navs = data.value.navs ?? []
      const sidebars = data.value?.sidebars ?? []
      const arr = [...navs, ...sidebars]
      const str = arr.find(a => a.cid === cid)?.background ?? ''
      return str
    }
    return ''
  }

  return {
    bigPlats,
    allPlatformList: list,
    platformList,
    casinoNav,
    casinoGameList,
    casinoSidebar,
    cateProviderData,
    lobbyBdata: data,
    runAsyncGameLobby,
    getBg,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCasinoStore, import.meta.hot))
