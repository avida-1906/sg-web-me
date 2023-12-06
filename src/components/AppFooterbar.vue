<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const { leftIsExpand, openLeftSidebar, closeLeftSidebar } = useLeftSidebar()
const {
  rightIsExpand,
  rightContainerIs0,
  currentRightSidebarContent,
  openRightSidebar,
  closeRightSidebar,
} = useRightSidebar()
const sportStore = useSportsStore()
const { isLogin } = storeToRefs(useAppStore())
const { openRegisterDialog } = useRegisterDialog()

const activeName = ref('')
const tabbar = ref([
  { title: 'scan', icon: 'tabbar-menu', name: 'menu', show: true },
  {
    title: 'casino',
    icon: 'tabbar-game',
    name: 'game',
    show: true,
    path: '/casino',
  },
  {
    title: 'menu_title_settings_bets',
    icon: 'tabbar-bet',
    name: 'bet',
    show: true,
  },
  { title: 'bet_slip', icon: 'spt-user-bet', name: 'user-bet', show: false },
  {
    title: 'sports',
    icon: 'spt-basketball',
    name: 'sports',
    show: true,
    path: `/sports/${SPORTS_PLAT_ID}`,
  },
  { title: 'chat_room', icon: 'tabbar-chat', name: 'chat', show: true },
])

const getLinkBar = computed(() => {
  return (rightIsExpand.value || leftIsExpand.value) ? '' : 'active-bar'
})
const getExpandBar = computed(() => {
  return getLinkBar.value ? '' : activeName.value
})

function changeBar(item: { name: string; path?: string }) {
  const { name, path } = item
  // activeName.value = name
  switch (name) {
    case 'menu':
      rightIsExpand.value && closeRightSidebar()
      openLeftSidebar()
      activeName.value = name
      break
    case 'bet':// 投注
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.CASINOBET)
      activeName.value = name
      break
    case 'user-bet':// 投注单
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.BETTING)
      if (!isLogin.value)
        openRegisterDialog()
      activeName.value = name
      break
    case 'chat':
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.CHATROOM)
      activeName.value = name
      break
    case 'game':
    case 'sports':
      leftIsExpand.value && closeLeftSidebar()
      rightIsExpand.value && closeRightSidebar()
      break
  }
  if (path)
    router.push(replaceSportsPlatId(path))
}

watch(() => activeName.value, (newValue) => {
  if (newValue === 'game') {
    tabbar.value[2].show = true
    tabbar.value[3].show = false
  }
  else if (newValue === 'sports') {
    tabbar.value[3].show = true
    tabbar.value[2].show = false
  }
})
watch(() => currentRightSidebarContent.value, (newValue) => {
  if (newValue === 'notification')
    activeName.value = ''
})
</script>

<template>
  <div class="app-footer-bar page-content">
    <template v-for="item of tabbar" :key="item.icon">
      <router-link v-if="item.path" v-slot="{ isActive }" :to="item.path" custom>
        <div class="bar-item" :class="isActive ? getLinkBar : ''">
          <BaseButton type="text" @click.stop="changeBar(item)">
            <div class="bar-btn">
              <BaseIcon class="bar-icon" :name="item.icon" />
              <span>{{ t(item.title) }}</span>
            </div>
          </BaseButton>
        </div>
      </router-link>
      <div
        v-else
        v-show="item.show"
        class="bar-item"
        :class="{ 'active-bar': item.name === getExpandBar }"
      >
        <BaseButton type="text" @click.stop="changeBar(item)">
          <div class="bar-btn">
            <BaseBadge
              v-if="item.name === 'user-bet'"
              mode="active"
              :count="sportStore.cart.count"
              :max="99999"
            >
              <BaseIcon class="bar-icon" :name="item.icon" />
            </BaseBadge>
            <BaseIcon v-else class="bar-icon" :name="item.icon" />
            <span>{{ t(item.title) }}</span>
          </div>
        </BaseButton>
      </div>
    </template>
    <div :id="EnumSportEndDomID.H5_CART_END_DOM" class="h5-end-dom" />
  </div>
</template>

<style lang="scss" scoped>
.app-footer-bar {
  --tg-badge-font-size:var(--tg-font-size-xs);
  position: fixed;
  bottom: 0;
  left: 0;
  height: var(--tg-footerbar-height);
  display: grid;
  z-index: var(--tg-z-index-30);
  grid-template-columns: repeat(5,1fr);
  justify-items: center;
  background: var(--tg-secondary-dark);
  overflow: hidden;
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
      span{
        font-size: var(--tg-font-size-xs);
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-semibold);
        padding-top: 3px;
        line-height: 1;
      }
      .bar-icon{
        font-size: var(--tg-font-size-md);
      }
    }

  }
  .active-bar{
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
