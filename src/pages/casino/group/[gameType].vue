<script setup lang="ts" runAsync>
const props = defineProps<{ gameType: string }>()
const { VITE_CASINO_GAME_PAGE_SIZE } = import.meta.env
const { t } = useI18n()
const currentType = ref(props.gameType)
const isLive = computed(() => currentType.value === EnumCasinoGameType.LIVE) // 真人
const isSlot = computed(() => currentType.value === EnumCasinoGameType.SLOT) // 老虎机
const title = computed(() => isLive.value ? t('game_type_live') : t('game_type_slot'))

const gameTypeParams = computed(() => isLive.value ? 1 : isSlot.value ? 3 : undefined)
const { data: list, total, runAsync, loading, push } = usePage((page, page_size) => () => ApiMemberGameList({
  page: page.value,
  page_size: page_size.value,
  game_type: gameTypeParams.value,
}), { page_size: VITE_CASINO_GAME_PAGE_SIZE })

const route = useRoute()
const stop = watch(route, (a) => {
  currentType.value = a.params.gameType.toString()
  application.allSettled([runAsync()])
})
onBeforeRouteLeave(() => {
  stop()
})

await application.allSettled([runAsync()])
</script>

<template>
  <div>
    <section class="layout-spacing tg-game-type-page">
      <div class="group-banner-wrap">
        <div class="group-banner-bg" />
        <div class="banner-wrap">
          <div class="banner">
            <div class="left">
              <h1>
                <span>{{ title }}</span>
              </h1>
            </div>
            <div class="right">
              <BaseImage :url="`/img/casino/group-banner-${gameType}.png`" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24">
        <AppGameSearch game-type="2" />
      </div>
      <div class="mt-24">
        <AppGroupFilter />
      </div>
      <div class="mt-24">
        <AppCardList :list="list" />
      </div>
      <div class="load-more mt-24">
        <AppPercentage :total="total" :percentage="list.length" />
        <BaseButton size="md" :loading="loading" @click="push">
          <div>
            {{ $t('load_more') }}
          </div>
        </BaseButton>
      </div>
      <AppProviderSlider />
    </section>
    <AppBetData />
  </div>
</template>

<style lang="scss" scoped>
.load-more {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-16);

  button {
    width: 184px;
    height: 44px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
