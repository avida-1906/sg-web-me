<script setup lang='ts'>
const route = useRoute()
const sport = route.params.sport

ApiSportOutrightList({ si: +sport, page: 1, page_size: 100 })
const isOpen = true

const list = [
  {
    si: 1,
    sn: '足球',
    pgid: '100',
    pgn: '地区1',
    ci: '11',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '200',
    pgn: '地区2',
    ci: '21',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '300',
    pgn: '地区3',
    ci: '31',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '100',
    pgn: '地区1',
    ci: '12',
    cn: '联赛2',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '500',
    pgn: '地区5',
    ci: '51',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '100',
    pgn: '地区1',
    ci: '13',
    cn: '联赛3',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '400',
    pgn: '地区4',
    ci: '41',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '500',
    pgn: '地区5',
    ci: '52',
    cn: '联赛2',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '600',
    pgn: '地区6',
    ci: '61',
    cn: '联赛1',
  },
  {
    si: 1,
    sn: '足球',
    pgid: '200',
    pgn: '地区2',
    ci: '22',
    cn: '联赛2',
  },
]

const arr = []
for (let i = 0; i < list.length; i++) {
  if (i === 0) {
    const league = { ci: list[i].ci, cn: list[i].cn, list: [list[i]] }
    const region = { pgid: list[i].pgid, pgn: list[i].pgn, list: [league] }
    arr.push(region)
    continue
  }
  // 地区
  // const rIndex = arr.
}
console.log('🚀 ~ file: outrights.vue:92 ~ arr:', arr)
</script>

<template>
  <!-- 热门 -->
  <div class="sports-page-title">
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-sort-az" />
        <span>按字母顺序排列</span>
      </div>
    </div>
  </div>
  <BaseSecondaryAccordion
    title="234"
    level="1"
    :init="true"
    icon="spt-game-intl"
  >
    <div v-show="isOpen" class="content" :class="{ 'is-open': isOpen }">
      <div class="acc-box">
        <AppOutrightPreview title="123" :auto-show="true" :count="20" />
      </div>
    </div>
  </BaseSecondaryAccordion>
</template>

<style lang='scss' scoped>
.content {
  background: var(--content-background);
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);

  &.is-open {
    border-top: 2px solid var(--content-border);
  }
}

.acc-box {
  display: grid;
  grid-auto-flow: row;
  justify-content: stretch;
  align-items: center;
  gap: var(--tg-spacing-12);
  padding: var(--tg-spacing-8);
}
</style>
