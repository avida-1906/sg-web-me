<script lang="ts" setup>
import type { Component } from 'vue'
import api from './children/api.vue'
import general from './children/general.vue'
import ignoredUsers from './children/ignored-users.vue'
import offers from './children/offers.vue'
import preferences from './children/preferences.vue'
import security from './children/security.vue'
import sessions from './children/sessions.vue'
import verify from './children/verify.vue'

const route = useRoute()

const comps: { [k: string]: Component } = {
  'api': api,
  'general': general,
  'ignored-users': ignoredUsers,
  'offers': offers,
  'preferences': preferences,
  'security': security,
  'sessions': sessions,
  'verify': verify,
}

const page = computed(() => route.params.page as string)
</script>

<template>
  <div>
    <Component :is="comps[page]" />
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  layout: with-menu
  title: setting
  icon: uni-set
  menu: [{title: 常规, path: /settings/general},{title: 安全, path: /settings/security},{title: 首选项, path: /settings/preferences},{title: API, path: /settings/api},{title: 会话, path: /settings/sessions},{title: 黑名单, path: /settings/ignored-users},{title: 验证, path: /settings/verify},{title: 优惠,path: /settings/offers}]
</route>
