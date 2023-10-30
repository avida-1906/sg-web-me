<script lang="ts" setup>
interface Column {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}

// const selectValue = ref('1')
// const selectOptions = [
//   { label: '全部', value: '1' },
//   { label: '活跃', value: '2' },
//   { label: '不活跃', value: '3' },
// ]
const columns: Column[] = [
  {
    title: '登陆时间',
    dataIndex: 'lastUsed',
    width: 200,
    align: 'center',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 150,
    align: 'center',
  },
  {
    title: '地区',
    dataIndex: 'near',
    width: 150,
    align: 'center',
  },
  {
    title: 'IP',
    dataIndex: 'addr',
    width: 150,
    align: 'center',
  },
]

const {
  list: loginLogList,
  runAsync: loginLogRunAsync,
  page,
  page_size,
  total,
  prev,
  next,
} = useList(ApiMemberFrontLoginLogList, {}, { page_size: 10 })

const tableData = computed(() => {
  if (loginLogList) {
    return loginLogList.value.map((item) => {
      const temp = {
        browser: item.browser,
        near: item.ipaddress,
        addr: item.loginip,
        lastUsed: application.timestampToTime(Number(item.created_at) * 1000),
      }
      return temp
    })
  }
})

application.allSettled([loginLogRunAsync()])
</script>

<template>
  <div class="tg-settings-sessions">
    <!-- <div class="session-title">
      会话筛选器
    </div>
    <div class="session-select">
      <BaseSelect v-model="selectValue" :options="selectOptions" small />
    </div> -->
    <div class="scroll-x session-table">
      <BaseTable
        :columns="columns"
        :data-source="tableData"
      >
        <template #action="{ record }">
          <div class="slot-action">
            <BaseButton type="text" size="xs" class="but-action">
              <span>
                {{ record.action }}
              </span>
            </BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>
    <div class="session-page">
      <AppStack
        :pagination-data="{ page, pageSize: page_size, total }"
        @previous="prev"
        @next="next"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-sessions {
  font-size: var(--tg-font-size-default);
  // font-weight: var(--tg-font-weight-semibold);
  .session-select{
    width: 80px;
    margin-top: var(--tg-spacing-4);
    margin-bottom: var(--tg-spacing-16);
  }
  .session-table{
    font-weight: var(--tg-font-weight-default);
  }
  .session-page{
    margin-top: var(--tg-spacing-16);
  }
  .slot-action{
    span{
      color: var(--tg-text-error);
    }
    .but-action{
      padding: var(--tg-spacing-7) 0 var(--tg-spacing-8) !important;
    }
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 账户会话 – Stake.com
</route>
