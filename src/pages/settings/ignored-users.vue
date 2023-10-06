<script lang="ts" setup>
const { bool: loading } = useBoolean(false)
interface IColumns {
  title?: string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
  width?: number
}
const columns: IColumns[] = [
  {
    title: '行动',
    dataIndex: 'action',
    slot: 'action',
    align: 'center',
  },
  {
    title: '玩家',
    dataIndex: 'player',
    slot: 'player',
    align: 'center',
  },
]
const tableData: any = [
  {
    action: '解除拉黑',
    player: 'littlemissmay',
    vipIcon: 'chat-star-gold',
  },
  {
    action: '解除拉黑',
    player: 'littlemissmay',
    vipIcon: 'chat-star-gold',
  },
]
const paginationData = {
  pageSize: 10,
  pageNumber: 1,
  total: 0,
}
</script>

<template>
  <div class="tg-settings-ignored-users">
    <BaseTable
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
    >
      <template #action="{ record }">
        <div class="unblack">
          {{ record.action }}
        </div>
      </template>
      <template #player="{ record }">
        <div class="user-info">
          <VMenu placement="top">
            <div class="cursor-help">
              <BaseIcon :name="record.vipIcon" />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                等级描述
              </div>
            </template>
          </VMenu>
          <BaseButton type="text" class="user-name">
            {{ record.player }}
          </BaseButton>
        </div>
      </template>
    </BaseTable>
    <AppStack :pagination-data="paginationData" />
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-ignored-users {
  .unblack{
    color: var(--tg-text-error);
    cursor: pointer;
    font-weight: var(--tg-font-weight-bold);
    &:active{
      transform: scale(.96);
    }
  }
  .user-info{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    .user-name{
      padding: var(--tg-spacing-7) 0 !important;
    }
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 黑名单 – Stake.com
</route>
