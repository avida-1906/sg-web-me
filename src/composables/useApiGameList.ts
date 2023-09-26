interface GameListQuery {
  page: number
  pageSize: number
  params: {
    [q: string]: any
  }
}

// TODO:待删
export function useGameList(query: GameListQuery = { page: 1, pageSize: 20, params: {} }) {
  const gameInfo = { id: 2, url: 'https://mediumrare.imgix.net/d51d84f1074e5b54c25c54e6cbf026a4e352c491e7a574d3da6504743d71e2d6?&dpr=2&format=auto&auto=format&q=50&w=167', name: 'plynko' }
  const gameList = Array(66).fill(gameInfo)
  const gameProviders = [
    { id: '0', name: 'xxxg', src: 'https://mediumrare.imgix.net/be6c453a8f450c2fbf5181abc844f080b537458061aeca3902575510acacdbea?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', name: 'xxxh', src: 'https://mediumrare.imgix.net/fffebb8ad954c1fdcaca444cf83308ef0226ea06f8aa7a8d0a4e5f50c1d433c7?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', name: 'xxxj', src: 'https://mediumrare.imgix.net/22312812dc37b6e91ba3534d88abb3e92599818d8b7adb5fec4f43353d9485fa?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', name: 'xxxk', src: 'https://mediumrare.imgix.net/49a2201353bd06c3f89a9c5ff56d0efee785712e77786d4200d6fbc4ffc0e73d?&dpr=2&format=auto&auto=format&q=50' },
    { id: '0', name: 'xxxl', src: 'https://mediumrare.imgix.net/bbe0383f83f2e71badab4b10933267b48ea655c522873a74ca22059d36b44220?&dpr=2&format=auto&auto=format&q=50' },
  ]
  return {
    gameList,
    gameProviders,
  }
}
