<script setup lang='ts'>
const emit = defineEmits(['gameTypeChange', 'close'])
const { isMobile } = storeToRefs(useWindowStore())
const { leftIsExpand } = useLeftSidebar()
const { t } = useI18n()
const route = useRoute()
const { bool: isPopperShow, setTrue, setFalse } = useBoolean(false)
const { bool: isShowOverlay, setTrue: showOverlayTrue, setFalse: showOverlayFalse } = useBoolean(false)
const { bool: isClear, setTrue: setClearTrue } = useBoolean(true)
const { bool: isInputing, setTrue: setInputingTrue } = useBoolean(false)
const initCasino = computed(() => route.name?.toString().includes('casino'))
const initSports = computed(() => route.name?.toString().includes('sports'))

// 搜索栏
const gameType = ref(initCasino.value ? '1' : initSports.value ? '2' : '1')
const gameTypeList = [
  { label: t('casino'), value: '1' },
  { label: t('sports'), value: '2' },
]
const searchValue = ref('')
// 近期搜索关键字
const keywordLive = ref(Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_LIVE)?.value ?? [])
const keywordSports = ref(Local.get<any[]>(STORAGE_SEARCH_KEYWORDS_SPORTS)?.value ?? [])

const gameLabel = computed(() => gameTypeList.find(a => a.value === gameType.value)?.label ?? '-')
const isCasino = computed(() => gameType.value === '1')
const isSports = computed(() => gameType.value === '2')
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
function selectGameType(v: string) {
  gameType.value = v
  emit('gameTypeChange', v)
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

// 关闭方法
provide('closeSearch', () => emit('close'))
provide('closeSearchH5', () => leftIsExpand.value = !leftIsExpand.value)
</script>

<template>
  <div class="app-global-search" :class="{ 'in-pc': !isMobile }">
    <div v-show="!isMobile" class="overlay" @click="emit('close')" />
    <BaseSearch
      v-model.trim="searchValue" class="search-input" clearable @focus="showOverlayTrue" @clear="setClearTrue"
      @close="emit('close')" @input="onBaseSearchInput"
    >
      <template #left>
        <VDropdown :distance="6" @show="setTrue()" @hide="setFalse">
          <button class="tips">
            <span>{{ gameLabel }}</span>
            <BaseIcon :name="`uni-arrow-${isPopperShow ? 'up' : 'down'}-big`" />
          </button>
          <template #popper="{ hide }">
            <a
              v-for="type, i in gameTypeList" :key="i" class="popper-option"
              @click="hide();selectGameType(type.value)"
            >
              {{ type.label }}
            </a>
          </template>
        </VDropdown>
      </template>
    </BaseSearch>

    <!-- 搜索功能面板  -->
    <div v-show="isShowOverlay || !isMobile" class="search-overlay" @click.self="showOverlayFalse">
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
              <BaseTag v-for="text in keywordList" :key="text" :text="text" @click="onClickKeyword" @close="onCloseKeyword" />
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

  span {
    margin-right: var(--tg-spacing-8);
  }

  &:active {
    transform: scale(0.96);
  }
}

.popper-option {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
  font-size: var(--tg-font-size-default);

  &:hover {
    background-color: var(--tg-text-lightgrey);
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

.in-pc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  max-width: 1200px;
  padding: 57px 3vw 0;

  .search-input {
    position: relative;
    z-index: 1450;
  }

  .search-overlay {
    height: auto;
    position: relative;
    border-radius: var(--tg-radius-default);
    top: 8px;
    z-index: 1450;

    .warp {
      padding: var(--tg-spacing-16);
    }
  }
}
</style>
