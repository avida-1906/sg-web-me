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
    - {title: menu_title_settings_contact, path: /settings/general,}
    - {title: menu_title_settings_update_loginpwd, path: /settings/security-login-pwd}
    - {title: menu_title_settings_update_safecheck, path: /settings/security-safe-check}
    - {title: menu_title_settings_update_safepwd, path: /settings/security-safe-pwd}
    - {title: menu_title_settings_private, path: /settings/preferences}
    # - {title: menu_title_settings_api, path: /settings/api}
    - {title: menu_title_settings_loginsession, path: /settings/sessions}
    - {title: menu_title_settings_ignoredusers, path: /settings/ignored-users}
    # - {title: menu_title_settings_verify, path: /settings/verify}
    # - {title: menu_title_settings_offers,path: /settings/offers}
</route>
