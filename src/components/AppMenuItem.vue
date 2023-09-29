<script lang="ts" setup>
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  menuItem: MenuItem
  type?: 'radio'
}

const props = withDefaults(defineProps<Props>(), {})
const route = useRoute()
const active = computed(() => route.path === props.menuItem.path)
</script>

<template>
  <div class="tg-app-menu-item">
    <div class="menu-item" :class="{ active }">
      <BaseIcon v-if="menuItem.icon" :name="menuItem.icon" />
      <span>{{ menuItem.title }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-app-menu-item {
  .menu-item {
    cursor: pointer;
    display: flex;
    white-space: nowrap;
    align-items: center;
    gap: var(--tg-spacing-8);
    height: 45px;
    padding: var(--tg-spacing-13) var(--tg-spacing-16);
    border-radius: var(--tg-radius-default);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    transition: background-color 0.2s;
    width: 100%;
    transform: none!important;
    background-color: transparent;
    overflow: hidden;
    &:hover, &.active {
      background-color: var(--tg-secondary-main);
    }
  }
}
</style>
