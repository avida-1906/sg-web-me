<script lang="ts" setup name="app-sidebar-small">
interface MenuItem {
  title: string
  path: string
  icon: string
  children: Menu
}

type Menu = Array<MenuItem>

interface Props {
  menuData: Array<any>
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="tg-app-sidebar-small">
    <ul v-for="menu, idx in menuData" :key="idx" class="tiny-menu flex-col-center">
      <li v-for="menuitem in menu" :key="menuitem.title" class="flex-col-center tiny-menu-item">
        <BaseIcon :name="menuitem.icon" />
        <div v-if="menuitem.children && menuitem.children.length" class="arrow-right">
          <BaseIcon name="uni-arrow-right" />
        </div>
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
  align-items: center;
  justify-content: flex-start;
  gap: var(--tg-spacing-button-padding-vertical-xs);
  .tiny-menu {
    padding: var(--tg-spacing-4);
    gap: var(--tg-spacing-4);
    border-radius: var(--tg-radius-default);
    background: var(--tg-primary-main);
    .tiny-menu-item {
      position: relative;
      font-size: var(--tg-font-size-default);
      width: 40px;
      height: 40px;
      .arrow-right {
        position: absolute;
        right: 0;
        font-size: 8px;
      }
    }
  }
}
</style>
