<script lang="ts" setup>
interface Column {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}

const { t } = useI18n()
usePageTitle({ prefix: t('account_session') })

// const selectValue = ref('1')
// const selectOptions = [
//   { label: '全部', value: '1' },
//   { label: '活跃', value: '2' },
//   { label: '不活跃', value: '3' },
// ]
const popperShow: Ref<boolean[]> = ref([])
const popperShow2: Ref<boolean[]> = ref([])
const columns: Column[] = [
  {
    title: t('browser'),
    dataIndex: 'browser',
    width: 150,
    align: 'center',
    slot: 'browser',
  },
  {
    title: t('area'),
    dataIndex: 'near',
    width: 150,
    align: 'center',
    slot: 'near',
  },
  {
    title: t('login_ip_title'),
    dataIndex: 'addr',
    width: 150,
    align: 'center',
  },
  {
    title: t('login_time'),
    dataIndex: 'lastUsed',
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

function handleShow(index: number) {
  setTimeout(() => {
    popperShow.value[index] = false
  }, 3000)
}

function handleShow2(index: number) {
  setTimeout(() => {
    popperShow2.value[index] = false
  }, 3000)
}

const tableData = computed(() => {
  if (loginLogList) {
    return loginLogList.value.map((item) => {
      const temp = {
        browser: item.browser,
        near: item.ipaddress,
        addr: item.loginip,
        lastUsed: timeToFromNow(item.created_at),
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
            <BaseButton
              type="text"
              size="xs"
              style="--tg-base-button-padding-x:var(--tg-spacing-7);
            --tg-base-button-padding-y:var(--tg-spacing-8);"
            >
              <span>
                {{ record.action }}
              </span>
            </BaseButton>
          </div>
        </template>
        <template #browser="{ record, index }">
          <VDropdown
            v-model:shown="popperShow[index]"
            :distance="6"
            @show="handleShow(index)"
          >
            <div>
              {{ record.browser.length > 20
                ? (`${record.browser.slice(0, 20)}...`)
                : record.browser }}
            </div>
            <template #popper>
              <div class="popper-text">
                {{ record.browser }}
              </div>
            </template>
          </VDropdown>
        </template>
        <template #near="{ record, index }">
          <VDropdown
            v-model:shown="popperShow2[index]"
            :distance="6"
            @show="handleShow2(index)"
          >
            <div>
              {{ record.near.length > 20
                ? (`${record.near.slice(0, 20)}...`)
                : record.near }}
            </div>
            <template #popper>
              <div class="popper-text">
                {{ record.near }}
              </div>
            </template>
          </VDropdown>
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
.session-title {
  color: var(--tg-secondary-light);
}
.tg-settings-sessions {
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
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
  }

}
.popper-text{
  max-width: 300px;
  max-height: inherit;
  padding: var(--tg-spacing-12);
  line-height: 1.2;
}
</style>

<route lang="yaml">
</route>
