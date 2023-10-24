<script setup lang='ts'>
import { EnumCasinoGameType } from '~/utils/enums'

defineOptions({
  name: 'KeepAliveCasino',
})

const { isMobile } = storeToRefs(useWindowStore())
const { casinoNav, casinoGameList } = storeToRefs(useCasinoStore())

const router = useRouter()
const { t } = useI18n()

const tab = ref('all')
const showAll = computed(() => tab.value === 'all')
const showLive = computed(() => tab.value === EnumCasinoGameType.LIVE)
const showSlot = computed(() => tab.value === EnumCasinoGameType.SLOT)
const currentTitle = computed(() => {
  return casinoNav.value.find(a => a.value === tab.value)?.label ?? '-'
})
// const currentIcon =
const {
  list: liveList,
  total: liveTotal,
  runAsync: runLive,
} = useList(ApiMemberGameList)
const {
  list: slotList,
  total: slotTotal,
  runAsync: runSlot,
} = useList(ApiMemberGameList)

function viewMoreGames(gameType: string) {
  router.push(`/casino/group/${gameType}`)
}
</script>

<template>
  <div class="layout-spacing">
    <div class="hero-wrapper mt-24">
      <AppBanner />
    </div>
    <div v-if="!isMobile" class="mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="mt-24">
      <BaseTab v-model="tab" :list="casinoNav" :center="false" size="large" />
    </div>
    <div class="content-wrapper">
      <Transition name="tab-fade">
        <div v-show="showAll">
          <AppSlider
            v-for="item in casinoGameList" :key="item.name"
            :icon="item.icon"
            :title="item.name"
            :data="item.games"
          />
        </div>
      </Transition>
      <Transition name="tab-fade">
        <div v-show="!showAll" class="list-wrap">
          <div class="title">
            <BaseIcon
              :name="showLive ? 'chess-live-casino' : 'chess-slot-machine'"
            />
            <span>{{ currentTitle }}</span>
          </div>
          <Transition name="tab-fade">
            <AppCardList v-show="showLive" :list="liveList" />
          </Transition>
          <Transition name="tab-fade">
            <AppCardList v-show="showSlot" :list="slotList" />
          </Transition>
          <div class="more">
            <BaseButton
              size="md"
              @click="viewMoreGames(
                showLive ? EnumCasinoGameType.LIVE : EnumCasinoGameType.SLOT,
              )"
            >
              查看全部 {{ showLive ? liveTotal : slotTotal }} {{ currentTitle }}
            </BaseButton>
          </div>
        </div>
      </Transition>
      <AppProviderSlider />
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang='scss' scoped>
.list-wrap {
  margin-top: var(--tg-spacing-24);

  .title {
    font-size: var(--tg-font-size-base);
    color: var(--tg-text-white);
    margin-bottom: var(--tg-spacing-12);

    &:hover {
      --tg-icon-color: var(--tg-text-white);
    }

    span {
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
      margin-left: var(--tg-spacing-8);
      line-height: 1.5;
    }
  }

  .more {
    margin-top: var(--tg-spacing-24);
    display: flex;
    justify-content: center;
  }
}
</style>

<route lang="yaml">
name: casino-home
meta:
  layout: home
  browserTitle: 在线加密货币与比特币赌场 – Stake.com 赌场游戏
</route>
