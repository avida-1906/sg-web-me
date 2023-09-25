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
const isCasino = computed(() => props.gameType === GameType.casino)
const isSports = computed(() => props.gameType === GameType.sports)
const placeHolderText = computed(() => isCasino.value ? t('search_game') : t('search_events'))

const searchValue = ref('')
const { bool: isClear, setTrue: setClearTrue, setFalse: setClearFalse } = useBoolean(true)
// 近期搜索关键字
const recentKeyword = ref(Local.get<any[]>(STORAGE_RECENT_SEARCH_KEYWORDS)?.value ?? [])
const { data: casinoGamesData, run: runSearchCasinoGames } = useRequest(() => ApiMemberGameSearch({ w: searchValue.value }), {
  manual: true,
  debounceInterval: 1000,
  onAfter() {
    setClearFalse()
    recentKeyword.value.unshift(searchValue.value)
    recentKeyword.value = recentKeyword.value.slice(0, 5)
    Local.set(STORAGE_RECENT_SEARCH_KEYWORDS, recentKeyword.value)
  },
})
function onBaseSearchInput() {
  if (isCasino.value && searchValue.value.length >= 3)
    runSearchCasinoGames()
}
function onClickKeyword(k: string) {
  searchValue.value = k
  runSearchCasinoGames()
}
function onCloseKeyword(k: string) {
  recentKeyword.value.splice(recentKeyword.value.findIndex(t => t === k), 1)
  Local.set(STORAGE_RECENT_SEARCH_KEYWORDS, recentKeyword.value)
}
// 搜索结果
const resultData = computed(() => {
  if (isClear.value)
    return null
  if (isCasino.value && casinoGamesData.value && casinoGamesData.value.d)
    return casinoGamesData.value.d

  return null
})

// 搜索功能面板
const { bool: isShowOverlay, setTrue: setShowOverlayTrue, setFalse: setShowOverlayFalse } = useBoolean(false)
// 点开始禁止页面滚动
const dom = ref()
const isLocked = useScrollLock(dom)
function showOverlay() {
  setShowOverlayTrue()
  isLocked.value = true
}
function closeOverlay() {
  setShowOverlayFalse()
  isLocked.value = false
}

onMounted(() => {
  dom.value = document.getElementById('main-content-scrollable')
})
</script>

<template>
  <div class="app-game-search">
    <div v-if="isShowOverlay" class="overlay" @click.self="closeOverlay" />
    <div :class="{ 'input-focus': isShowOverlay }">
      <BaseSearch
        v-model="searchValue" :place-holder="placeHolderText" :clearable="isShowOverlay" @focus="showOverlay"
        @close="closeOverlay" @input="onBaseSearchInput" @clear="setClearTrue"
      />
    </div>

    <!-- 搜索功能面板  -->
    <div v-show="isShowOverlay" class="search-overlay">
      <div class="scroll-y warp">
        <div v-if="!resultData" class="no-result">
          <div class="text">
            <span v-show="searchValue.length < 3">{{ t('search_need_at_least_3_word') }}</span>
            <span v-show="searchValue.length >= 3">{{ t('search_no_result') }}</span>
          </div>
          <div v-if="recentKeyword.length" class="recent">
            <div class="title">
              <label>{{ t('search_recent') }}</label>
              <BaseButton type="text" font-size="14" @click="recentKeyword.length = 0">
                {{ t('search_clear') }}({{ recentKeyword.length }})
              </BaseButton>
            </div>
            <div class="list">
              <BaseTag v-for="t in recentKeyword" :key="t" :text="t" @click="onClickKeyword" @close="onCloseKeyword" />
            </div>
          </div>
        </div>

        <!-- casino -->
        <AppCardList v-if="isCasino && resultData" :list="resultData" />

        <!-- sports -->
        <AppSportsSearchResult v-if="isSports && resultData" />
      </div>
    </div>
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

  .search-overlay {
    width: 100%;
    background-color: var(--tg-secondary-dark);
    color: var(--tg-text-lightgrey);
    border-radius: var(--tg-radius-default);
    margin-top: 8px;
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
}
</style>
