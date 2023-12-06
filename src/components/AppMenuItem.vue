<script lang="ts" setup>
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  menuItem: MenuItem
  type?: 'radio'
}

const props = withDefaults(defineProps<Props>(), {})

const route = useRoute()
const { isLogin } = storeToRefs(useAppStore())

const active = computed(() => route.path === props.menuItem.path)
</script>

<template>
  <div class="tg-app-menu-item">
    <div
      class="menu-item"
      :class="{ active, disabled: menuItem.token && !isLogin }"
    >
      <AppImage
        v-if="menuItem.useCloudImg"
        style="width: 14px;height: 14px;--app-sport-image-error-icon-size:14px;"
        :url="menuItem.icon" is-cloud
      />
      <BaseIcon
        v-else-if="menuItem.icon"
        :name="menuItem.icon"
      />
      <div class="menu-title">
        {{ menuItem.title }}
      </div>
      <div v-if="menuItem.fixtureCount" class="badge-wrap">
        <BaseBadge :count="menuItem.fixtureCount" mode="active" :max="99999" />
      </div>
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
    &:hover:not(.disabled), &.active:not(.disabled) {
      background-color: var(--tg-secondary-main);
    }
    &.disabled{
      cursor: not-allowed;
      opacity: 0.5;
    }
    .menu-title {
      flex: 1;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .badge-wrap {
      margin-left: auto;
      --tg-badge-font-size: var(--tg-font-size-xs);
      --tg-badge-padding-x:var(--tg-spacing-6);
    }
  }
}
</style>
