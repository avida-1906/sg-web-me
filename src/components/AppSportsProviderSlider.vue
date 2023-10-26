<script lang="ts" setup>
import type { ProviderItem } from '~/apis/index'

interface Props {
  list: ProviderItem[]
  modelValue: string
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

function onClick(item: ProviderItem) {
  emit('update:modelValue', item.id)
  emit('change', item.id)
}
</script>

<template>
  <div class="tg-app-provider-slider">
    <AppSlider
      :title="$t('sports_provider') "
      :data="list"
      :show-view-all="false"
      :show-arrow="false"
    >
      <template #default="{ item }">
        <BaseProviderItem
          :url="item.logo" :active="item.id === modelValue"
          @click="onClick(item)"
        />
      </template>
    </AppSlider>
  </div>
</template>

<style lang="scss">
.tg-app-provider-slider {}
</style>
