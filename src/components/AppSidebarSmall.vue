<script lang="ts" setup name="app-sidebar-small">
import type { Menu, MenuItem } from '~/composables/useMenuData'

interface Props {
  menuData: Array<Menu>
  isSwitching?: boolean
}

withDefaults(defineProps<Props>(), {})

const router = useRouter()

function itemClick(item: MenuItem) {
  if (item.path && item.path.length)
    router.push(item.path)
}
</script>

<template>
  <section class="tg-app-sidebar-small">
    <ul v-for="menu, idx in menuData" :key="idx" class="tiny-menu flex-col-center">
      <li v-for="menuitem in menu" :key="menuitem.title" class="flex-col-center tiny-menu-item">
        <VMenu placement="top">
          <div class="trigger" @click="itemClick(menuitem)">
            <BaseIcon :name="menuitem.icon" />
            <div v-if="menuitem.list && menuitem.list.length" class="flex-col-center arrow-right">
              <BaseIcon name="uni-arrow-right" />
            </div>
          </div>
          <template #popper>
            <div class="tiny-menu-item-title">
              {{ menuitem.title }}
            </div>
          </template>
        </VMenu>
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
  gap: var(--tg-spacing-button-padding-vertical-xs);
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
      .app-svg-icon {
        transition: color 0.2s;
        transform: scale(1.1);
      }
      &:hover, &.active {
        background: var(--tg-secondary-main);
        border-radius: var(--tg-radius-default);
        --tg-icon-color: var(--tg-text-white);
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
        right: 0;
        font-size: 6.5px;
        width: 14px;
      }
    }
  }
}
</style>
