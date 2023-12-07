<script setup lang="ts">
enum Game {
  CASINO = 'casino',
  SPORTS = 'sports',
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { leftIsExpand, openLeftSidebar, closeLeftSidebar } = useLeftSidebar()
const { isMobile } = storeToRefs(useWindowStore())
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
  leftIsExpand.value && closeLeftSidebar()
  rightIsExpand.value && closeRightSidebar()
}
function toggleLeftSidebar() {
  rightIsExpand.value && closeRightSidebar()

  if (leftIsExpand.value) {
    closeLeftSidebar()
    setTimeout(() => {
      resetGameType()
    }, 200)
  }
  else {
    openLeftSidebar()
    clearGameType()
  }
}
function goGame(type: Game) {
  clearSidebar()

  setTimeout(() => {
    switch (type) {
      case Game.CASINO:
        router.push('/casino')
        gameType.value = Game.CASINO
        break
      case Game.SPORTS:
        router.push(`/sports/${getSportsPlatId()}`)
        gameType.value = Game.SPORTS
        break
      default:
        break
    }
  }, 200)
}
function openBar(type: 'bet' | 'bet-slip' | 'chat') {
  leftIsExpand.value && closeLeftSidebar()

  if (rightIsExpand.value) {
    closeRightSidebar()
    setTimeout(() => {
      resetGameType()
    }, 200)

    return
  }

  switch (type) {
    case 'bet':
      openRightSidebar(EnumRightSidebarContent.CASINOBET)
      break
    case 'bet-slip':
      openRightSidebar(EnumRightSidebarContent.BETTING)
      if (!isLogin.value)
        openRegisterDialog()
      break
    case 'chat':
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
      <BaseButton type="text" @click="toggleLeftSidebar">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-menu" />
          </div>
          <span>{{ t('scan') }}</span>
        </div>
      </BaseButton>
    </div>
    <div class="bar-item" :class="{ active: isCasino }">
      <BaseButton type="text" @click="goGame(Game.CASINO)">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="tabbar-game" />
          </div>
          <span>{{ t('casino') }}</span>
        </div>
      </BaseButton>
    </div>
    <div
      v-show="isRouteCasino || (!isRouteCasino && !isRouteSports)" class="bar-item"
      :class="{ active: rightIsExpand && !isChat }"
    >
      <BaseButton type="text" @click="openBar('bet')">
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
      :class="{ active: rightIsExpand && !isChat }"
    >
      <BaseButton type="text" @click="openBar('bet-slip')">
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
      <BaseButton type="text" @click="goGame(Game.SPORTS)">
        <div class="bar-btn">
          <div class="bar-icon">
            <BaseIcon name="spt-basketball" />
          </div>
          <span>{{ t('sports') }}</span>
        </div>
      </BaseButton>
    </div>
    <div class="bar-item" :class="{ active: isChat }">
      <BaseButton type="text" @click="openBar('chat')">
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
  --tg-badge-font-size:var(--tg-font-size-xs);
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
        padding-top: 3px;
        line-height: 1;
      }
      .bar-icon{
        font-size: var(--tg-font-size-base);
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
