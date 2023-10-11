<script setup lang='ts'>
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: '主页', value: 'home' },
]
</script>

<template>
  <div class="sports-hot-event">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="uni-popular" />
        <h6>热门赛事</h6>
      </div>
      <div class="right">
        <VMenu placement="top">
          <BaseButton size="sm" type="text" disabled>
            <BaseIcon name="uni-three-top" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              三项投注
            </div>
          </template>
        </VMenu>
        <BaseSelect
          v-model="threeType"
          :options="threeOptions"

          disabled popper
        />
      </div>
    </div>

    <div class="market-wrapper">
      <AppSportsMarket type="upcoming" />
      <AppSportsMarket type="upcoming" />
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
