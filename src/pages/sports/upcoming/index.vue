<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const currentGame = ref('2')
const gameList = [
  { name: '全部', num: 1754, id: '1' },
  { name: '网球', num: 711, id: '2' },
  { name: '足球', num: 123, id: '3' },
  { name: '美式橄榄球', num: 110, id: '4' },
  { name: '棒球', num: 7, id: '5' },
  { name: '篮球', num: 10, id: '6' },
  { name: '乒乓球', num: 198, id: '7' },
  { name: '板球', num: 28, id: '8' },
  { name: '英式橄榄球', num: 30, id: '9' },
  { name: '冰上曲棍球', num: 9, id: '10' },
  { name: '排球', num: 66, id: '11' },
  { name: '传说对决', num: 19, id: '12' },
  { name: '澳洲足球', num: 68, id: '13' },
  { name: '拳击', num: 6, id: '14' },
  { name: 'CS:GO', num: 8, id: '15' },
  { name: '飞镖', num: 33, id: '16' },
  { name: '刀塔2', num: 30, id: '17' },
  { name: 'eCricket', num: 1, id: '18' },
  { name: 'FIFA', num: 6, id: '19' },
  { name: '地板球', num: 7, id: '21' },
  { name: '五人制足球', num: 2, id: '22' },
  { name: '手球', num: 3, id: '23' },
  { name: '英雄联盟', num: 8, id: '24' },
  { name: '综合格斗', num: 11, id: '25' },
  { name: '无尽对决', num: 8, id: '26' },
  { name: 'NBA2K', num: 16, id: '27' },
  { name: '彩虹六号', num: 4, id: '28' },
  { name: '桌球', num: 9, id: '29' },
  { name: '星际争霸2', num: 2, id: '30' },
  { name: '无畏契约', num: 12, id: '31' },
  { name: '魔兽争霸3', num: 4, id: '32' },
  { name: '水球', num: 16, id: '33' },
]
const isAll = computed(() => currentGame.value === '1')
const { bool: isStandard, toggle: toggleBase } = useBoolean(true)
const marketTypeText = computed(() => isStandard.value ? '三项投注' : '标准')
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
watch(currentGame, (a) => {
  if (a === '1')
    isStandard.value = true
})
</script>

<template>
  <div class="tg-sports-upcoming" :class="{ 'on-page': onPage }">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-timing" />
        <h6>即将开赛</h6>
      </div>
      <div class="right">
        <VMenu placement="top">
          <BaseButton size="sm" type="text" :disabled="isAll" @click="toggleBase">
            <BaseIcon v-if="isStandard" name="uni-three-top" />
            <BaseIcon v-else name="uni-standard" />
          </BaseButton>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ marketTypeText }}
            </div>
          </template>
        </VMenu>
        <BaseSelect
          v-if="isStandard"
          v-model="baseType"
          :options="baseOptions"
          popper
        />
        <BaseSelect
          v-else
          v-model="threeType"
          :options="threeOptions"
          popper
          disabled
        />
      </div>
    </div>
    <AppSportsTab v-model="currentGame" :list="gameList" />

    <div class="market-wrapper">
      <AppSportsMarket show-breadcrumb :is-standard="isStandard" />
      <AppSportsMarket show-breadcrumb :is-standard="isStandard" />
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-upcoming {
  margin-top: var(--tg-spacing-24);
  &.on-page{
    margin-top: 0;
  }
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
