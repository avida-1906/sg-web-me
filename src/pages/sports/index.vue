<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveSports',
})
const currentGame = ref('2')
const gameList = [
  { name: '网球', id: '2', num: 20 },
  { name: '足球', id: '3', num: 30 },
  { name: '美式橄榄球', id: '4', num: 5 },
]
const { bool: isBase, toggle: toggleBase } = useBoolean(true)
const marketTypeText = computed(() => isBase.value ? '三项投注' : '标准')
// 标准盘选项
const baseType = ref('winner')
const baseOptions = [
  { label: '获胜盘', value: 'winner' },
  { label: '让分盘', value: 'handicap' },
  { label: '总分盘', value: 'total' },
]
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: '主页', value: 'home' },
]
</script>

<template>
  <div class="sports-home">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-ball-plate" />
        <h6>滚球盘</h6>
      </div>
      <div class="right">
        <VMenu placement="top">
          <BaseButton size="sm" type="text" @click="toggleBase">
            <BaseIcon v-if="isBase" name="uni-three-top" />
            <BaseIcon v-else name="uni-standard" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ marketTypeText }}
            </div>
          </template>
        </VMenu>

        <BaseSelect v-if="isBase" v-model="baseType" :options="baseOptions" popper />
        <BaseSelect v-else v-model="threeType" :options="threeOptions" popper disabled />
      </div>
    </div>
    <AppSportsTab v-model="currentGame" :list="gameList" />
    <div style="width: 233.64px;">
      <AppSportsBetButton />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports-home {}

.sports-page-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    font-size: var(--tg-font-size-md);
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    gap: var(--tg-spacing-8);
  }
  .right{
    display: flex;
  }
}
</style>

<route lang="yaml">
name: sports-home
meta:
  layout: sports-home
  top: sports-home
</route>
