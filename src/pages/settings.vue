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
  withMenuMenu:
    - {title: menu_title_settings_general, path: /settings/general,}
    - {title: menu_title_settings_security, path: /settings/security}
    - {title: menu_title_settings_preferences, path: /settings/preferences}
    # - {title: menu_title_settings_api, path: /settings/api}
    - {title: menu_title_settings_sessions, path: /settings/sessions}
    - {title: menu_title_settings_ignoredusers, path: /settings/ignored-users}
    # - {title: menu_title_settings_verify, path: /settings/verify}
    # - {title: menu_title_settings_offers,path: /settings/offers}
</route>
