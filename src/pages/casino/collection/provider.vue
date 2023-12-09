<script setup lang="ts">
usePageTitle({ prefix: 'Casino Game Providers - Best Creators of Gambling Games' })
const router = useRouter()
const { platformList } = storeToRefs(useCasinoStore())
const { appContentWidth } = storeToRefs(useWindowStore())

function handleItemClick(item: any) {
  if (item.maintained === '2')
    return
  router.push(`/casino/group/provider?pid=${item.id}&name=${item.en_name}`)
}
</script>

<template>
  <section class="layout-spacing tg-collection-provider">
    <div class="group-banner-wrap" :class="{ 'less-than-700': appContentWidth <= 700 }">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>{{ $t('casino_provider') }}</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage url="/png/casino/group-banner-default.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <AppCardList :list="platformList" is-provider>
        <template #default="{ item }">
          <BaseProviderItem
            :url="item.logo"
            :maintained="item.maintained"
            @click="handleItemClick(item)"
          />
        </template>
      </AppCardList>
    </div>
  </section>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang="scss" scoped>
.tg-collection-provider {}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
