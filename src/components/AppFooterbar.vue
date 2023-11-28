<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { leftIsExpand, openLeftSidebar, closeLeftSidebar } = useLeftSidebar()
const {
  rightIsExpand,
  currentRightSidebarContent,
  openRightSidebar,
  closeRightSidebar,
} = useRightSidebar()
const sportStore = useSportsStore()

// const activeBar = ref('')
const tabbar = ref([
  { title: t('scan'), icon: 'tabbar-menu', name: 'menu', show: true },
  {
    title: t('casino'),
    icon: 'tabbar-game',
    name: 'game',
    show: true,
    path: '/casino',
  },
  {
    title: t('menu_title_settings_bets'),
    icon: 'tabbar-bet',
    name: 'bet',
    show: true,
    path: '',
  },
  { title: t('bet_slip'), icon: 'spt-user-bet', name: 'user-bet', show: false },
  {
    title: t('sports'),
    icon: 'spt-basketball',
    name: 'sports',
    show: true,
    path: `/sports/${SPORTS_PLAT_ID}`,
  },
  { title: t('chat_room'), icon: 'tabbar-chat', name: 'chat', show: true },
])

const getActiveBar = computed(() => {
  if (leftIsExpand.value) {
    return 'menu'
  }
  else if (rightIsExpand.value) {
    if (currentRightSidebarContent.value === EnumRightSidebarContent.CASINOBET)
      return 'bet'

    else if (currentRightSidebarContent.value === EnumRightSidebarContent.BETTING)
      return 'user-bet'

    else if (currentRightSidebarContent.value === EnumRightSidebarContent.CHATROOM)
      return 'chat'

    else
      return ''
  }
  else {
    if (route.path.includes('/casino'))
      return 'game'

    else if (route.path.includes('/sports'))
      return 'sports'

    else
      return ''
  }
})

function changeBar(item: { name: string; path?: string }) {
  const { name, path } = item
  switch (name) {
    case 'menu':
      openLeftSidebar()
      rightIsExpand.value && closeRightSidebar()
      break
    case 'bet':// 投注
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.CASINOBET)
      break
    case 'user-bet':// 投注单
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.BETTING)
      break
    case 'chat':
      leftIsExpand.value && closeLeftSidebar()
      openRightSidebar(EnumRightSidebarContent.CHATROOM)
      break
    case 'game':
    case 'sports':
      leftIsExpand.value && closeLeftSidebar()
      rightIsExpand.value && closeRightSidebar()
      break
  }
  // activeBar.value = name
  if (path)
    router.push(replaceSportsPlatId(path))
}

watch(() => getActiveBar.value, (newValue) => {
  if (newValue === 'game') {
    tabbar.value[2].show = true
    tabbar.value[3].show = false
  }
  else if (newValue === 'sports') {
    tabbar.value[2].show = false
    tabbar.value[3].show = true
  }
})
// watch([leftIsExpand, rightIsExpand, currentRightSidebarContent], () => {
//   if (leftIsExpand.value) {
//     activeBar.value = 'menu'
//   }
//   else if (rightIsExpand.value) {
//     if (currentRightSidebarContent.value === EnumRightSidebarContent.CASINOBET)
//       activeBar.value = 'bet'

//     else if (currentRightSidebarContent.value === EnumRightSidebarContent.BETTING)
//       activeBar.value = 'user-bet'

//     else if (currentRightSidebarContent.value === EnumRightSidebarContent.CHATROOM)
//       activeBar.value = 'chat'

//     else
//       activeBar.value = ''
//   }
//   else {
//     if (route.path.includes('/casino'))
//       activeBar.value = 'game'

//     else if (route.path.includes('/sports'))
//       activeBar.value = 'sports'

//     else
//       activeBar.value = ''
//   }
// }, { immediate: true })

// watch(() => route.path, (newValue) => {
//   if (route.path.includes('/casino'))
//     activeBar.value = 'game'

//   else if (route.path.includes('/sports'))
//     activeBar.value = 'sports'

//   else
//     activeBar.value = leftIsExpand.value ? 'menu' : ''
// })
</script>

<template>
  <div class="app-footer-bar page-content">
    <div
      v-for="item of tabbar"
      v-show="item.show"
      :key="item.icon"
      class="bar-item"
      :class="{ 'active-bar': item.name === getActiveBar }"
    >
      <BaseButton type="text" @click.stop="changeBar(item)">
        <div
          class="bar-btn"
        >
          <BaseBadge
            v-if="item.name === 'bet' || item.name === 'user-bet'"
            mode="active"
            :count="sportStore.cart.count"
          >
            <BaseIcon class="bar-icon" :name="item.icon" />
          </BaseBadge>
          <BaseIcon v-else class="bar-icon" :name="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </BaseButton>
    </div>
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
