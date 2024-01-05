<script lang="ts" setup>
const { t } = useI18n()
const router = useLocalRouter()
const route = useRoute()
const appStore = useAppStore()
const { isLogin, companyData, userInfo } = storeToRefs(appStore)
const { isMobile, appContentWidth } = storeToRefs(useWindowStore())
const {
  rightIsExpand,
  openRightSidebar,
  currentRightSidebarContent,
  closeRightSidebar,
} = useRightSidebar()
const { leftIsExpand, closeLeftSidebar } = useLeftSidebar()
const { bool: showSearchBar, setTrue } = useBoolean(false)
const { openWalletDialog } = useWalletDialog()
const { openStatisticsDialog } = useStatisticsDialog()
const { openSafeDialog } = useSafeDialog()
const { openLogoutDialog } = useLogoutDialog()
const { openService } = useService()

const isRouteSports = computed(() => route.name?.toString().includes('sports'))
const userMenu = computed(() => ([
  { id: 1, icon: 'navbar-wallet', title: t('wallet'), name: 'wallet' },
  { id: 2, icon: 'navbar-cart', title: t('safe'), name: 'safe' },
  {
    id: 3,
    icon: 'spt-airbonus',
    title: 'VIP',
    name: 'vip',
    path: '/vip/promotion-bonus',
  },
  {
    id: 4,
    icon: 'chess-affiliate',
    title: t('affiliate'),
    name: 'affiliate',
    path: '/affiliate/promotion-tutorial',
  },
  {
    id: 5,
    icon: 'uni-trend',
    title: t('statistical_data'),
    name: 'statistical-data',
  },
  {
    id: 6,
    icon: 'tabbar-bet',
    title: t('transaction_record'),
    name: 'transactions',
    path: appContentWidth.value <= 800 ? '/transactions' : '/transactions/deposits',
  },
  {

    id: 7,
    icon: 'spt-user-bet',
    title: t('my_bets'),
    name: 'my-bets',
    path: `/casino/my-bets?type=${isRouteSports.value ? 'sports' : 'casino'}`,
  },
  {
    id: 8,
    icon: 'uni-set',
    title: t('setting'),
    name: 'settings',
    path: appContentWidth.value <= 800 ? '/settings' : '/settings/general',
  },
  {
    id: 9,
    icon: 'spt-secure',
    title: t('stake_safety', { site: companyData.value?.name }),
    name: 'stake-safety',
  },
  {
    id: 10,
    icon: 'chess-online-support',
    title: t('online_support'),
    name: 'online-support',
  },
  {
    id: 11,
    icon: 'uni-logout',
    title: t('logout'),
    name: 'logout',
  },
]))
const newsMenu = computed(() => ([
  {
    id: 1,
    icon: 'chess-discuss',
    title: t('chat_room'),
    name: 'chat-room',
    shown: EnumRightSidebarContent.CHATROOM,
  },
  {

    id: 2,
    icon: 'spt-user-bet',
    title: t('bet_slip'),
    name: 'bet-slip',
    shown: EnumRightSidebarContent.BETTING,
  },
]))

// 选中状态
const getActiveState = computed(() => {
  return (path: string | undefined, name: string) => path
    ? route.path.includes(name)
    : false
})
const getActiveShown = computed(() => {
  return (shown: string) => rightIsExpand.value
  && shown === currentRightSidebarContent.value
})

function handleClickMenuItem(item: { name: string; path?: string }) {
  const { name, path } = item
  if (path) {
    if (isMobile.value && leftIsExpand.value) {
      closeLeftSidebar(() => {
        router.push(path)
      })
    }
    else {
      router.push(path)
    }
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
      openLogoutDialog()
      break
    case 'statistical-data':
      openStatisticsDialog(userInfo.value?.username)
      break
    case 'chat-room':
      getActiveShown.value(EnumRightSidebarContent.CHATROOM)
        ? closeRightSidebar()
        : openRightSidebar(EnumRightSidebarContent.CHATROOM)
      break
    case 'bet-slip':
      getActiveShown.value(EnumRightSidebarContent.BETTING)
        ? closeRightSidebar()
        : openRightSidebar(EnumRightSidebarContent.BETTING)
      break
    case 'notification':
      getActiveShown.value(EnumRightSidebarContent.NOTIFICATION)
        ? closeRightSidebar()
        : openRightSidebar(EnumRightSidebarContent.NOTIFICATION)
      isMobile.value && leftIsExpand.value && closeLeftSidebar()
      break
    case 'sports-betting':
      router.push(`/sports/${getSportsPlatId()}/my-bets?type=sports`)
      break
    case 'online-support':
      openService()
      break
    default:
      break
  }
}
</script>

<template>
  <div
    class="app-header"
    :style="{ 'grid-template-columns': isLogin ? '1fr auto 1fr' : 'auto auto' }"
  >
    <BaseLogo :use-small="appContentWidth < 376 && isLogin" is-back :static="false" />
    <AppWallet v-if="isLogin" popper-clazz="app-h-wallet" />
    <div v-if="isLogin" class="header-box">
      <div class="header-right">
        <BaseButton
          v-show="!isMobile"
          type="text"
          class="search-btn"
          @click="setTrue"
        >
          <BaseIcon class="icon-search" name="uni-search" />
          <span v-show="appContentWidth > 606">{{ t('search') }}</span>
        </BaseButton>
        <VDropdown :distance="6">
          <BaseButton type="text">
            <BaseIcon class="icon-size" name="navbar-user" />
          </BaseButton>
          <template #popper="{ hide }">
            <div class="dropdown-popper need-pad-y">
              <div
                v-for="item of userMenu" :key="item.id" class="menu-item"
                :class="{ 'active-menu': getActiveState(item.path, item.name) }"
                @click=" hide(); handleClickMenuItem(item)"
              >
                <div class="menu-btn">
                  <BaseIcon
                    class="icon-size"
                    :style="{
                      '--tg-icon-color':
                        getActiveState(item.path, item.name) ? 'var(--tg-text-blue)' : '',
                    }"
                    :name="item.icon"
                  />
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </template>
        </VDropdown>
        <BaseButton
          type="text"
          @click="handleClickMenuItem({ name: 'notification' })"
        >
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
                :class="{ 'active-menu': getActiveShown(item.shown) }"
                @click="hide(); handleClickMenuItem(item)"
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
      <AppGlobalSearch
        v-if="showSearchBar && !isMobile"
        auto-focus @close="() => showSearchBar = false"
      />
    </div>
    <div v-else class="header-login">
      <AppLoginRegisterBtns />
    </div>
  </div>
</template>

<style>
.app-h-wallet {
  --tg-app-select-currency-poptop-width: 207.5px;
}
</style>

<style lang="scss" scoped>
.app-header {
  display: grid;
  gap: 3%;
  align-items: center;
  position: relative;

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
  }
}

.dropdown-popper {
  --tg-icon-color: var(--tg-popper-color-default);
  color: var(--tg-popper-color-default);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .icon-size {
    font-size: var(--tg-font-size-default);
    margin-right: var(--tg-spacing-8);
  }

  .menu-item {
    cursor: pointer;

    &:hover {
      background-color: var(--tg-text-lightgrey);
      // .menu-btn {
      //   color: var(--tg-text-blue);
      // }
    }
    &.active-menu {
      --tg-icon-color: var(--tg-text-blue);
      color: var(--tg-text-blue);
      .menu-btn {
        --tg-icon-color: var(--tg-text-blue);
        color: var(--tg-text-blue);
      }

      &:hover {
        background: 0 0;
      }
    }
    .menu-btn {
      display: flex;
      align-items: center;
      color: var(--tg-popper-color-default);
      --tg-icon-color: var(--tg-popper-color-default);
      padding: 12px 12px;
      padding-right: 22px;
      transition: color 0.2s ease;
      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
