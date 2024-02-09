<script setup lang="ts">
usePageTitle({ prefix: 'Casino Game Providers - Best Creators of Gambling Games' })
const router = useLocalRouter()
const casinoStore = useCasinoStore()
const { cateProviderData } = storeToRefs(casinoStore)
const { appContentWidth } = storeToRefs(useWindowStore())

const bannerSrc = computed(() => {
  return casinoStore.getBg('5')
})

function handleItemClick(item: any) {
  if (item.maintained === '2')
    return
  router.push(`/casino/group/provider?vid=${item.venue_id ?? item.id}&name=${item.name}`)
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
              <span>{{ cateProviderData?.name }}</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage
              style="height: 100%;width: auto;"
              :url="bannerSrc ? bannerSrc : '/png/casino/group-banner-default.png'"
              loading="eager"
              :is-cloud="!!bannerSrc"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tg-mt-24">
      <AppCardList :list="cateProviderData?.games ?? []" is-provider>
        <template #default="{ item }">
          <BaseProviderItem
            :url="item.img || item.logo || item.icon"
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
