<script lang="ts" setup>
const { isFullScreen, isFixed, width } = storeToRefs(useWindowStore())
const { t } = useI18n()
const userMenu = ref([
  { id: 1, icon: 'navbar-wallet', title: t('wallet'), name: 'wallet' },
  { id: 2, icon: 'navbar-cart', title: t('safe'), name: 'safe' },
  { id: 3, icon: 'spt-airbonus', title: 'VIP', name: 'vip' },
  { id: 4, icon: 'spt-affiliate-pro', title: t('affiliate'), name: 'affiliate' },
  { id: 5, icon: 'uni-trend', title: t('statistical_data'), name: 'statistical-data' },
  { id: 6, icon: 'tabbar-bet', title: t('transaction_record'), name: 'transaction-record' },
  { id: 7, icon: 'spt-basketball', title: t('sports_betting'), name: 'sports-betting' },
  { id: 8, icon: 'uni-set', title: t('setting'), name: 'setting' },
  { id: 9, icon: 'spt-secure', title: t('stake_safety'), name: 'stake-safety' },
  { id: 10, icon: 'chess-online-support', title: t('online_support'), name: 'online-support' },
  { id: 11, icon: 'uni-logout', title: t('logout'), name: 'logout' },
])
const newsMenu = ref([
  { id: 1, icon: 'chess-discuss', title: t('chat_room'), name: 'chat-room' },
  { id: 2, icon: 'spt-user-bet', title: t('bet_slip'), name: 'bet-slip' },
])

const { bool: showSearchBar, setTrue } = useBoolean(false)

// Dialog
const { openWalletDialog } = useWalletDialog()
const { openVipDialog } = useVipDialog()
const { openStatisticsDialog } = useStatisticsDialog()
const { openSafeDialog } = useSafeDialog()
function handleClickMenuItem(item: { name: string }) {
  const { name } = item
  switch (name) {
    case 'wallet':
      openWalletDialog()
      break
    case 'safe':
      openSafeDialog()
      break
    case 'vip':
      openVipDialog()
      break
    case 'statistical-data':
      openStatisticsDialog()
      break
    default:
      break
  }
}
</script>

<template>
  <div class="app-header">
    <BaseLogo :use-small="width < 300" />
    <AppWallet :wallet-btn="true" />
    <div class="header-right">
      <BaseButton v-show="!isFullScreen" type="text" class="search-btn" @click="setTrue">
        <BaseIcon class="icon-search" name="header-search" />
        <span v-show="!isFixed">搜索</span>
      </BaseButton>
      <VDropdown :distance="6">
        <BaseButton type="text">
          <BaseIcon class="icon-size" name="navbar-user" />
        </BaseButton>
        <template #popper>
          <div class="dropdown-popper">
            <div v-for="item of userMenu" :key="item.id" v-close-popper class="menu-item" @click="handleClickMenuItem(item)">
              <div class="menu-btn">
                <BaseIcon class="icon-size" :name="item.icon" />
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </template>
      </VDropdown>
      <BaseButton type="text">
        <BaseIcon class="icon-size" name="navbar-notice" />
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

    <AppGlobalSearch v-if="showSearchBar && !isFullScreen" @close="() => showSearchBar = false" />
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  position: relative;

  .icon-size {
    font-size: var(--tg-font-size-md);
  }

  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    --tg-icon-color: var(--tg-text-white);

    span {
      margin-left: 5px;
    }

    .search-btn {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);

      // padding-top: var(--tg-spacing-button-padding-vertical-s) !important;
      // padding-bottom: var(--tg-spacing-button-padding-vertical-s) !important;
      .icon-search {
        font-size: var(--tg-font-size-xl);
      }
    }
  }
}

.dropdown-popper {
  --tg-icon-color: var(--tg-primary-main);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .icon-size {
    font-size: var(--tg-font-size-md);
    margin-right: 5px;
  }

  .menu-item {
    cursor: pointer;

    &:hover {
      background-color: var(--tg-text-lightgrey);
    }

    .menu-btn {
      display: flex;
      align-items: center;
      padding: var(--tg-spacing-button-padding-vertical-s) var(--tg-spacing-button-padding-horizontal-xs);
    }

    .menu-btn:active {
      transform: scale(0.95);
    }
  }
}
</style>
