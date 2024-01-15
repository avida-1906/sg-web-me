<script setup lang="ts">
interface Props {
  gameInfo: {
    img?: string
    name?: string
    platform_id?: string
    platform_name: string
    game_id?: string
    [k: string]: any
    maintained: string
    game_type: string
  }
  showManCount?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const { isMobile } = storeToRefs(useWindowStore())
const closeSearch = inject('closeSearch', () => { })
const closeSearchH5 = inject('closeSearchH5', () => { })
const { bool: isError, setTrue: setErrorTrue } = useBoolean(false)
const { bool: thumbnailStatus, setFalse: thumbnailLoadError } = useBoolean(true)
const { bool: showBorder, setFalse: showBorderFalse } = useBoolean(true)
const { bool: showImg, setTrue: showImgTrue } = useBoolean(false)
const router = useLocalRouter()

const isMaintained = computed(() => {
  return props.gameInfo.maintained === '2'
})
const toPath = computed(() => {
  const { id, name, platform_name, platform_id, game_type, game_id } = props.gameInfo
  const uid = router.currentRoute.value.query.uid

  const query: any = {
    id, name, pn: platform_name, pid: platform_id, type: game_type, code: game_id,
  }
  if (uid)
    query.uid = uid

  return addUrlSearch(
    `/${getCurrentUrlLanguage()}/casino/games`, application.objectToUrlParams(query),
  )
})

function gameStart() {
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

onMounted(() => {
  setTimeout(() => {
    showImgTrue()
  }, Math.ceil(Math.random() * 50 + 300))
})

const onPlayCount = ref(Math.ceil(Math.random() * 1000).toFixed())
</script>

<template>
  <BaseAspectRatio ratio="100/134.1463414634">
    <div
      class="base-game-item" :class="{
        maintain: isMaintained,
      }"
      @click="gameStart"
    >
      <div class="backgrop-filter">
        <BaseImage
          v-if="thumbnailStatus"
          is-cloud
          :url="getThumbnailUrl(gameInfo.img ?? '')"
          loading="eager"
          @error-img="thumbnailLoadError"
        />
      </div>
      <template v-if="showBorder">
        <img class="border" src="/img/border/border.svg" alt="">
        <div class="game-title">
          {{ gameInfo.name }}
        </div>
      </template>
      <BaseImage
        v-if="!isError && showImg"
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
      <router-link
        v-if="!isMaintained"
        v-slot="{ href, navigate }"
        custom
        :to="toPath"
      >
        <a
          :href="href"
          class="game-href"
          @click="navigate"
        />
      </router-link>
      <!-- <div class="active-game-item">
        <div class="game-title">
          {{ gameInfo.name }}
        </div>
        <BaseIcon class="game-uni-play" name="uni-play" />
        <div class="game-tip">
          {{ gameInfo.platform_name }}
        </div>
      </div> -->
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
    v-if="+gameInfo.game_type !== CasinoGameType.casino || showManCount"
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
  .border{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .game-title{
    width: 100%;
    height: 100%;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  }

  // .active-game-item {
  //   position: absolute;
  //   display: flex;
  //   width: 100%;
  //   height: 100%;
  //   left: 0;
  //   top: 0;
  //   flex-direction: column;
  //   flex-wrap: nowrap;
  //   justify-content: space-between;
  //   padding: 1rem;
  //   font-size: var(--tg-font-size-base);
  //   opacity: 0;
  //   color: var(--tg-text-white);
  //   background-color: var(--tg-sub-blue);
  //   will-change: transform;
  //   transition: all 0.3s ease 0.3s;

  //   .game-title {
  //     font-size: var(--tg-font-size-md);
  //     line-height: 1.2;
  //   }

  //   .game-uni-play {
  //     margin: 0 auto;
  //     font-size: var(--tg-font-size-3xl);
  //     --tg-icon-color: var(--tg-text-white);
  //   }
  // }
  .game-href{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
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
  &:hover {
    top: -7px;
  }

  // &:hover .active-game-item {
  //   opacity: 0.88;
  // }
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
