<script lang="ts" setup>
import type { CasinoProviderItem } from '~/apis/types'

interface Props {
  list: any[]
  title: string
  icon: string
}
defineProps<Props>()

const router = useLocalRouter()

function goPage(item: CasinoProviderItem) {
  if (item.maintained === '2')
    return
  router.push(`/casino/group/provider?vid=${item.venue_id ?? item.id}&name=${item.name}`)
}
</script>

<template>
  <div class="tg-app-provider-slider">
    <AppSlider
      :icon="icon"
      :title="title"
      :data="list"
      :show-view-all="false"
      game-type="provider"
      path="/casino/collection/provider"
      use-cloud-img
    >
      <template #default="{ item }">
        <BaseProviderItem
          :url="item.img || item.logo || item.icon"
          :maintained="item.maintained"
          @click="goPage(item)"
        />
      </template>
    </AppSlider>
  </div>
</template>

<style lang="scss">
.tg-app-provider-slider {}
</style>
