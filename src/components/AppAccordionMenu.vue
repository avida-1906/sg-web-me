<script lang="ts" setup>
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  menuItem: MenuItem
  timeStamp?: number
}

const props = withDefaults(defineProps<Props>(), {
  timeStamp: 0,
})

const emit = defineEmits(['closeOtherMenu'])

const baseAccor = ref()

const timestamp = ref(0)

function handleClickHead() {
  // const t = setTimeout(() => {
  //   innerRef.value.scrollTo({ top: document.getElementById('sports-hot-game-football')!.offsetTop - 60, behavior: 'smooth' })
  //   clearTimeout(t)
  // }, 500)
  timestamp.value = new Date().getTime()
  emit('closeOtherMenu', timestamp.value)
}

const { menuItemClick } = useApiMenuData()

function handleClickItem(item: any) {
  menuItemClick(item)
}

watch(() => props.timeStamp, (val) => {
  if (val !== timestamp.value)
    baseAccor.value?.close()
})
</script>

<template>
  <section>
    <BaseAccordion
      v-if="menuItem.list && menuItem.list.length"
      ref="baseAccor" :dom-id="menuItem.domId" :menu-info="menuItem" :auto-show="menuItem.expand"
      @click-head="handleClickHead"
      @click-item="handleClickItem"
    >
      <template #default="{ menuItem: info }">
        <AppMenuItem :menu-item="info" @click="() => handleClickItem(info)" />
      </template>
    </BaseAccordion>
    <AppMenuItem v-else :menu-item="menuItem" @click="() => handleClickItem(menuItem)" />
  </section>
</template>

<style lang="scss" scoped>

</style>
