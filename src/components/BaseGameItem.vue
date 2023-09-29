<script setup lang="ts">
interface Props {
  gameInfo: {
    img?: string
    name?: string
    platform_id?: string
    game_id?: string
    [k: string]: any
  }
}
defineProps<Props>()
const router = useRouter()
const { isMobile } = storeToRefs(useWindowStore())

const closeSearch = inject('closeSearch', () => {})
const closeSearchH5 = inject('closeSearchH5', () => {})

function gameStart(item: Props['gameInfo']) {
  const { id } = item
  router.push(`/casino/games?id=${id}`)

  if (isMobile.value)
    closeSearchH5()

  else
    closeSearch()
}
</script>

<template>
  <BaseAspectRatio ratio="334/447">
    <div class="base-game-item" @click="gameStart(gameInfo)">
      <BaseImage :url="gameInfo.img" :name="gameInfo.name" is-game />
      <div class="active-game-item">
        <div class="game-title">
          {{ gameInfo.name }}
        </div>
        <BaseIcon class="game-uni-play" name="uni-play" />
        <div class="game-tip">
          Abcd 原创游戏
        </div>
      </div>
    </div>
  </BaseAspectRatio>
</template>

<style scoped lang="scss">
  .base-game-item {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    will-change: transform;
    transition: 0.3s;
    border-radius: var(--tg-radius-md);
    overflow: hidden;
    cursor: pointer;
    .active-game-item{
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 1rem;
      font-size: var(--tg-font-size-base);
      opacity: 0;
      color: var(--tg-text-white);
      background-color: var(--tg-sub-blue);
      will-change: transform;
      transition: all 0.3s ease 0.3s;
      .game-title{
        font-size:var(--tg-font-size-md);
        line-height: 1.2;
      }
      .game-uni-play{
        margin: 0 auto;
        width: 32px;
        height: 32px;
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
  .base-game-item:hover{
    top: -7px;
  }
  .base-game-item:hover .active-game-item{
    opacity: 0.9;
  }
</style>
