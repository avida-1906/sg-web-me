<script setup lang="ts">
interface Props {
  gameInfo: {
    img?: string
    name?: string
    platform_id?: string
    game_id?: string
    [k: string]: any
    maintained: string
  }
}

const props = defineProps<Props>()

const router = useRouter()
const { isMobile } = storeToRefs(useWindowStore())
const { platformList } = storeToRefs(useCasinoStore())
const closeSearch = inject('closeSearch', () => {})
const closeSearchH5 = inject('closeSearchH5', () => { })
const { bool: isError, setTrue: setErrorTrue } = useBoolean(false)

const gameProviderName = computed(() =>
  platformList.value?.find(a => a.id === props.gameInfo.platform_id)?.name ?? '-',
)
const isMaintained = computed(() => {
  // return platformList.value?.find(a => a.id === props.gameInfo.platform_id)?.maintained === '2' ?? false
  return props.gameInfo.maintained === '2'
})

function gameStart(item: Props['gameInfo']) {
  if (isMaintained.value)
    return

  router.push(`/casino/games?id=${item.id}&name=${item.name}`)
  if (isMobile.value)
    closeSearchH5()

  else
    closeSearch()
}
</script>

<template>
  <BaseAspectRatio ratio="334/447">
    <div
      class="base-game-item" :class="{ 'maintain': isMaintained, 'pc-item': !isMobile }"
      @click="gameStart(gameInfo)"
    >
      <BaseImage
        v-if="!isError"
        :url="gameInfo.img"
        :name="gameInfo.name"
        is-cloud
        @error-img="setErrorTrue"
      />
      <div v-if="isError && !isMaintained" class="center img-load">
        <BaseEmpty>
          <template #icon>
            <BaseIcon style="--tg-base-button-font-size:43px;" name="img-error" />
          </template>
          <template #description>
            <span style="font-size: var(--tg-font-size-xs);">加载失败了x_x</span>
          </template>
        </BaseEmpty>
      </div>
      <div class="active-game-item">
        <div class="game-title">
          {{ gameInfo.name }}
        </div>
        <BaseIcon class="game-uni-play" name="uni-play" />
        <div class="game-tip">
          {{ gameProviderName }}
        </div>
      </div>
      <div v-if="isMaintained" class="center maintain-game-item">
        <BaseEmpty>
          <template #icon>
            <BaseIcon style="--tg-base-button-font-size:40px" name="uni-maintain" />
          </template>
          <template #description>
            <span style="font-size: var(--tg-font-size-xs);">场馆维护中</span>
          </template>
        </BaseEmpty>
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
        font-size: var(--tg-font-size-3xl);
        --tg-icon-color: var(--tg-text-white);
      }
    }
    .img-load {
      width: 100%;
      height: 100%;
      background-color: var(--tg-secondary-grey);
    }
    &.maintain{
      cursor: not-allowed;
    }
    .maintain-game-item{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: #{rgba($color: var(--tg-color-blue-rgb), $alpha: 0.8)};
    }
  }
  .pc-item:hover{
    top: -7px;
  }
  .pc-item:hover .active-game-item{
    opacity: 0.88;
  }
</style>
