<script setup lang='ts'>
const props = defineProps<Props>()
enum GameType {
  casino = '1',
  sports = '2',
}
interface Props {
  gameType: '1' | '2'
}
const { t } = useI18n()
const { bool: isClear, setTrue: setClearTrue } = useBoolean(true)
const {
  bool: isInputing, setTrue: setInputingTrue,
  setFalse: setInputingFalse,
} = useBoolean(false)
// 搜索功能面板
const { bool: isShowOverlay } = useBoolean(false)

const searchValue = ref('')
const keywordLive = ref(
  Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_LIVE)?.value ?? [],
)
const keywordSports = ref(
  Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_SPORTS)?.value ?? [],
)
const dom = ref()
const gameSearchRef = ref()
const searchOverlayStyle = ref({ left: 0, top: 0, width: 0 })
let gameSearchRefClient: any = null

const goodSearchValue = computed(() => searchValue.value.length >= 3)
const isCasino = computed(() => props.gameType === GameType.casino)
const isSports = computed(() => props.gameType === GameType.sports)
const placeHolderText = computed(() => {
  return isCasino.value ? t('search_game') : t('search_events')
})
// 近期搜索关键字
const keywordList = computed(() => {
  if (isCasino.value)
    return keywordLive.value
  else if (isSports.value)
    return keywordSports.value
  return []
})
// 娱乐城搜索接口
const {
  list: casinoGames,
  run: runSearchCasinoGames,
} = useList(ApiMemberGameSearch, {
  onSuccess(res, params) {
    if (res.d && res.d.length > 0) {
      const word = params[0].w
      isClear.value = false

      // 去重
      if (keywordLive.value.includes(word))
        keywordLive.value.splice(keywordLive.value.findIndex(t => t === word), 1)

      keywordLive.value.unshift(word)
      keywordLive.value = keywordLive.value.slice(0, 5)
      Local.set(STORAGE_SEARCH_KEYWORDS_LIVE, keywordLive.value)
    }
    setInputingFalse()
  },
})
// 体育搜索接口
const { data: sportsData, run: runSearchSports } = useRequest(
  () => ApiSportEventSearch({ word: searchValue.value }),
  {
    onSuccess(res) {
      if (res.list && res.list.length > 0) {
        const word = searchValue.value
        isClear.value = false

        // 去重
        if (keywordSports.value.includes(word))
          keywordSports.value.splice(keywordSports.value.findIndex(t => t === word), 1)

        keywordSports.value.unshift(word)
        keywordSports.value = keywordSports.value.slice(0, 5)
        Local.set(STORAGE_SEARCH_KEYWORDS_SPORTS, keywordSports.value)
      }
      setInputingFalse()
    },
  },
)
// 搜索结果
const resultData = computed(() => {
  if (isClear.value || !goodSearchValue.value)
    return null
  if (isCasino.value)
    return casinoGames.value.length > 0 ? casinoGames.value : null
  if (isSports.value && sportsData.value && sportsData.value.list)
    return sportsData.value.list

  return null
})

let inputTimer: any = null
function onBaseSearchInput() {
  setInputingTrue()
  clearTimeout(inputTimer)
  if (searchValue.value.length < 3) {
    setInputingFalse()
    setClearTrue()
    return
  }
  inputTimer = setTimeout(() => {
    if (isCasino.value && searchValue.value.length >= 3) {
      Local.set(STORAGE_CLEAR_LIVE, true)
      runSearchCasinoGames({ w: searchValue.value })
    }
    else if (isSports.value && searchValue.value.length >= 3) {
      Local.set(STORAGE_CLEAR_SPORTS, true)
      runSearchSports()
    }
    clearTimeout(inputTimer)
  }, 500)
}
function onClickKeyword(k: string) {
  setInputingTrue()
  searchValue.value = k
  if (isCasino.value)
    runSearchCasinoGames({ w: searchValue.value })
  else if (isSports.value)
    runSearchSports()
}
function onCloseKeyword(k: string) {
  if (isCasino.value) {
    keywordLive.value.splice(keywordLive.value.findIndex(t => t === k), 1)
    Local.set(STORAGE_SEARCH_KEYWORDS_LIVE, keywordLive.value)
  }
  else if (isSports.value) {
    keywordSports.value.splice(keywordSports.value.findIndex(t => t === k), 1)
    Local.set(STORAGE_SEARCH_KEYWORDS_SPORTS, keywordSports.value)
  }
}
function clearKeyword() {
  if (isCasino.value) {
    keywordLive.value.length = 0
    Local.remove(STORAGE_SEARCH_KEYWORDS_LIVE)
  }
  else if (isSports.value) {
    keywordSports.value.length = 0
    Local.remove(STORAGE_SEARCH_KEYWORDS_SPORTS)
  }
}
// 点开始禁止页面滚动
function showOverlay() {
  getSearchOverlayStyle()

  isShowOverlay.value = true
  dom.value.addEventListener('wheel', preventScroll)
}
function closeOverlay() {
  isShowOverlay.value = false
  dom.value.removeEventListener('wheel', preventScroll)
}
function preventScroll(event: any) {
  event.preventDefault()
}
// 获取搜索面板样式数据
function getSearchOverlayStyle() {
  gameSearchRefClient = gameSearchRef.value.getBoundingClientRect()
  searchOverlayStyle.value.left = gameSearchRefClient.left
  searchOverlayStyle.value.top = gameSearchRefClient.top
  searchOverlayStyle.value.width = gameSearchRefClient.width
  gameSearchRefClient = null
}
function windowResizeAdd() {
  window.addEventListener('resize', resizeCallBack)
}
function windowResizeRemove() {
  window.removeEventListener('resize', resizeCallBack)
}
function resizeCallBack() {
  getSearchOverlayStyle()
}
function intiKeyword() {
  if (!Local.get(STORAGE_CLEAR_LIVE)?.value) {
    const liveList = [
      'Monopoly',
      'Crazy Time',
      'Sweet Bonanza',
      'Money Train',
      'Reactoonz',
    ]
    Local.set(STORAGE_SEARCH_KEYWORDS_LIVE, liveList)
    keywordLive.value = liveList
  }

  if (!Local.get(STORAGE_CLEAR_SPORTS)?.value) {
    const sportsList = [
      'Liverpool FC',
      'Kansas City Chiefs',
      'Los Angeles Lakers',
      'FC Barcelona',
      'FC Bayern Munich',
    ]
    Local.set(STORAGE_SEARCH_KEYWORDS_SPORTS, sportsList)
    keywordSports.value = sportsList
  }
}

onMounted(() => {
  dom.value = document.getElementById('main-content-scrollable')
  windowResizeAdd()
})
onBeforeUnmount(() => {
  windowResizeRemove()
  closeOverlay()
})

intiKeyword()
provide('closeSearch', closeOverlay)
</script>

<template>
  <div ref="gameSearchRef" class="app-game-search">
    <div v-if="isShowOverlay" class="overlay" @click.self="closeOverlay" />
    <div :class="{ 'input-focus': isShowOverlay }">
      <BaseSearch
        v-model.trim="searchValue"
        :place-holder="placeHolderText"
        :clearable="isShowOverlay"
        @focus="showOverlay"
        @close="closeOverlay"
        @input="onBaseSearchInput"
        @clear="setClearTrue"
      />
    </div>

    <!-- 搜索功能面板  -->
    <teleport to="body">
      <div
        v-show="isShowOverlay" class="search-overlay" :style="{
          top: `${searchOverlayStyle.top + 51}px`,
          left: `${searchOverlayStyle.left}px`,
          width: `${searchOverlayStyle.width}px`,
        }"
      >
        <div class="scroll-y warp">
          <div v-if="!resultData && !isInputing" class="no-result">
            <div class="no-result-label">
              <span
                v-show="searchValue.length < 3"
              >
                {{ t('search_need_at_least_3_word') }}</span>
              <span
                v-show="searchValue.length >= 3"
              >{{ t('search_no_result') }}</span>
            </div>
            <div v-if="keywordList.length" class="recent">
              <div class="title">
                <label>{{ t('search_recent') }}</label>
                <BaseButton
                  type="text" size="none"
                  style="--tg-base-button-font-size:14px;" @click="clearKeyword"
                >
                  {{ t('search_clear') }} ({{ keywordList.length }})
                </BaseButton>
              </div>
              <div class="list">
                <BaseTag
                  v-for="text in keywordList"
                  :key="text"
                  :text="text"
                  @click="onClickKeyword"
                  @close="onCloseKeyword"
                />
              </div>
            </div>
          </div>

          <!-- casino -->
          <AppCardListSkeleton v-if="isInputing && isCasino" />
          <AppCardList
            v-if="isCasino && resultData && !isInputing " :list="resultData"
          />

          <!-- sports -->
          <AppSportsSearchResultSkeleton v-if="isInputing && isSports" />
          <AppSportsSearchResult
            v-if="isSports && resultData && !isInputing " :data="sportsData"
          />
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang='scss' scoped>
.app-game-search {
  position: relative;

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #{rgba($color: var(--tg-color-blue-rgb), $alpha: 0.7)};
    z-index: 1450;
  }

  .input-focus {
    position: relative;
    z-index: 1450;
  }

}

.search-overlay {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  color: var(--tg-text-lightgrey);
  border-radius: var(--tg-radius-default);
  position: absolute;
  z-index: 1450;

  .warp {
    max-height: 400px;
    padding: var(--tg-spacing-16);
  }

  .no-result {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-32);
    font-size: var(--tg-font-size-default);

    .no-result-label {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: var(--tg-spacing-8);
      gap: var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
      line-height: 1.5;
    }

    .recent {
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-16);

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: var(--tg-font-weight-semibold);
        line-height: 1.5;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--tg-spacing-8);
        grid-row-gap: var(--tg-spacing-16);
      }
    }

  }
}
</style>
