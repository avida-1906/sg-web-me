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
        <div class="provider-item-wrap" @click="goPage(item)">
          <BaseImage url="https://mediumrare.imgix.net/be6c453a8f450c2fbf5181abc844f080b537458061aeca3902575510acacdbea?&dpr=2&format=auto&auto=format&q=50" />
        </div>
      </template>
    </AppSlider>
  </div>
</template>

<style lang="scss">
.tg-app-provider-slider {}
</style>
