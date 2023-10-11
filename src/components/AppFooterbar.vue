<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { leftIsExpand, triggerLeftSidebar, closeLeftSidebar } = useLeftSidebar()
const { openRightSidebar, closeRightSidebar } = useRightSidebar()

const tabbar = ref([
  { title: '浏览', icon: 'tabbar-menu', name: 'menu', show: true },
  {
    title: '娱乐城',
    icon: 'tabbar-game',
    name: 'game',
    show: true,
    path: '/casino',
  },
  { title: '投注', icon: 'tabbar-bet', name: 'bet', show: true, path: '' },
  { title: '投注单', icon: 'spt-user-bet', name: 'user-bet', show: false },
  {
    title: '体育',
    icon: 'spt-basketball',
    name: 'sport',
    show: true,
    path: '/sports',
  },
  { title: '聊天室', icon: 'tabbar-chat', name: 'chat', show: true },
])
const activeBar = ref('')

function changeBar(item: { name: string; path?: string }) {
  const { name, path } = item
  switch (name) {
    case 'menu':
      closeRightSidebar()
      triggerLeftSidebar()
      if (activeBar.value === name)
        activeBar.value = route.path.includes('/casino') ? 'game' : 'sport'
      else
        activeBar.value = name
      break
    case 'bet':
    case 'user-bet':
      if (activeBar.value === name) {
        activeBar.value = route.path.includes('/casino') ? 'game' : 'sport'
        closeRightSidebar()
      }
      else {
        activeBar.value = name
        openRightSidebar(EnumRightSidebarContent.BETTING)
      }
      break
    case 'chat':
      if (activeBar.value === name) {
        activeBar.value = route.path.includes('/casino') ? 'game' : 'sport'
        closeRightSidebar()
      }
      else {
        activeBar.value = name
        openRightSidebar(EnumRightSidebarContent.CHATROOM)
      }
      break
    case 'game':
    case 'sport':
      activeBar.value = name
      leftIsExpand.value && closeLeftSidebar()
      closeRightSidebar()
      if (name === 'game') {
        tabbar.value[2].show = true
        tabbar.value[3].show = false
      }
      else {
        tabbar.value[2].show = false
        tabbar.value[3].show = true
      }
      break
  }
  if (path)
    router.push(path)
}
</script>

<template>
  <div class="app-footer-bar page-content">
    <div
      v-for="item of tabbar"
      v-show="item.show"
      :key="item.icon"
      class="bar-item"
      :class="{ 'active-bar': activeBar === item.name }"
    >
      <BaseButton type="text" @click.stop="changeBar(item)">
        <div class="bar-btn">
          <BaseIcon class="bar-icon" :name="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-footer-bar {
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
    --tg-icon-color: var(--tg-text-lightblue);
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
