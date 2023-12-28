<script setup lang="ts">
enum Game {
  CASINO = 'casino',
  SPORTS = 'sports',
}

const { t } = useI18n()
const router = useLocalRouter()
const route = useRoute()
const { leftIsExpand, openLeftSidebar, closeLeftSidebar } = useLeftSidebar()
const { isMobile } = storeToRefs(useWindowStore())
const { sideBigActiveMenu } = storeToRefs(useMenuStore())
const {
  rightIsExpand,
  currentRightSidebarContent,
  openRightSidebar,
  closeRightSidebar,
} = useRightSidebar()
const sportStore = useSportsStore()
const { isLogin } = storeToRefs(useAppStore())
const { openRegisterDialog } = useRegisterDialog()

const gameType = ref(checkGameType())

const isCasino = computed(() => gameType.value === Game.CASINO
&& !rightIsExpand.value && !leftIsExpand.value,
)
const isSports = computed(() => gameType.value === Game.SPORTS
 && !rightIsExpand.value && !leftIsExpand.value,
)
const isRouteCasino = computed(() => route.name?.toString().includes(Game.CASINO))
const isRouteSports = computed(() => route.name?.toString().includes(Game.SPORTS))
const isChat = computed(() => rightIsExpand.value
&& currentRightSidebarContent.value === EnumRightSidebarContent.CHATROOM,
)
const isCasinoBet = computed(() => rightIsExpand.value
&& currentRightSidebarContent.value === EnumRightSidebarContent.CASINOBET,
)
const isBetting = computed(() => rightIsExpand.value
&& currentRightSidebarContent.value === EnumRightSidebarContent.BETTING,
)

function checkGameType() {
  const isCasino = route.name?.toString().includes(Game.CASINO)
  const isSports = route.name?.toString().includes(Game.SPORTS)
  return isCasino ? Game.CASINO : isSports ? Game.SPORTS : ''
}
function clearGameType() {
  gameType.value = ''
}
function resetGameType() {
  gameType.value = checkGameType()
}
function clearSidebar() {
  setTimeout(() => {
    leftIsExpand.value && closeLeftSidebar()
    rightIsExpand.value && closeRightSidebar()
    Local.set(STORAGE_MENU_LEFT_EXPAND, false)
  }, 100)
}
function toggleLeftSidebar() {
  rightIsExpand.value && closeRightSidebar()

  if (leftIsExpand.value) {
    closeLeftSidebar()
    setTimeout(() => {
      resetGameType()
    }, 200)
    Local.set(STORAGE_MENU_LEFT_EXPAND, false)
  }
  else {
    openLeftSidebar()
    clearGameType()
    Local.set(STORAGE_MENU_LEFT_EXPAND, true)
  }
}
function goGame(type: Game) {
  let temp = ''

  setTimeout(() => {
    switch (type) {
      case Game.CASINO:
        if (isRouteCasino.value) {
          setTimeout(() => {
            clearSidebar()
          }, 100)
          return resetGameType()
        }
        router.push('/casino')
        gameType.value = Game.CASINO
        sideBigActiveMenu.value = ''
        break
      case Game.SPORTS:
        temp = `/sports/${getSportsPlatId()}`
        if (isRouteSports.value) {
          setTimeout(() => {
            clearSidebar()
          }, 100)
          return resetGameType()
        }
        router.push(temp)
        gameType.value = Game.SPORTS
        sideBigActiveMenu.value = ''
        break
      default:
        break
    }
    setTimeout(() => {
      clearSidebar()
    }, 100)
  }, 0)
}

function closeRightAndReset() {
  if (rightIsExpand.value) {
    closeRightSidebar()
    setTimeout(() => {
      resetGameType()
    }, 200)
  }
}
function resetRightSidebar() {
  currentRightSidebarContent.value = null
}
function openBar(type: 'bet' | 'bet-slip' | 'chat') {
  Local.set(STORAGE_MENU_LEFT_EXPAND, false)
  leftIsExpand.value && closeLeftSidebar()

  switch (type) {
    case 'bet':
      if (rightIsExpand.value) {
        if (currentRightSidebarContent.value === EnumRightSidebarContent.CASINOBET)
          return closeRightAndReset()
        currentRightSidebarContent.value = EnumRightSidebarContent.CASINOBET
        return
      }
      resetRightSidebar()
      openRightSidebar(EnumRightSidebarContent.CASINOBET)
      break
    case 'bet-slip':
      if (rightIsExpand.value) {
        if (currentRightSidebarContent.value === EnumRightSidebarContent.BETTING)
          return closeRightAndReset()
        currentRightSidebarContent.value = EnumRightSidebarContent.BETTING
        return
      }
      resetRightSidebar()
      openRightSidebar(EnumRightSidebarContent.BETTING)
      if (!isLogin.value)
        openRegisterDialog()
      break
    case 'chat':
      if (rightIsExpand.value) {
        if (currentRightSidebarContent.value === EnumRightSidebarContent.CHATROOM)
          return closeRightAndReset()
        currentRightSidebarContent.value = EnumRightSidebarContent.CHATROOM
        return
      }
      resetRightSidebar()
      openRightSidebar(EnumRightSidebarContent.CHATROOM)
      break
    default:
      break
  }
  clearGameType()
}

watch(() => route.path, () => {
  if (isMobile.value) {
    clearSidebar()
    resetGameType()
  }
})
</script>

<template>
  <div class="app-footer-bar">
    <div class="bar-item" :class="{ active: leftIsExpand }">
      <BaseButton type="text" size="none" @click="toggleLeftSidebar">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-menu" />
          </div>
          <span>{{ t('scan') }}</span>
        </div>
      </BaseButton>
    </div>
    <div class="bar-item" :class="{ active: isCasino }">
      <BaseButton type="text" size="none" @click="goGame(Game.CASINO)">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-game" />
          </div>
          <span>{{ t('casino') }}</span>
        </div>
      </BaseButton>
    </div>
    <div
      v-show="!isRouteSports" class="bar-item"
      :class="{ active: isCasinoBet }"
    >
      <BaseButton type="text" size="none" @click="openBar('bet')">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-bet" />
          </div>
          <span>{{ t('menu_title_settings_bets') }}</span>
        </div>
      </BaseButton>
    </div>
    <div
      v-show="isRouteSports" class="bar-item"
      :class="{ active: isBetting }"
    >
      <BaseButton type="text" size="none" @click="openBar('bet-slip')">
        <div class="bar-btn">
          <BaseBadge
            mode="active"
            :count="sportStore.cart.count"
            :max="99999"
          >
            <div class="bar-icon">
              <BaseIcon name="spt-user-bet" />
            </div>
          </BaseBadge>
          <span>{{ t('bet_slip') }}</span>
        </div>
      </BaseButton>
    </div>
    <div class="bar-item" :class="{ active: isSports }">
      <BaseButton type="text" size="none" @click="goGame(Game.SPORTS)">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="spt-basketball" />
          </div>
          <span>{{ t('sports') }}</span>
        </div>
      </BaseButton>
    </div>
    <div class="bar-item" :class="{ active: isChat }">
      <BaseButton type="text" size="none" @click="openBar('chat')">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-chat" />
          </div>
          <span>{{ t('chat_room') }}</span>
        </div>
      </BaseButton>
    </div>
    <div :id="EnumSportEndDomID.H5_CART_END_DOM" class="h5-end-dom" />
  </div>
</template>

<style lang="scss" scoped>
.app-footer-bar {
  --tg-badge-font-size: 10px;
  --tg-badge-min-width: 16px;
  --tg-badge-height: 16px;
  --tg-badge-border-radius:50%;
  --tg-badge-line-height:16px;
  --tg-badge-padding-x:0;
  background: var(--tg-secondary-dark);
  width: 100%;
  height: var(--tg-footerbar-height);
  padding:0 var(--tg-spacing-16);
  line-height: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  justify-items: center;
  overflow: hidden;
  z-index: var(--tg-z-index-30);

  .h5-end-dom {
    position: absolute;
    width: 20px;
    left: 50%;
    top: 0;
    transform: translate(-50%,0);
  }
  .bar-item{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .bar-btn{
      display: flex;
      justify-content: center;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      gap: var(--tg-spacing-4);
      span{
        font-size: var(--tg-font-size-xs);
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-semibold);
        line-height: 1;
      }
      .bar-icon{
        font-size: var(--tg-font-size-base);
        height: 18px;
      }
    }

  }
  .active{
    --tg-icon-color: #fff;
    position: relative;
    &:before{
      content: "";
      position: absolute;
      top: 0;
      min-height: var(--tg-border-width-md);
      width: 60%;
      background-color: var(--tg-text-lightblue);
    }
  }
}
</style>
