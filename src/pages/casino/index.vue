<script setup lang='ts'>
import { EnumCasinoApiGameType, EnumCasinoGameType } from '~/utils/enums'

defineOptions({
  name: 'KeepAliveCasino',
})

const { isMobile } = storeToRefs(useWindowStore())
const router = useRouter()
const { t } = useI18n()

const tab = ref('all')
const tabList = [
  { label: t('game_type_all'), value: 'all', icon: 'chess-lobby' },
  { label: t('game_type_live'), value: EnumCasinoGameType.LIVE, icon: 'chess-live-casino' },
  { label: t('game_type_slot'), value: EnumCasinoGameType.SLOT, icon: 'chess-slot-machine' },
]
const showAll = computed(() => tab.value === 'all')
const showLive = computed(() => tab.value === EnumCasinoGameType.LIVE)
const showSlot = computed(() => tab.value === EnumCasinoGameType.SLOT)
const currentTitle = computed(() => tabList.find(a => a.value === tab.value)?.label ?? '-')

const { list: liveList, total: liveTotal, runAsync: runLive } = useList(ApiMemberGameList)
const { list: slotList, total: slotTotal, runAsync: runSlot } = useList(ApiMemberGameList)

function viewMoreGames(gameType: string) {
  router.push(`/casino/group/${gameType}`)
}

await application.allSettled([runLive({ game_type: EnumCasinoApiGameType.LIVE }), runSlot({ game_type: EnumCasinoApiGameType.SLOT })])
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
      <BaseTab v-model="tab" :list="tabList" :center="false" size="large" />
    </div>
    <div class="content-wrapper">
      <Transition name="tab-fade">
        <div v-show="showAll">
          <AppSlider
            :game-type="EnumCasinoGameType.LIVE" icon="chess-live-casino" :title="t('game_type_live')"
            :data="liveList"
          />
          <AppSlider
            :game-type="EnumCasinoGameType.SLOT" icon="chess-slot-machine"
            :title="t('game_type_slot_short_name')" :data="slotList"
          />
        </div>
      </Transition>
      <Transition name="tab-fade">
        <div v-show="!showAll" class="list-wrap">
          <div class="title">
            <BaseIcon :name="showLive ? 'chess-live-casino' : 'chess-slot-machine'" />
            <span>{{ currentTitle }}</span>
          </div>
          <Transition name="tab-fade">
            <AppCardList v-show="showLive" :list="liveList" />
          </Transition>
          <Transition name="tab-fade">
            <AppCardList v-show="showSlot" :list="slotList" />
          </Transition>
          <div class="more">
            <BaseButton size="md" @click="viewMoreGames(showLive ? EnumCasinoGameType.LIVE : EnumCasinoGameType.SLOT)">
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
meta:
  layout: home
</route>
