<script setup lang='ts' runAsync>
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env

const { isMobile } = storeToRefs(useWindowStore())
const router = useRouter()
const { t } = useI18n()
const tab = ref('all')
const tabList = [
  { label: t('game_type_all'), value: 'all' },
  { label: t('game_type_live'), value: EnumCasinoGameType.LIVE },
  { label: t('game_type_slot'), value: EnumCasinoGameType.SLOT },
]
const showAll = computed(() => tab.value === 'all')
const showLive = computed(() => tab.value === EnumCasinoGameType.LIVE)
const showSlot = computed(() => tab.value === EnumCasinoGameType.SLOT)
const currentTitle = computed(() => tabList.find(a => a.value === tab.value)?.label ?? '-')

const { data: liveList, total: liveTotal, runAsync: runLive } = usePage((page, page_size) => () => ApiMemberGameList({
  page: page.value,
  page_size: page_size.value,
  game_type: 1,
}), { page_size: VITE_CASINO_HOME_PAGE_SIZE })
const { data: slotList, total: slotTotal, runAsync: runSlot } = usePage((page, page_size) => () => ApiMemberGameList({
  page: page.value,
  page_size: page_size.value,
  game_type: 3,
}), { page_size: VITE_CASINO_HOME_PAGE_SIZE })

function viewMoreGames(gameType: string) {
  router.push(`/casino/group/${gameType}`)
}

await application.allSettled([runLive(), runSlot()])
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
      <BaseTab v-model="tab" :list="tabList" :center="false" />
    </div>
    <div class="content-wrapper">
      <AppSlider v-show="showAll" :game-type="EnumCasinoGameType.LIVE" icon="chess-live-casino" :title="t('game_type_live')" :data="liveList" />
      <AppSlider v-show="showAll" :game-type="EnumCasinoGameType.SLOT" icon="chess-slot-machine" :title="t('game_type_slot_short_name')" :data="slotList" />

      <div v-show="!showAll" class="list-wrap">
        <div class="title">
          <BaseIcon :name="showLive ? 'chess-live-casino' : 'chess-slot-machine'" />
          <span>{{ currentTitle }}</span>
        </div>

        <AppCardList v-show="showLive" :list="liveList" />
        <AppCardList v-show="showSlot" :list="slotList" />

        <div class="more">
          <BaseButton size="md" @click="viewMoreGames(showLive ? EnumCasinoGameType.LIVE : EnumCasinoGameType.SLOT)">
            查看全部 {{ showLive ? liveTotal : slotTotal }} {{ currentTitle }}
          </BaseButton>
        </div>
      </div>
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
  .more{
    margin-top: var(--tg-spacing-24);
    display: flex;
    justify-content: center;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
