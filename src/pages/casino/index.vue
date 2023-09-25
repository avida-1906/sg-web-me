<script setup lang='ts'>
const { VITE_CASINO_HOME_PAGE_SIZE } = import.meta.env
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

const { gameProviders } = useGameList()
// TODO:待删
const liveImg = 'https://mediumrare.imgix.net/c984a0f6625efd5a38c306697845c7bedcc917e2c061b45e8a75a5e648057e8a?&dpr=2&format=auto&auto=format&q=50'
const slotImg = 'https://mediumrare.imgix.net/3285df789ee1e5f52e3b075b4eb0c1f080fcdce28f7c9689daa4e62f87fa85a3?&dpr=2&format=auto&auto=format&q=50'

const { data: liveData, total: liveTotal } = useApiGameList({ page: 1, page_size: VITE_CASINO_HOME_PAGE_SIZE, game_type: 1 })
const liveList = computed(() => {
  if (liveData.value?.d) {
    return liveData.value.d.map((item) => {
      return { ...item, img: liveImg }
    })
  }
  return []
})
const { data: slotData, total: slotTotal } = useApiGameList({ page: 1, page_size: VITE_CASINO_HOME_PAGE_SIZE, game_type: 3 })
const slotList = computed(() => {
  if (slotData.value?.d) {
    return slotData.value.d.map((item) => {
      return { ...item, img: slotImg }
    })
  }
  return []
})
function viewMoreGames(gameType: string) {
  router.push(`/casino/group/${gameType}`)
}
</script>

<template>
  <div class="layout-spacing">
    <div class="hero-wrapper mt-24">
      <AppBanner />
    </div>
    <div class="mt-24">
      <AppGameSearch game-type="2" />
    </div>
    <div class="mt-24">
      <BaseTab v-model="tab" :list="tabList" :center="false" />
    </div>
    <div class="content-wrapper">
      <AppSlider v-show="showAll" api="" icon="chess-live-casino" :title="t('game_type_live')" :data="liveList" />
      <AppSlider v-show="showAll" api="" icon="chess-slot-machine" :title="t('game_type_slot_short_name')" :data="slotList" />

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

      <AppSlider
        api="" icon="chess-game-provider" :title="$t('casino_provider')" :data="gameProviders"
        :show-view-all="false"
      >
        <template #default="{ item }">
          <div class="provider-item-wrap">
            <BaseImage :url="item.src" />
          </div>
        </template>
      </AppSlider>
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
