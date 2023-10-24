import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCasinoStore = defineStore('casino', () => {
  const { data } = useRequest(ApiMemberGameLobby, { manual: false })
  const casinoNav = computed(() => {
    if (data.value) {
      data.value.navs.unshift({ cid: 'all', name: data.value.name, ty: 2, platform_id: 'all', icon: data.value.icon })
      return data.value.navs.map(a => ({ ...a, label: a.name, value: a.cid }))
    }
    return []
  })
  const casinoGameList = computed(() =>
    data.value
      ? data.value.items.map(a => ({ ...a, title: a.name, list: [], path: `/casino/group/category?cid=${a.cid}` }))
      : [])

  return {
    casinoNav,
    casinoGameList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowStore, import.meta.hot))
