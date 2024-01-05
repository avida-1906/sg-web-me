<script setup lang='ts'>
const currentTab = defineModel({ type: String, required: true })

type TabItem = typeof tabList[number]

const tabList = [
  { label: '今日赛事', value: '1', icon: 'spt-event-jin' },
  { label: '滚球盘', value: '2', icon: 'spt-ball-plate' },
  { label: '早盘', value: '3', icon: 'spt-event-zao' },
  { label: '串关', value: '4', icon: 'spt-event-chuan' },
  { label: '冠军', value: '5', icon: 'spt-event-win' },
]

function onClick(item: TabItem) {
  currentTab.value = item.value
}
</script>

<template>
  <div class="event-type-tab">
    <div
      v-for="t in tabList" :key="t.value" class="tab"
      :class="{ active: t.value === currentTab }"
      @click="onClick(t)"
    >
      <BaseIcon :name="t.icon" :has-transition="false" />
      <span>{{ t.label }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.event-type-tab {
  font-size: var(--tg-font-size-md);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-lightgrey);
  display: flex;
  gap: var(--tg-spacing-26);

  .tab {
    display: flex;
    gap: var(--tg-spacing-8);
    align-items: center;
    line-height: 25px;
    cursor: pointer;

    &:active {
      transform: scale(0.96);
    }

    &:hover,&.active {
      color: var(--tg-text-white);
      --tg-icon-color: var(--tg-text-white);
    }
  }
}
</style>
