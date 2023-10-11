<script setup lang='ts'>
interface IVipProgressData {
  percent: number // vip进度百分比
  currentLevel: number // 当前vip级别
}
interface Props {
  vipProgressData: IVipProgressData
}

const props = withDefaults(defineProps<Props>(), {
  vipProgressData: () => {
    return {
      percent: 0,
      currentLevel: 0,
    }
  },
})

const levels = [
  { level: 0, icon: 'chat-star-bronze', label: '暂无级别' },
  { level: 1, icon: 'chat-star-bronze', label: '铜' },
  { level: 2, icon: 'chat-star-silver', label: '银' },
  { level: 3, icon: 'chat-star-gold', label: '金' },
  { level: 4, icon: 'chat-star-bronze', label: '暂无级别' },
]

const currentInfo = computed(() => {
  return levels.find(i => i.level === props.vipProgressData.currentLevel)
})
const nextInfo = computed(() => {
  return levels.find(i => i.level === (props.vipProgressData.currentLevel + 1))
})
</script>

<template>
  <slot name="title" />
  <div class="app-vip-progress">
    <div class="percent-top">
      <slot><p>您的<span> VIP </span>进度</p></slot>
      <p>{{ props.vipProgressData.percent }}%</p>
    </div>
    <div class="percent-mid">
      <BaseProgress
        width="100%"
        :percent="props.vipProgressData.percent"
        :show-info="false"
        :stroke-width="14"
      />
    </div>
    <div class="percent-btm">
      <div>
        <BaseIcon :name="currentInfo!.icon" /> <span>{{ currentInfo?.label }}</span>
      </div>
      <div>
        <BaseIcon :name="nextInfo!.icon" /> <span>{{ nextInfo?.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-vip-progress{
  .percent-top{
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--tg-spacing-5);
  }
  .percent-btm{
    display: flex;
    justify-content: space-between;
    margin-top: var(--tg-spacing-2);
    > div{
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        margin-left: var(--tg-spacing-3);
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
      }
    }
  }
}
</style>

<style lang='scss'>
.app-vip-progress{
  .percent-mid{
    .m-progress-inner{
      background-color: var(--tg-secondary-main);
    }
  }
}
</style>
