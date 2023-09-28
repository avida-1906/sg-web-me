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
    action: '接触拉黑',
    player: 'littlemissmay',
    vipIcon: 'chat-star-orange',
  },
  {
    action: '接触拉黑',
    player: 'littlemissmay',
    vipIcon: 'chat-star-orange',
  },
]
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
          <BaseIcon :name="record.vipIcon" /> {{ record.player }}
        </div>
      </template>
    </BaseTable>
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
  }
}
</style>
