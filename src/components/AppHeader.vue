<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const { isLogin } = storeToRefs(appStore)
const { isMobile, isLessThanLg, width } = storeToRefs(useWindowStore())
const { rightIsExpand, openRightSidebar, currentRightSidebarContent, closeRightSidebar } = useRightSidebar()
const { bool: showSearchBar, setTrue } = useBoolean(false)
const { bool: showDialogLogout, setTrue: setShowDialogLogoutTrue, setFalse: setDialogLogoutFalse } = useBoolean(false)
const { openWalletDialog } = useWalletDialog()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const { openVipDialog } = useVipDialog()
const { openStatisticsDialog } = useStatisticsDialog()
const { openSafeDialog } = useSafeDialog()
const { run: runMemberLoginout, loading: loginoutLoading } = useRequest(ApiMemberLoginout, {
  onSuccess() {
    appStore.removeToken()
    setDialogLogoutFalse()
    router.push('/')
  },
})

const userMenu = ref([
  { id: 1, icon: 'navbar-wallet', title: t('wallet'), name: 'wallet' },
  { id: 2, icon: 'navbar-cart', title: t('safe'), name: 'safe' },
  { id: 3, icon: 'spt-airbonus', title: 'VIP', name: 'vip' },
  { id: 4, icon: 'chess-affiliate', title: t('affiliate'), name: 'affiliate', path: '/affiliate/overview' },
  { id: 5, icon: 'uni-trend', title: t('statistical_data'), name: 'statistical-data' },
  { id: 6, icon: 'tabbar-bet', title: t('transaction_record'), name: 'transaction-record', path: '/transactions/deposits' },
  { id: 7, icon: 'spt-basketball', title: t('sports_betting'), name: 'sports-betting' },
  { id: 8, icon: 'uni-set', title: t('setting'), name: 'setting', path: '/settings/general' },
  { id: 9, icon: 'spt-secure', title: t('stake_safety'), name: 'stake-safety' },
  { id: 10, icon: 'chess-online-support', title: t('online_support'), name: 'online-support' },
  { id: 11, icon: 'uni-logout', title: t('logout'), name: 'logout' },
])
const newsMenu = ref([
  { id: 1, icon: 'chess-discuss', title: t('chat_room'), name: 'chat-room', shown: EnumRightSidebarContent.CHATROOM },
  { id: 2, icon: 'spt-user-bet', title: t('bet_slip'), name: 'bet-slip', shown: EnumRightSidebarContent.BETTING },
])

// 选中状态
const getActiveState = computed(() => {
  return (path: string | undefined) => path === route.path
})
const getActiveShown = computed(() => {
  return (shown: string) => rightIsExpand.value && shown === currentRightSidebarContent.value
})

function handleClickMenuItem(item: { name: string; path?: string }) {
  const { name, path } = item
  if (path) {
    router.push(path)
    return
  }
  switch (name) {
    case 'wallet':
      openWalletDialog()
      break
    case 'safe':
      openSafeDialog()
      break
    case 'logout':
      setShowDialogLogoutTrue()
      break
    case 'vip':
      openVipDialog()
      break
    case 'statistical-data':
      openStatisticsDialog()
      break
    case 'chat-room':
      getActiveShown.value(EnumRightSidebarContent.CHATROOM) ? closeRightSidebar() : openRightSidebar(EnumRightSidebarContent.CHATROOM)
      break
    case 'bet-slip':
      getActiveShown.value(EnumRightSidebarContent.BETTING) ? closeRightSidebar() : openRightSidebar(EnumRightSidebarContent.BETTING)
      break
    case 'notification':
      getActiveShown.value(EnumRightSidebarContent.NOTIFICATION) ? closeRightSidebar() : openRightSidebar(EnumRightSidebarContent.NOTIFICATION)
      break
    case 'sports-betting':
      router.push('/sports/my-bets')
      break
    default:
      break
  }
}
</script>

<template>
  <div class="app-header" :style="{ 'grid-template-columns': `1fr ${isLogin ? 'auto' : ''} 1fr` }">
    <BaseLogo :use-small="width < 376" />
    <AppWallet v-if="isLogin" />
    <div v-if="isLogin" class="header-box">
      <div class="header-right">
        <BaseButton v-show="!isMobile" type="text" class="search-btn" @click="setTrue">
          <BaseIcon class="icon-search" name="uni-search" />
          <span v-show="!isLessThanLg">{{ t('search') }}</span>
        </BaseButton>
        <VDropdown :distance="6">
          <BaseButton type="text">
            <BaseIcon class="icon-size" name="navbar-user" />
          </BaseButton>
          <template #popper="{ hide }">
            <div class="dropdown-popper need-pad-y">
              <div
                v-for="item of userMenu" :key="item.id" class="menu-item"
                :class="{ 'active-menu': getActiveState(item.path) }" @click=" hide(); handleClickMenuItem(item)"
              >
                <div class="menu-btn">
                  <BaseIcon class="icon-size" :name="item.icon" />
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </template>
        </VDropdown>
        <BaseButton type="text" @click="handleClickMenuItem({ name: 'notification' })">
          <BaseIcon class="icon-size" name="navbar-notice" />
        </BaseButton>
        <VDropdown :distance="6">
          <BaseButton v-show="!isMobile" type="text">
            <BaseIcon class="icon-size" name="header-news" />
          </BaseButton>
          <template #popper="{ hide }">
            <div class="dropdown-popper need-pad-y">
              <div
                v-for="item of newsMenu" :key="item.id" class="menu-item"
                :class="{ 'active-menu': getActiveShown(item.shown) }" @click="hide(); handleClickMenuItem(item)"
              >
                <div class="menu-btn">
                  <BaseIcon class="icon-size" :name="item.icon" />
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </template>
        </VDropdown>
      </div>
      <AppGlobalSearch v-if="showSearchBar && !isMobile" @close="() => showSearchBar = false" />
    </div>
    <div v-else class="header-login">
      <BaseButton type="text" class="login" @click.stop="openLoginDialog()">
        {{ t('login') }}
      </BaseButton>
      <BaseButton class="reg" bg-style="primary" @click.stop="openRegisterDialog()">
        {{ t('reg') }}
      </BaseButton>
    </div>
  </div>
  <BaseDialog v-model:show="showDialogLogout" icon="uni-trend" title="登出">
    <div class="dialog">
      <div class="dialog-text">
        {{ t('logout_dont_foget') }}
      </div>
      <BaseButton class="dialog-btn" type="text" :loading="loginoutLoading" @click.stop="runMemberLoginout">
        {{ t('logout') }}
      </BaseButton>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding: var(--tg-spacing-16) var(--tg-spacing-16);

  &-text {
    font-size: var(--tg-font-size-xs);
    color: var(--tg-text-lightgrey);
  }

  &-btn {
    color: var(--tg-text-white) !important;
    background: var(--tg-button-secondary-main);
  }
}

.app-header {
  display: grid;
  gap: 1rem;
  align-items: center;

  .icon-size {
    font-size: var(--tg-font-size-base);
  }

  .header-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    --tg-icon-color: var(--tg-text-white);

    span {
      margin-left: 8px;
      font-size: var(--tg-font-size-default);
    }

    .search-btn {
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);

      .icon-search {
        font-size: var(--tg-font-size-base);
      }
    }
  }

  .header-login {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--tg-text-white);
    text-align: center;
    font-family: PingFang SC;
    font-size: var(--tg-font-size-default);
    font-style: normal;
    font-weight: 600;

    .login {
      width: 68px;
      height: 44px;
      padding: var(--tg-spacing-button-padding-vertical-md) var(--tg-spacing-button-padding-vertical-2xl) !important;
      color: var(--tg-text-white);
    }

    .reg {
      display: flex;
      width: 68px;
      height: 44px;
      padding: var(--tg-spacing-button-padding-vertical-md) var(--tg-spacing-button-padding-vertical-2xl) !important;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background: #1475E1;
    }
  }
}

.dropdown-popper {
  --tg-icon-color: var(--tg-text-secondary-main);
  color: var(--tg-text-secondary-main);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .icon-size {
    font-size: var(--tg-font-size-default);
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
      padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);
    }

    .menu-btn:active {
      transform: scale(0.95);
    }
  }

  .active-menu {
    --tg-icon-color: var(--tg-text-blue);
    color: var(--tg-text-blue);

    &:hover {
      background: 0 0;
    }
  }
}
</style>
