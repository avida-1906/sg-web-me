<script setup lang='ts'>
const emit = defineEmits(['gameTypeChange', 'close'])
const { isFullScreen } = storeToRefs(useWindowStore())
const route = useRoute()
const isCasino = computed(() => route.name === 'casino')
const isSports = computed(() => route.name === 'sports')
// 搜索栏
const gameType = ref(isCasino.value ? '1' : isSports.value ? '2' : '')
const gameTypeList = [
  { label: '娱乐城', value: '1' },
  { label: '体育', value: '2' },
]
const gameLabel = computed(() => gameTypeList.find(a => a.value === gameType.value)?.label ?? '-')
const isPopperShow = ref(false)
function onPopperShow() {
  isPopperShow.value = true
}
function onPopperHide() {
  isPopperShow.value = false
}
function selectGameType(v: string) {
  gameType.value = v
  emit('gameTypeChange', v)
}

// 搜索功能面板
const showSearchOverlay = ref(false)
const searchValue = ref('')
function setShowSearchOverlay(v = true) {
  showSearchOverlay.value = v
}

// 近期搜索关键字
const recentKeyword = ref(['keyword 1', 'keyword 2', 'keyword 3', 'keyword 4', 'keyword 5'])
function onClickKeyword(k: string) {
  searchValue.value = k
}
function onCloseKeyword(k: string) {
  recentKeyword.value.splice(recentKeyword.value.findIndex(t => t === k), 1)
}

// 搜索结果
const gameInfo = { id: 2, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' }
function onGameItemClick() { }
// const casinoList = ref([gameInfo, gameInfo, gameInfo, gameInfo, gameInfo])
const casinoList = ref([])
</script>

<template>
  <div class="app-global-search" :class="{ 'in-pc': !isFullScreen }">
    <div v-show="!isFullScreen" class="overlay" @click="emit('close')" />
    <BaseSearch v-model="searchValue" clearable @focus="setShowSearchOverlay" @clear="setShowSearchOverlay(false)" @close="emit('close')">
      <template v-if="isCasino || isSports" #left>
        <VDropdown :distance="6" @show="onPopperShow" @hide="onPopperHide">
          <button class="tips">
            <span>{{ gameLabel }}</span>
            <BaseIcon :name="`uni-arrow-${isPopperShow ? 'up' : 'down'}-big`" />
          </button>
          <template #popper>
            <div
              v-for="t, i in gameTypeList" :key="i" v-close-popper class="popper-option"
              @click="selectGameType(t.value)"
            >
              {{ t.label }}
            </div>
          </template>
        </VDropdown>
      </template>
    </BaseSearch>

    <!-- 搜索功能面板  -->
    <div v-show="showSearchOverlay || !isFullScreen" class="search-overlay" @click.self="setShowSearchOverlay(false)">
      <div class="scroll-y warp">
        <div v-if="casinoList.length === 0" class="no-result">
          <div class="text">
            <span v-show="searchValue.length < 3">需要至少 3 个字符来进行搜索。</span>
            <span v-show="searchValue.length >= 3 && casinoList.length === 0">未找到结果。</span>
          </div>
          <div v-if="recentKeyword.length" class="recent">
            <div class="title">
              <label>近期搜索</label>
              <BaseButton type="text" font-size="14" @click="recentKeyword.length = 0">
                清除搜索({{ recentKeyword.length }})
              </BaseButton>
            </div>
            <div class="list">
              <BaseTag v-for="t in recentKeyword" :key="t" :text="t" @click="onClickKeyword" @close="onCloseKeyword" />
            </div>
          </div>
        </div>

        <!-- casino -->
        <div v-if="casinoList.length" class="result-casino">
          <BaseGameItem v-for="item, i in casinoList" :key="i" :game-info="item" @click-item="onGameItemClick" />
        </div>
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
  background: rgba(26, 46, 56, 0.702);
}

.tips {
  display: flex;
  align-items: center;

  span {
    margin-right: var(--tg-spacing-8);
  }

  &:active {
    transform: scale(0.95);
  }
}

.popper-option {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
  font-size:var(--tg-font-size-default);

  &:hover {
    background-color: var(--tg-secondary-light);
  }
}

.search-overlay {
  width: 100%;
  height: 100%;
  background-color: var(--tg-secondary-dark);
  color: var(--tg-secondary-light);
  position: absolute;
  left: 0;
  top: 73px;
  z-index: 5;

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
  padding-top: 57px;
  margin: 0;
  .search-overlay{
    height: auto;
    position: relative;
    border-radius: var(--tg-radius-default);
    top:8px;
    .warp{
      padding: var(--tg-spacing-16);
    }
  }
}
</style>
