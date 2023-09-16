<script setup lang="ts">
const loading = ref(true)
const columns: any = ref([
  {
    title: '游戏',
    width: 100,
    dataIndex: 'name',
    slot: 'name',
    align: 'left',
  },
  {
    title: '玩家',
    width: 100,
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: '时间',
    width: 100,
    dataIndex: 'job',
    slot: 'job',
    align: 'center',
  },
  {
    title: '投注额',
    width: 100,
    dataIndex: 'sex',
    align: 'center',
  },
  {
    title: '乘数',
    width: 100,
    dataIndex: 'address',
    align: 'center',
  },
  {
    title: '支付额',
    width: 100,
    dataIndex: 'address',
    align: 'right',
  },
])
const tableData: any = ref([])
onMounted(() => {
  setTimeout(() => {
    tableData.value = [
      {
        name: 'Stephen',
        age: 30,
        job: 'player',
        sex: '男',
        address: 'CaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCalifornia',
      },
      {
        name: 'Leo',
        age: 36,
        job: 'actor',
        sex: '男',
        address: 'LA',
      },
      {
        name: 'Mr.Dear',
        age: 23,
        job: 'boy',
        sex: '男',
        address: 'Beijing',
      },
      {
        name: 'superman',
        age: 32,
        job: 'boy',
        sex: '男',
        address: 'US',
      },
    ]
    loading.value = false
  }, 3000)
})
const tab = ref('1')
const tabList = [
  { value: '1', label: '我的投注' },
  { value: '2', label: '所有投注' },
  { value: '3', label: '风云榜' },
  { value: '4', label: '竞赛排行榜' },
]
</script>

<template>
  <div class="app-bet-data">
    <div style="max-width: 420px;">
      <BaseTab v-model="tab" :list="tabList" />
    </div>

    <BaseTable
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
    >
      <template #name="record">
        hello {{ record.name }}
      </template>
      <template #job="{ job }">
        hi {{ job }}
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss" scoped>
.app-bet-data{

}
</style>
