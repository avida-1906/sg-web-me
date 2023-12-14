<script setup lang="ts">
interface Props {
  gameInfo: {
    img?: string
    name?: string
    platform_id?: string
    game_id?: string
    [k: string]: any
    maintained: string
    game_type: string
  }
  showManCount?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const { push } = useLocalRouter()
const { isMobile } = storeToRefs(useWindowStore())
const { allPlatformList } = storeToRefs(useCasinoStore())
const closeSearch = inject('closeSearch', () => { })
const closeSearchH5 = inject('closeSearchH5', () => { })
const { bool: isError, setTrue: setErrorTrue } = useBoolean(false)
const { bool: thumbnailStatus, setFalse: thumbnailLoadError } = useBoolean(true)
const { bool: showBorder, setFalse: showBorderFalse } = useBoolean(true)

const gameProviderName = computed(() =>
  allPlatformList.value?.find(a => a.id === props.gameInfo.platform_id)?.name ?? '-',
)
const isMaintained = computed(() => {
  return props.gameInfo.maintained === '2'
})

function gameStart(item: Props['gameInfo']) {
  if (isMaintained.value)
    return

  push(`/casino/games?id=${item.id}&name=${item.name}&pn=${gameProviderName.value}&pid=${item.platform_id}`)
  if (isMobile.value)
    closeSearchH5()

  else
    closeSearch()
}
/**
 * 获取缩略图地址（xxx.webp => xxx.s.webp）
 * @param url
 */
function getThumbnailUrl(url: string) {
  const arr = url.split('.')
  arr.splice(arr.length - 1, 0, 's')
  return arr.join('.')
}

const onPlayCount = ref(Math.ceil(Math.random() * 1000).toFixed())
</script>

<template>
  <BaseAspectRatio ratio="68/91">
    <div
      class="base-game-item" :class="{
        'maintain': isMaintained,
        'pc-item': !isMobile,
        'border': showBorder,
      }"
      @click="gameStart(gameInfo)"
    >
      <div class="backgrop-filter">
        <BaseImage
          v-if="thumbnailStatus"
          is-cloud
          :url="getThumbnailUrl(gameInfo.img ?? '')"
          @error-img="thumbnailLoadError"
        />
      </div>
      <BaseImage
        v-if="!isError"
        :url="gameInfo.img"
        :name="gameInfo.name"
        is-cloud
        style="height: inherit;"
        @error-img="setErrorTrue()"
        @load-img="showBorderFalse"
      />
      <div v-if="isError && !isMaintained" class="img-load">
        <div style="text-align: center;">
          <BaseIcon
            style="font-size:var(--tg-font-size-default);margin-top: 45%;"
            name="uni-game-err"
          />
        </div>
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
            <span style="font-size: var(--tg-font-size-xs);">
              {{ $t('plat_maintain') }}
            </span>
          </template>
        </BaseEmpty>
      </div>
    </div>
  </BaseAspectRatio>
  <span
    v-if="+gameInfo.game_type !== CasinoGameType.casino && showManCount"
    class="count"
  >
    <span class="dot blinking-dash2" />&nbsp;&nbsp;
    <span class="num">{{ application.formatNumber(onPlayCount) }}</span>
    &nbsp;{{ t('in_play') }}
  </span>
</template>

<style scoped lang="scss">
.base-game-item {
  position: relative;
  width: 100%;
  height: -webkit-fill-available;
  top: 0;
  will-change: transform;
  transition: 0.3s;
  border-radius: var(--tg-radius-md);
  overflow: hidden;
  cursor: pointer;
  &.border{
    border: 0.5px solid var(--tg-text-white);
  }

  .active-game-item {
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

    .game-title {
      font-size: var(--tg-font-size-md);
      line-height: 1.2;
    }

    .game-uni-play {
      margin: 0 auto;
      font-size: var(--tg-font-size-3xl);
      --tg-icon-color: var(--tg-text-white);
    }
  }

  .img-load {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  &.maintain {
    cursor: not-allowed;
  }

  .maintain-game-item {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #{rgba($color: var(--tg-color-blue-rgb), $alpha: 0.8)};
  }

  .backgrop-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    // backdrop-filter: blur(10px); /* 标准语法 */
  }
}

.pc-item:hover {
  top: -7px;
}

.pc-item:hover .active-game-item {
  opacity: 0.88;
}

.count {
  display: flex;
  align-items: center;
  margin-top: var(--tg-spacing-4);
  font-size: var(--tg-font-size-xs);
  color: var(--tg-text-lightgrey);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.5;

  .dot {
    width: 6.5px;
    height: 6.5px;
    border-radius: 50%;
    background-color: var(--tg-primary-success);
    margin-left: 2px;
  }
  .num{
    color: var(--tg-text-white);
    font-variant-numeric: tabular-nums;
  }
}
</style>
