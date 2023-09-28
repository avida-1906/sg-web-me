<script setup lang="ts">
const router = useRouter()
const { list, runAsync } = useList(ApiMemberPlatformList)

function handleItemClick(item: any) {
  router.push(`/casino/group/provider?pid=${item.id}&name=${item.en_name}`)
}

await application.allSettled([runAsync()])
</script>

<template>
  <section class="layout-spacing tg-collection-provider">
    <div class="group-banner-wrap">
      <div class="group-banner-bg" />
      <div class="banner-wrap">
        <div class="banner">
          <div class="left">
            <h1>
              <span>游戏提供商</span>
            </h1>
          </div>
          <div class="right">
            <BaseImage url="/img/casino/group-banner-default.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <AppGameSearch game-type="2" />
    </div>
    <div class="mt-24">
      <AppCardList :list="list" is-provider>
        <template #default="{ item }">
          <BaseProviderItem :url="item.logo" @click="handleItemClick(item)" />
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
