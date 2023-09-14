<script lang="ts" setup>
interface Props {
  isFullScreen?: boolean
}

withDefaults(defineProps<Props>(), {
  isFullScreen: false,
})
const userMenu = ref([
  { id: 1, icon: 'navbar-wallet', title: '钱包' },
  { id: 2, icon: 'navbar-cart', title: '保险库' },
  { id: 3, icon: 'spt-airbonus', title: 'VIP' },
  { id: 4, icon: 'spt-affiliate-pro', title: '联盟计划' },
  { id: 5, icon: 'uni-trend', title: '统计数据' },
  { id: 6, icon: 'tabbar-bet', title: '交易记录' },
  { id: 7, icon: 'spt-basketball', title: '体育投注' },
  { id: 8, icon: 'uni-set', title: '设置' },
  { id: 9, icon: 'spt-secure', title: 'Stake安全' },
  { id: 10, icon: 'chess-online-support', title: '在线支持' },
  { id: 11, icon: 'uni-logout', title: '登出' },
])
const newsMenu = ref([
  { id: 1, icon: 'chess-discuss', title: '聊天室' },
  { id: 2, icon: 'spt-user-bet', title: '投注单' },
])
</script>

<template>
  <div class="app-header">
    <BaseAspectRatio ratio="2/1" width="67px">
      <BaseLogo mode="svg" svg-name="app-logo" />
    </BaseAspectRatio>
    <div class="header-middle">
      <BaseWallet />
    </div>
    <div class="header-right">
      <BaseButton v-show="!isFullScreen" type="text" class="search-btn">
        <BaseIcon class="icon-search" name="header-search" />
        <span>搜索</span>
      </BaseButton>
      <VDropdown :distance="6">
        <BaseButton type="text">
          <BaseIcon class="icon-size" name="header-user" />
        </BaseButton>
        <template #popper>
          <div class="dropdown-popper">
            <div v-for="item of userMenu" :key="item.id" class="menu-item">
              <div class="menu-btn">
                <BaseIcon class="icon-size" :name="item.icon" />
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </template>
      </VDropdown>
      <BaseButton type="text">
        <BaseIcon class="icon-size" name="header-notice" />
      </BaseButton>
      <VDropdown :distance="6">
        <BaseButton v-show="!isFullScreen" type="text">
          <BaseIcon class="icon-size" name="header-news" />
        </BaseButton>
        <template #popper>
          <div class="dropdown-popper">
            <div v-for="item of newsMenu" :key="item.id" class="menu-item">
              <div class="menu-btn">
                <BaseIcon class="icon-size" :name="item.icon" />
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </template>
      </VDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  .icon-size{
    font-size: var(--tg-font-size-md);
  }
  .header-right{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    span{
      margin-left: 5px;
    }
    .search-btn{
      color:var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
      // padding-top: var(--tg-spacing-button-padding-vertical-s) !important;
      // padding-bottom: var(--tg-spacing-button-padding-vertical-s) !important;
      .icon-search{
        --tg-icon-color: var(--tg-text-white);
        font-size: var(--tg-font-size-xl);
      }
    }
  }
}
.dropdown-popper{
  --tg-icon-color: var(--tg-primary-main);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  .icon-size{
    font-size: var(--tg-font-size-md);
    margin-right: 5px;
  }
  .menu-item{
    cursor: pointer;
    &:hover{
      background-color: var(--tg-secondary-light);
    }
    .menu-btn{
      display: flex;
      align-items: center;
      padding: var(--tg-spacing-button-padding-vertical-s) var(--tg-spacing-button-padding-horizontal-xs);
    }
    .menu-btn:active{
      transform: scale(0.93);
    }
  }
}
</style>
