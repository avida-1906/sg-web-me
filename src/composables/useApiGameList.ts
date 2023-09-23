interface GameListQuery1 {
  page: number
  pageSize: number
  params: {
    [q: string]: any
  }
}
interface GameListQuery {
  page: number
  page_size: number
  game_type?: 1 | 3 // 游戏类型:1=真人,3=电子
  is_hot?: 1 | 2 // 是否热门 1是 2否
  is_new?: 1 | 2 // 是否新游戏 1是 2否
  tag_id?: number // 游戏标签
  platform_id?: string // 场馆id（evo真人）（需要转成字符串）
}
interface GameItem {
  id: string
  platform_id: string
  name: string
  en_name: string
  pt_name: string
  th_name: string
  vn_name: string
  client_type: string
  game_type: number
  game_id: string
  img: string
  online: number
  is_hot: number
  sorting: number
  created_at: number
  is_new: number
  tag_id: string
  is_fav: number
}

export function useApiGameList(query: GameListQuery) {
  // const list = ref<GameItem[]>([])
  // const { data, run, loading } = useRequest((_query: GameListQuery) => ApiMemberGameList({ ..._query }), {
  //   manual: true,
  //   onSuccess(res, params) {
  //     const _params = params[0]
  //     if (res.d) {
  //       //  TODO:待删
  //       res.d = res.d.map((item) => {
  //         const name = application.getBackendLanguageField(item, 'name')
  //         return { ...item, name, img: 'https://mediumrare.imgix.net/c984a0f6625efd5a38c306697845c7bedcc917e2c061b45e8a75a5e648057e8a?&dpr=2&format=auto&auto=format&q=50&w=167' }
  //       })

  //       if (_params.page === 1) {
  //         list.value = res.d
  //       }
  //       else {
  //         const arr = cloneDeep(list.value)
  //         list.value = [...arr, ...res.d]
  //       }
  //     }
  //   },
  // })
  const { data, page, page_size, run } = usePage((page, page_size) => () => ApiMemberGameList({
    page: page.value,
    page_size: page_size.value,
  //  {...query}
  }))
  // const total = computed(() => data.value?.t ?? 0)
  // const finished = computed(() => data.value?.d && list.value.length >= total.value)

  // run(query)

  return { data, page, page_size, run }
}

// TODO:待删
export function useGameList(query: GameListQuery1 = { page: 1, pageSize: 20, params: {} }) {
  console.log('查询参数：', query)
  const gameInfo = { id: 2, url: 'https://mediumrare.imgix.net/d51d84f1074e5b54c25c54e6cbf026a4e352c491e7a574d3da6504743d71e2d6?&dpr=2&format=auto&auto=format&q=50&w=167', name: 'plynko' }
  const gameList = Array(66).fill(gameInfo)
  const gameProviders = [
    { id: '0', src: 'https://mediumrare.imgix.net/be6c453a8f450c2fbf5181abc844f080b537458061aeca3902575510acacdbea?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', src: 'https://mediumrare.imgix.net/fffebb8ad954c1fdcaca444cf83308ef0226ea06f8aa7a8d0a4e5f50c1d433c7?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', src: 'https://mediumrare.imgix.net/22312812dc37b6e91ba3534d88abb3e92599818d8b7adb5fec4f43353d9485fa?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', src: 'https://mediumrare.imgix.net/49a2201353bd06c3f89a9c5ff56d0efee785712e77786d4200d6fbc4ffc0e73d?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', src: 'https://mediumrare.imgix.net/bbe0383f83f2e71badab4b10933267b48ea655c522873a74ca22059d36b44220?&dpr=2&format=auto&auto=format&q=50' },
  ]
  return {
    gameList,
    gameProviders,
  }
}
