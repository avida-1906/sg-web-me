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

const curDomId = ref(Local.get(STORAGE_MENU_EXPAND_DOMID)?.value)

function handleClickHead() {
  timestamp.value = new Date().getTime()
  emit('closeOtherMenu', timestamp.value)
}

const { menuItemClick } = useApiMenuData()

function handleClickItem(item: any) {
  menuItemClick(item)
}

function radioChangeValue(val: string | number) {
  if (props.menuItem.radioChange)
    props.menuItem.radioChange(val)
}

watch(() => props.timeStamp, (val) => {
  if (val !== timestamp.value)
    baseAccor.value?.close()
})
</script>

<template>
  <section class="tg-app-accordion-menu">
    <BaseAccordion
      v-if="menuItem.list && menuItem.list.length"
      ref="baseAccor"
      :dom-id="menuItem.domId"
      :menu-info="menuItem"
      :auto-show="(curDomId === void 0) ? false : curDomId === menuItem.domId"
      @click-head="handleClickHead"
      @click-item="handleClickItem"
      @radio-change="radioChangeValue"
    >
      <template #default="{ menuItem: info }">
        <AppMenuItem :menu-item="info" @click="() => handleClickItem(info)" />
      </template>
    </BaseAccordion>
    <AppMenuItem
      v-else
      :menu-item="menuItem" @click="() => handleClickItem(menuItem)"
    />
  </section>
</template>

<style lang="scss" scoped>
.tg-app-accordion-menu {
  --tg-base-radio-style-color: var(--tg-text-white)
}
</style>
