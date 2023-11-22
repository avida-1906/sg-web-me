<script setup lang='ts'>
const { t } = useI18n()

const columns = [
  {
    title: t('game'),
    width: 90,
    dataIndex: 'game',
    slot: 'game',
    align: 'left',
  },
  {
    title: t('bet_number'),
    width: 90,
    dataIndex: 'id',
    slot: 'id',
    align: 'center',
  },
  {
    title: t('date'),
    width: 90,
    dataIndex: 'time',
    slot: 'time',
    align: 'center',
  },
  {
    title: t('bet_amount'),
    width: 90,
    dataIndex: 'amount',
    slot: 'amount',
    align: 'center',
  },
  {
    title: t('multiple_count'),
    width: 90,
    dataIndex: 'x',
    slot: 'x',
    align: 'center',
  },
  {
    title: t('sports_payment_amount'),
    width: 90,
    dataIndex: 'pay',
    slot: 'pay',
    align: 'center',
  },
]
const tableData = [
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
  { game: '百家乐', id: '123', time: '10:30 2023/11/10', amount: 20, x: '0.5', pay: 30 },
]
</script>

<template>
  <div class="casino-my-bets">
    <BaseTable
      v-if="tableData && tableData.length"
      :columns="columns"
      :data-source="tableData"
    />
    <div class="btns">
      <BaseButton type="text">
        上一页
      </BaseButton>
      <BaseButton type="text">
        下一页
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.casino-my-bets{
  margin-bottom: var(--tg-spacing-24);
}
.btns{
  display: flex;
  justify-content: center;

}
</style>
