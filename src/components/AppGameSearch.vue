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
const { bool: isInputing, setTrue: setInputingTrue } = useBoolean(false)
// 搜索功能面板
const { bool: isShowOverlay } = useBoolean(false)

const searchValue = ref('')
const keywordLive = ref(Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_LIVE)?.value ?? [])
const keywordSports = ref(Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_SPORTS)?.value ?? [])
const dom = ref()
const gameSearchRef = ref()
const searchOverlayStyle = ref({ left: 0, top: 0, width: 0 })
useResizeObserver(gameSearchRef, (entries) => {
  const entry = entries[0]
  searchOverlayStyle.value.width = entry.contentRect.width

  const obj = gameSearchRef.value.getBoundingClientRect()
  searchOverlayStyle.value.left = obj.left
  searchOverlayStyle.value.top = obj.top
})

const isCasino = computed(() => props.gameType === GameType.casino)
const isSports = computed(() => props.gameType === GameType.sports)
const placeHolderText = computed(() => isCasino.value ? t('search_game') : t('search_events'))
// 近期搜索关键字
const keywordList = computed(() => {
  if (isCasino.value)
    return keywordLive.value
  else if (isSports.value)
    return keywordSports.value
  return []
})
const { list: casinoGames, run: runSearchCasinoGames } = useList(ApiMemberGameSearch, {
  debounceInterval: 500,
  onAfter(params) {
    const word = params[0].w
    isClear.value = false
    isInputing.value = false

    // 去重
    if (keywordLive.value.includes(word))
      keywordLive.value.splice(keywordLive.value.findIndex(t => t === word), 1)

    keywordLive.value.unshift(word)
    keywordLive.value = keywordLive.value.slice(0, 5)
    Local.set(STORAGE_SEARCH_KEYWORDS_LIVE, keywordLive.value)
  },
})
// 搜索结果
const resultData = computed(() => {
  if (isClear.value)
    return null
  if (isCasino.value)
    return casinoGames.value

  return null
})

function onBaseSearchInput() {
  if (searchValue.value.length < 3)
    return setClearTrue()
  if (isCasino.value && searchValue.value.length >= 3) {
    setInputingTrue()
    runSearchCasinoGames({ w: searchValue.value })
  }
}
function onClickKeyword(k: string) {
  setInputingTrue()
  searchValue.value = k
  runSearchCasinoGames({ w: searchValue.value })
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
  const obj = gameSearchRef.value.getBoundingClientRect()
  searchOverlayStyle.value.left = obj.left
  searchOverlayStyle.value.top = obj.top

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

onMounted(() => {
  dom.value = document.getElementById('main-content-scrollable')
})
</script>

<template>
  <div ref="gameSearchRef" class="app-game-search">
    <div v-if="isShowOverlay" class="overlay" @click.self="closeOverlay" />
    <div :class="{ 'input-focus': isShowOverlay }">
      <BaseSearch
        v-model.trim="searchValue" :place-holder="placeHolderText" :clearable="isShowOverlay"
        @focus="showOverlay" @close="closeOverlay" @input="onBaseSearchInput" @clear="setClearTrue"
      />
    </div>

    <!-- 搜索功能面板  -->
    <teleport to="body">
      <div
        v-show="isShowOverlay" class="search-overlay" :style="{
          top: `${searchOverlayStyle.top + 48}px`,
          left: `${searchOverlayStyle.left}px`,
          width: `${searchOverlayStyle.width}px`,
        }"
      >
        <div class="scroll-y warp">
          <div v-if="!resultData" class="no-result">
            <div class="text">
              <span v-show="searchValue.length < 3">{{ t('search_need_at_least_3_word') }}</span>
              <span v-show="searchValue.length >= 3 && !isInputing">{{ t('search_no_result') }}</span>
            </div>
            <div v-if="keywordList.length" class="recent">
              <div class="title">
                <label>{{ t('search_recent') }}</label>
                <BaseButton type="text" font-size="14" @click="clearKeyword">
                  {{ t('search_clear') }}({{ keywordList.length }})
                </BaseButton>
              </div>
              <div class="list">
                <BaseTag
                  v-for="text in keywordList" :key="text" :text="text" @click="onClickKeyword"
                  @close="onCloseKeyword"
                />
              </div>
            </div>
          </div>

          <!-- casino -->
          <AppCardList v-if="isCasino && resultData" :list="resultData" />

          <!-- sports -->
          <AppSportsSearchResult v-if="isSports && resultData" />
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

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: var(--tg-spacing-8);
      gap: var(--tg-spacing-8);
    }

    .recent {
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-16);

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--tg-spacing-8);
        grid-row-gap: var(--tg-spacing-16);
      }
    }

  }

  .result-casino {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 5px;
  }
}
</style>
