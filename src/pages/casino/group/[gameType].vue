<script setup lang="ts">
const props = defineProps<{ gameType: string }>()
const { VITE_CASINO_GAME_PAGE_SIZE } = import.meta.env
const { t } = useI18n()
const isLive = computed(() => props.gameType === EnumCasinoGameType.LIVE) // 真人
const isSlot = computed(() => props.gameType === EnumCasinoGameType.SLOT) // 老虎机
const title = computed(() => isLive.value ? t('game_type_live') : t('game_type_slot'))

const gameType = computed(() => isLive.value ? 1 : isSlot.value ? 3 : undefined)
const liveImg = 'https://mediumrare.imgix.net/c984a0f6625efd5a38c306697845c7bedcc917e2c061b45e8a75a5e648057e8a?&dpr=2&format=auto&auto=format&q=50'
const { data, total, push, loading } = useApiGameList({ page: 1, page_size: VITE_CASINO_GAME_PAGE_SIZE, game_type: gameType.value })
const list = computed(() => {
  if (data.value) {
    return data.value.map((item) => {
      return { ...item, img: liveImg }
    })
  }
  return []
})
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
              <BaseImage url="/img/casino/group-banner-slots.png" />
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
