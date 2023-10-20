<script setup lang='ts'>
const { t } = useI18n()

// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: t('home_space_title'), value: 'home' },
]
</script>

<template>
  <div class="sports-hot-event">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>{{ t('sports_hot_event') }}</h6>
      </div>
      <div class="right">
        <VTooltip placement="top">
          <BaseButton size="sm" type="text" disabled>
            <BaseIcon name="uni-three-top" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ t('sports_three_options') }}
            </div>
          </template>
        </VTooltip>
        <BaseSelect
          v-model="threeType"
          :options="threeOptions"
          disabled popper
        />
      </div>
    </div>

    <div class="market-wrapper">
      <AppSportsMarket show-more :tournament="{ name: 'ATP东京站，日本，男单', id: '123' }" />
      <AppSportsMarket :tournament="{ name: 'ATP东京站，日本，男单', id: '123' }" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports-hot-event{

}
.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
  margin-top: var(--tg-spacing-12);
}
</style>
