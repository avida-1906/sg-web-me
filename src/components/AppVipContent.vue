<script lang="ts" setup>
const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const { appContentWidth } = storeToRefs(useWindowStore())
const router = useLocalRouter()

const PromotionBonus = defineAsyncComponent(() => import('~/pages/[lang]/vip/promotion-bonus.vue'))
const DaySalary = defineAsyncComponent(() => import('~/pages/[lang]/vip/day-salary.vue'))
const Rebate = defineAsyncComponent(() => import('~/pages/[lang]/vip/rebate.vue'))
const Receive = defineAsyncComponent(() => import('~/pages/[lang]/vip/receive.vue'))
const withMenuMenu = router.options.routes.find(
  item => item.path === '/:lang/vip')?.meta?.withMenuMenu ?? []
const menuData = computed<any>(() =>
  withMenuMenu.map((m, idx) => ({ ...m, title: m.isT ? t(m.title) : m.title, value: idx.toString(), label: m.isT ? t(m.title) : m.title, path: '' }))
    .filter(f => f.token ? isLogin.value : true))
const curMenuTab = ref('0')

const getComponent = computed(() => {
  switch (curMenuTab.value) {
    case '0': return PromotionBonus
    case '1': return DaySalary
    case '2': return Rebate
    case '3': return Receive
  }
})
</script>

<template>
  <div class="app-vip-content" :class="{ 'is-isMobile': appContentWidth < 800 }">
    <template v-if="appContentWidth > 800">
      <BaseMenu v-model="curMenuTab" :data="menuData" />
    </template>
    <template v-else>
      <BaseTab
        v-model="curMenuTab"
        :center="false"
        :list="menuData"
        full
      />
    </template>
    <Transition mode="out-in">
      <component :is="getComponent" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-vip-content{
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 16px;
  &.is-isMobile{
    grid-template-columns: auto;
    gap: 16px;
  }
}
</style>
