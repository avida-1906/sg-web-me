<script setup lang='ts'>
const props = defineProps<Props>()
enum GameType {
  casino = '1',
  sports = '2',
}
interface Props {
  gameType: '1' | '2'
}
const isCasino = computed(() => props.gameType === GameType.casino)
const placeHolderText = computed(() => isCasino.value ? '搜索游戏' : '搜索赛事')

const searchValue = ref('')

// 搜索功能面板
const { bool: showSearchOverlay, setTrue, setFalse } = useBoolean(false)

// 近期搜索关键字
const recentKeyword = ref(['keyword 1', 'keyword 2', 'keyword 3', 'keyword 4', 'keyword 5'])
function onClickKeyword(k: string) {
  searchValue.value = k
}
function onCloseKeyword(k: string) {
  recentKeyword.value.splice(recentKeyword.value.findIndex(t => t === k), 1)
}

// 搜索结果
function onGameItemClick() { }
// const casinoList = ref([gameInfo, gameInfo, gameInfo, gameInfo, gameInfo])
const casinoList = ref([])
</script>

<template>
  <div class="app-game-search">
    <div v-if="showSearchOverlay" class="overlay" @click.self="setFalse()" />
    <div :class="{ 'input-focus': showSearchOverlay }">
      <BaseSearch
        v-model="searchValue" :place-holder="placeHolderText" :clearable="showSearchOverlay"
        @focus="setTrue" @close="setFalse()"
      />
    </div>

    <!-- 搜索功能面板  -->
    <div v-show="showSearchOverlay" class="search-overlay">
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
  .input-focus{
    position: relative;
    z-index: 1450;
  }

  .search-overlay {
    width: 100%;
    background-color: var(--tg-secondary-dark);
    color: var(--tg-secondary-light);
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
