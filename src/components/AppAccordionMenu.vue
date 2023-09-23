<script lang="ts" setup>
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  menuItem: MenuItem
}

withDefaults(defineProps<Props>(), {})

function handleClickHead() {
  // const t = setTimeout(() => {
  //   innerRef.value.scrollTo({ top: document.getElementById('sports-hot-game-football')!.offsetTop - 60, behavior: 'smooth' })
  //   clearTimeout(t)
  // }, 500)
}

const { menuItemClick } = useApiMenuData()

function handleClickItem(item: any) {
  menuItemClick(item)
}
</script>

<template>
  <section>
    <BaseAccordion
      v-if="menuItem.list && menuItem.list.length" :dom-id="menuItem.domId" :menu-info="menuItem" :auto-show="menuItem.expand"
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
