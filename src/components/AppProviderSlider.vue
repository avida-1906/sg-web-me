<script lang="ts" setup>
import type { CasinoProviderItem } from '~/apis/types'

const router = useRouter()
const { platformList } = storeToRefs(useCasinoStore())

function goPage(item: CasinoProviderItem) {
  if (item.maintained === '2')
    return
  router.push(`/casino/group/provider?vid=${item.venue_id}&name=${item.name}`)
}
</script>

<template>
  <div class="tg-app-provider-slider">
    <AppSlider
      icon="chess-game-provider"
      :title="$t('casino_provider')"
      :data="platformList"
      :show-view-all="false"
      game-type="provider"
      path="/casino/collection/provider"
    >
      <template #default="{ item }">
        <BaseProviderItem
          :url="item.logo"
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
