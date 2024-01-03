<script lang="ts" setup>
interface IColumns {
  title?: string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
  width?: number
}

const { t } = useI18n()
usePageTitle({ prefix: t('menu_title_settings_ignoredusers') })

const { bool: loading } = useBoolean(false)

const columns: IColumns[] = [
  {
    title: t('action'),
    dataIndex: 'action',
    slot: 'action',
    align: 'center',
  },
  {
    title: t('gamer'),
    dataIndex: 'player',
    slot: 'player',
    align: 'center',
  },
]
const tableData: any = [
  {
    action: t('cancel_ignore'),
    player: 'littlemissmay',
    vipIcon: 'chat-star-gold',
  },
  {
    action: t('cancel_ignore'),
    player: 'littlemissmay',
    vipIcon: 'chat-star-gold',
  },
]
const paginationData = {
  pageSize: 10,
  page: 1,
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
          <VTooltip placement="top">
            <div class="cursor-help">
              <BaseIcon :name="record.vipIcon" />
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ t('level_desc') }}
              </div>
            </template>
          </VTooltip>
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
</route>
