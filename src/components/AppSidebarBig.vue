<script setup lang='ts'>
import { type MenuItem } from '~/composables/useApiMenuData'

interface Props {
  currentType: string
  isSwitching?: boolean
}
const props = defineProps<Props>()

const {
  casinoMenu,
  casinoGameList,
  // casinoGameProvider,
  staticMenu1,
  staticMenu2,
  menuItemClick,
} = useApiMenuData()
const { t } = useI18n()
const route = useRoute()
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const {
  sportOddType,
  sportsMenu,
  sportHotGames,
  sportGameList,
} = storeToRefs(useSportsStore())

const innerRef = ref()
const timeStamp = ref(0)

const isCasino = computed(() => route.name?.toString().includes('casino'))
const isSports = computed(() => route.name?.toString().includes('sports'))
const isGameTypeCasino = computed(() => props.currentType === '1')
const isGameTypeSports = computed(() => props.currentType === '2')

function handleClickItem(item: MenuItem) {
  if (item.token && !isLogin.value)
    return
  menuItemClick(item)
}
function closeMenu(t: any) {
  timeStamp.value = t
}

onMounted(() => {
  const tempId = Local.get(STORAGE_MENU_EXPAND_DOMID)?.value ?? ''
  if (tempId && !isMobile.value) {
    const t = setTimeout(() => {
      innerRef.value.scrollTo({
        top: document.getElementById(tempId as string)!.offsetTop - 60,
        behavior: 'smooth',
      })
      clearTimeout(t)
    }, 500)
  }
})
onBeforeUnmount(() => {
  if (!isMobile.value)
    Local.remove(STORAGE_MENU_EXPAND_DOMID)
})
</script>

<template>
  <div class="big-warp">
    <div
      ref="innerRef"
      class="scroll-y scroll-contain inner-content"
      :class="{ 'is-full-screen': isMobile, 'game-padding': isCasino || isSports }"
    >
      <!-- Casino -->
      <template v-if="isMobile ? isGameTypeCasino : isCasino">
        <div class="menu-box">
          <div
            v-for="item, i in casinoMenu"
            :key="i"
            @click="() => handleClickItem(item)"
          >
            <AppMenuItem :menu-item="item" />
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            {{ t('game') }}
          </div>
          <div class="content-line" />
          <div
            v-for="item, i in casinoGameList"
            :key="i"
            @click="() => handleClickItem(item)"
          >
            <AppMenuItem :menu-item="item" />
          </div>
        </div>
        <!-- <div class="menu-box">
          <div
            v-for="item, i in casinoGameProvider"
            :key="i"
            @click="() => handleClickItem(item)"
          >
            <AppMenuItem :menu-item="item" />
          </div>
        </div> -->
      </template>

      <!-- Sports -->
      <template v-if="isMobile ? isGameTypeSports : isSports">
        <div class="menu-box">
          <div
            v-for="item, i in sportsMenu"
            :key="i"
            @click="() => handleClickItem(item)"
          >
            <AppMenuItem :menu-item="item" />
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            {{ t('top_sports_events') }}
          </div>
          <div class="content-line" />
          <div v-for="item, i in sportHotGames" :key="i">
            <AppAccordionMenu
              :menu-item="item"
              :time-stamp="timeStamp"
              @close-other-menu="closeMenu"
            />
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportGameList" :key="i">
            <AppAccordionMenu
              :menu-item="item"
              :time-stamp="timeStamp"
              @close-other-menu="closeMenu"
            />
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportOddType" :key="i">
            <AppAccordionMenu
              :menu-item="item"
              :time-stamp="timeStamp"
              @close-other-menu="closeMenu"
            />
          </div>
        </div>
      </template>

      <!-- 个人中心 -->
      <div
        v-for="menu, m in [staticMenu1, staticMenu2]"
        :key="m"
        class="menu-box"
      >
        <div v-for="item, i in menu" :key="i">
          <AppAccordionMenu
            :menu-item="item"
            :time-stamp="timeStamp"
            @close-other-menu="closeMenu"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.big-warp {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-content: flex-start;
  padding: 0;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  height: 100%;
}

.inner-content {
  padding: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);

  .menu-box {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background-color: var(--tg-primary-main);
    border-radius: var(--tg-radius-default);
    overflow: hidden;

    .menu {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 16px;
      // cursor: pointer;
      font-weight: var(--tg-font-weight-semibold);

      // &:hover, &.active {
      //   background-color: var(--tg-secondary-main);
      //   --tg-icon-color: var(--tg-text-white);
      // }

      span {
        padding-left: 6px;
      }
    }

    .content-line {
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
    }
  }
  &.game-padding{
    padding-right: 9.6px;
  }
}

.is-full-screen {
  padding-top: 0;
}
</style>
