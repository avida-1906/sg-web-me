<script lang="ts" setup>
</script>

<template>
  <Suspense timeout="0">
    <RouterView />
    <template #fallback>
      <div class="center dialog-loading-height">
        <BaseLoading />
      </div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  withMenuTitle: setting
  withMenuIcon: uni-set
  browserTitle: 设置 – Stake.com
  withMenuMenu: [{title: 常规, path: /settings/general,},{title: 安全, path: /settings/security},{title: 首选项, path: /settings/preferences},{title: API, path: /settings/api},{title: 会话, path: /settings/sessions},{title: 黑名单, path: /settings/ignored-users},{title: 验证, path: /settings/verify},{title: 优惠,path: /settings/offers}]
</route>
