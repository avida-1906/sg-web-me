<script lang="ts" setup>
const router = useRouter()

const { list, run } = useList(ApiMemberPlatformList)
run()

function goPage(item: any) {
  router.push(`/casino/group/provider?pid=${item.id}&name=${item.en_name}`)
}
</script>

<template>
  <div class="tg-app-provider-slider">
    <AppSlider icon="chess-game-provider" :title="$t('casino_provider')" :data="list" :show-view-all="false" game-type="provider">
      <template #default="{ item }">
        <BaseProviderItem :url="item.logo" @click="goPage(item)" />
      </template>
    </AppSlider>
  </div>
</template>

<style lang="scss">
.tg-app-provider-slider {}
</style>
