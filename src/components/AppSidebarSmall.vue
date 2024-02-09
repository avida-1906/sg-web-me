<script lang="ts" setup name="app-sidebar-small">
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  isSwitching?: boolean
}

withDefaults(defineProps<Props>(), {})

const route = useRoute()
const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const { isSidebarHasProvider } = storeToRefs(useCasinoStore())
const {
  casinoMenu,
  casinoGameList,
  casinoGameProvider,
  staticMenu1,
  staticMenu2,
  menuItemClick,
} = useApiMenuData()
const {
  sportOddType,
  sportsMenu,
  sportHotGames,
  sportGameList,
} = storeToRefs(useSportsStore())

const routePath = computed(() => route.path)
const isCasino = computed(() => route.name?.toString().includes('casino'))
const isSports = computed(() => route.name?.toString().includes('sports'))
const menuData = computed(() => {
  if (isCasino.value) {
    return [
      casinoMenu,
      casinoGameList,
      casinoGameProvider,
      staticMenu1,
      staticMenu2,
    ]
  }
  else if (isSports.value) {
    return [
      sportsMenu,
      sportHotGames,
      sportGameList,
      sportOddType,
      staticMenu1,
      staticMenu2,
    ]
  }
  return [
    staticMenu1,
    staticMenu2,
  ]
})

function itemClick(item: MenuItem) {
  if (item.token && !isLogin.value)
    return
  menuItemClick(item)
}
</script>

<template>
  <section class="tg-app-sidebar-small">
    <ul
      v-for="menu, idx in menuData"
      v-show="menu.value[0]?.title !== t('casino_provider')
        || (menu.value[0]?.title === t('casino_provider') && isSidebarHasProvider)"
      :key="idx"
      class="tiny-menu flex-col-center"
    >
      <li
        v-for="menuitem in menu.value"
        :key="menuitem.title" class="flex-col-center tiny-menu-item"
        :class="{
          active: routePath === menuitem.path,
          disabled: menuitem.token && !isLogin,
        }"
      >
        <VTooltip placement="top">
          <div
            class="trigger" style="--app-sport-image-error-icon-size:14px;"
            @click="itemClick(menuitem)"
          >
            <AppImage
              v-if="menuitem.useCloudImg"
              style="width: 14px;height: 14px;"
              :url="menuitem.icon" is-cloud
              class="icon-img"
            />
            <BaseIcon v-else :name="menuitem.icon" />
            <div
              v-if="menuitem.list && menuitem.list.length"
              class="flex-col-center arrow-right"
            >
              <BaseIcon name="uni-arrow-right" />
            </div>
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ menuitem.title }}
            </div>
          </template>
        </VTooltip>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tg-app-sidebar-small {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  padding-left: var(--tg-spacing-8);
  overflow: hidden;
  .tiny-menu {
    border-radius: var(--tg-radius-default);
    background: var(--tg-primary-main);
    cursor: pointer;
    .tiny-menu-item {
      position: relative;
      font-size: var(--tg-font-size-default);
      width: 44px;
      height: 44px;
      &:hover, &.active {
        background: var(--tg-secondary-grey);
        border-radius: var(--tg-radius-default);
        --tg-icon-color: var(--tg-text-white);
        .icon-img{
          filter: brightness(2);
        }
      }
      &.disabled{
        cursor: not-allowed;
        opacity: 0.5;
      }
      > .v-popper, .trigger {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .arrow-right {
        position: absolute;
        right: 0px;
        font-size: 10px;
        width: 14px;
      }
    }
  }
}
</style>
