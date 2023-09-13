<script lang="ts" setup name="app-sidebar-small">
interface MenuItem {
  title: string
  path: string
  icon: string
  list: Menu
}

type Menu = Array<MenuItem>

interface Props {
  menuData: Array<any>
  isSwitching?: boolean
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="scrollY tg-app-sidebar-small" :style="{ overflowY: isSwitching ? 'hidden' : 'auto' }">
    <ul v-for="menu, idx in menuData" :key="idx" class="tiny-menu flex-col-center">
      <li v-for="menuitem in menu" :key="menuitem.title" class="flex-col-center tiny-menu-item">
        <template v-if="menuitem.list && menuitem.list.length">
          <VMenu placement="top-start">
            <div class="trigger">
              <BaseIcon :name="menuitem.icon" />
              <div class="flex-col-center arrow-right">
                <BaseIcon name="uni-arrow-right" />
              </div>
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ menuitem.title }}
              </div>
            </template>
          </VMenu>
        </template>
        <template v-else>
          <BaseIcon :name="menuitem.icon" />
        </template>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.tiny-menu-item-title {
  color: var(--tg-secondary-main);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  padding: var(--tg-spacing-input-padding-vertical) var(--tg-spacing-button-padding-horizontal-xs);
}
</style>

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
  align-items: center;
  justify-content: flex-start;
  gap: var(--tg-spacing-button-padding-vertical-xs);
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
        background: var(--tg-secondary-main);
        border-radius: var(--tg-radius-default);
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
        font-size: 10px;
        width: 14px;
      }
    }
  }
}
</style>
