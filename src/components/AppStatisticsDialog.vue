<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])

const { bool: showDialog } = useBoolean(true)
interface VipProgressData {
  percent: number
  currentLevel: number
}
const vipProgressData: VipProgressData = {
  percent: 60,
  currentLevel: 3,
}

const tab = ref('1')
const tabList = [
  { label: '统计数据', value: '1' },
  { label: '奖杯', value: '2' },
  { label: '竞赛', value: '3' },
  { label: '抽奖活动', value: '4' },
]
</script>

<template>
  <div class="app-statistics-dialog">
    <BaseDialog v-model:show="showDialog" icon="uni-trend" title="Statistics">
      <div class="statistics-content">
        <p class="s-user-name">
          alanhayashi
        </p>
        <div class="s-join-date">
          <span>加入日期：</span>
          <span>2023年9月19日</span>
        </div>
        <AppVipProgress :vip-progress-data="vipProgressData" />
        <div class="s-tab">
          <BaseTab v-model="tab" :list="tabList" />
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<style lang='scss' scoped>
.app-statistics-dialog{
  .statistics-content{
    padding: var(--tg-spacing-2) var(--tg-spacing-16);
    .s-user-name {
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-md);
      line-height: 27px;
      padding-bottom: var(--tg-spacing-2);
      font-weight: var(--tg-font-weight-semibold);
    }
    .s-join-date{
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-xs);
      margin-bottom: var(--tg-spacing-20);
      span:nth-child(2){
        font-weight: var(--tg-font-weight-semibold);
      }
    }
    .s-tab{
      margin-top: 36px;
    }
  }
}
</style>
