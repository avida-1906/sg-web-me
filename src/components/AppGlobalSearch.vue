<script setup lang='ts'>
const props = defineProps<{
  autoFocus?: boolean
}>()

const emit = defineEmits(['gameTypeChange', 'close'])
const { isMobile } = storeToRefs(useWindowStore())
const { leftIsExpand } = useLeftSidebar()
const { t } = useI18n()
const route = useRoute()
const { bool: isPopperShow, setTrue, setFalse } = useBoolean(false)
const {
  bool: isShowOverlay,
  setTrue: showOverlayTrue,
  setFalse: showOverlayFalse,
} = useBoolean(false)
const { bool: isClear, setTrue: setClearTrue } = useBoolean(true)
const {
  bool: isInputing, setTrue: setInputingTrue,
  setFalse: setInputingFalse,
} = useBoolean(false)
const initCasino = route.name?.toString().includes('casino')
const initSports = route.name?.toString().includes('sports')
const initOthers = !initCasino && !initSports
const {
  bool: isShowTypeSelect,
  setTrue: showTypeSelect,
  setFalse: hideTypeSelect,
} = useBoolean(!initOthers)

// 搜索栏
const gameType = ref(initCasino ? '1' : initSports ? '2' : '1')
const gameTypeList = [
  { label: t('casino'), value: '1' },
  { label: t('sports'), value: '2' },
]
const searchValue = ref('')
const baseSearchRef = ref()
// 近期搜索关键字
const keywordLive = ref(
  Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_LIVE)?.value ?? [],
)
const keywordSports = ref(
  Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_SPORTS)?.value ?? [],
)

const gameLabel = computed(() => {
  return gameTypeList.find(a => a.value === gameType.value)?.label ?? '-'
})
const goodSearchValue = computed(() => searchValue.value.length >= 3)
const isCasino = computed(() => gameType.value === '1')
const isSports = computed(() => gameType.value === '2')
const keywordList = computed(() => {
  if (isCasino.value)
    return keywordLive.value
  else if (isSports.value)
    return keywordSports.value
  return []
})
const searchPlaceholder = computed(() => isCasino.value
  ? t('search_game')
  : t('search_events'))
// 娱乐城搜索接口
const {
  list: casinoGames,
  run: runSearchCasinoGames,
} = useList(ApiMemberGameSearch, {
  // debounceInterval: 500,
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
    // debounceInterval: 500,
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
function selectGameType(v: string) {
  gameType.value = v
  emit('gameTypeChange', v)
}
function clearKeyword() {
  if (isCasino.value) {
    Local.set(STORAGE_CLEAR_LIVE, true)
    keywordLive.value.length = 0
    Local.remove(STORAGE_SEARCH_KEYWORDS_LIVE)
  }
  else if (isSports.value) {
    Local.set(STORAGE_CLEAR_SPORTS, true)
    keywordSports.value.length = 0
    Local.remove(STORAGE_SEARCH_KEYWORDS_SPORTS)
  }
}
function handleFocus() {
  showOverlayTrue()
  showTypeSelect()
}
// 关闭方法
function emitClose() {
  searchValue.value = ''
  showOverlayFalse()
  initOthers && hideTypeSelect()
  if (!isMobile.value)
    emit('close')
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

provide('closeSearch', emitClose)
provide('closeSearchH5', () => leftIsExpand.value = !leftIsExpand.value)

onMounted(() => {
  if (props.autoFocus)
    baseSearchRef.value.manualFocus()
  useFixedTop('.app-global-search')
})

intiKeyword()
</script>

<template>
  <div class="app-global-search" :class="{ 'in-pc': !isMobile }">
    <div v-show="!isMobile" class="overlay" @click="emitClose" />
    <BaseSearch
      ref="baseSearchRef"
      v-model.trim="searchValue"
      class="search-input"
      :place-holder="searchPlaceholder"
      :clearable="isShowOverlay || searchValue.length > 0"
      @focus="handleFocus"
      @clear="setClearTrue"
      @close="emitClose"
      @input="onBaseSearchInput"
    >
      <template v-if="isShowTypeSelect" #left>
        <VDropdown
          :distance="6"
          @show="setTrue()" @hide="setFalse"
        >
          <button class="tips">
            <span>{{ gameLabel }}</span>
            <BaseIcon
              name="uni-arrow-down"
              :class="{
                'rotate-180': isPopperShow,
              }"
            />
          </button>
          <template #popper="{ hide }">
            <!-- :class="{ 'active-menu': gameType === type.value }" -->
            <a
              v-for="type, i in gameTypeList" :key="i"
              class="popper-option"
              @click="hide();selectGameType(type.value)"
            >
              {{ type.label }}
            </a>
          </template>
        </VDropdown>
      </template>
    </BaseSearch>

    <!-- 搜索功能面板  -->
    <div
      v-show="isShowOverlay || !isMobile"
      class="search-overlay"
      @click.self="showOverlayFalse();initOthers && hideTypeSelect()"
    >
      <div class="scroll-y warp">
        <div v-if="!resultData && !isInputing" class="no-result">
          <div class="no-result-label">
            <span
              v-show="searchValue.length < 3"
            >{{ t('search_need_at_least_3_word') }}</span>
            <span
              v-show="searchValue.length >= 3"
            >{{ t('search_no_result') }}</span>
          </div>
          <div v-if="keywordList.length" class="recent">
            <div class="title">
              <label>{{ t('search_recent') }}</label>
              <BaseButton
                type="text" style="--tg-base-button-font-size:14px"
                size="none" @click="clearKeyword"
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
          v-if="isCasino && resultData && !isInputing" :list="resultData"
        />

        <!-- sports -->
        <AppSportsSearchResultSkeleton v-if="isInputing && isSports" />
        <AppSportsSearchResult
          v-if="isSports && resultData && !isInputing" :data="sportsData"
        />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-global-search {
  margin: var(--tg-spacing-16);
  width: auto;
  font-size: var(--tg-font-size-default);
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #{rgba($color: var(--tg-color-blue-rgb), $alpha: 0.7)};
  z-index: 999;
}

.tips {
  display: flex;
  align-items: center;
  color: var(--tg-text-white);
  font-weight: var(--tg-font-weight-semibold);
  // --tg-icon-color: var(--tg-text-white);

  svg {
    font-size: var(--tg-font-size-default);
  }

  span {
    margin-right: var(--tg-spacing-8);
  }

  &:active {
    transform: scale(0.96);
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
}

.popper-option {
  cursor: pointer;
  padding:
  var(--tg-spacing-button-padding-vertical-xs)
  var(--tg-spacing-button-padding-horizontal-xs);
  font-size: var(--tg-font-size-default);
  display: block;
  font-weight: var(--tg-font-weight-semibold);

  &.active-menu {
    color: var(--tg-text-blue);
  }

  &:hover {
    // background-color: var(--tg-text-lightgrey);
  }
}

.search-overlay {
  width: 100%;
  height: 100%;
  background-color: var(--tg-secondary-dark);
  color: var(--tg-text-lightgrey);
  position: absolute;
  left: 0;
  top: 72px;
  z-index: 1450;

  .warp {
    max-height: 400px;
    padding: var(--tg-spacing-8) var(--tg-spacing-16) var(--tg-spacing-24);
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

  .result-casino {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 5px;
  }
}

.in-pc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 ;
  max-width: 1200px;
  margin-top: 58px;

  .search-input {
    position: relative;
    z-index: 1450;
  }

  .search-overlay {
    height: auto;
    position: relative;
    border-radius: var(--tg-radius-default);
    top: 10px;
    z-index: 1450;

    .warp {
      padding: var(--tg-spacing-16);
    }
  }
}
</style>
