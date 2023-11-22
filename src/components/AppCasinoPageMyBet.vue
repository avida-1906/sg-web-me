<script setup lang='ts'>
const { t } = useI18n()

const columns = [
  {
    title: '游戏',
    width: 90,
    dataIndex: 'game',
    slot: 'game',
    align: 'left',
  },
  {
    title: '投注编号',
    width: 90,
    dataIndex: 'id',
    slot: 'id',
    align: 'center',
  },
  {
    title: '日期',
    width: 90,
    dataIndex: 'time',
    slot: 'time',
    align: 'center',
  },
  {
    title: '投注额',
    width: 90,
    dataIndex: 'amount',
    slot: 'amount',
    align: 'left',
  },
  {
    title: '乘数',
    width: 90,
    dataIndex: 'x',
    slot: 'x',
    align: 'center',
  },
  {
    title: '支付额',
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
    >
      <!-- :loading="loading" -->
      <template #time="{ record }">
        <div>{{ record.time }}</div>
      </template>
      <template #amount="{ record }">
        <div class="to-right">
          <AppAmount
            :amount="record.amount"
            :currency-type="record.currencyType"
          />
        </div>
      </template>
    </BaseTable>
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
