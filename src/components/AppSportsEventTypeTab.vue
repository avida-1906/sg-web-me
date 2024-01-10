<script setup lang='ts'>
interface Props {
  list: any[]
}
defineProps<Props>()
const emit = defineEmits(['change'])
const currentTab = defineModel({ type: Number, required: true })
const { isMobile } = storeToRefs(useWindowStore())

const hoverTab = ref('')

function onClick(item: ISelectOptionNumber) {
  currentTab.value = item.value
  emit('change', item.value)
}

function onMouseenter(v: string) {
  hoverTab.value = v
}
function onMouseLeave() {
  hoverTab.value = ''
}
</script>

<template>
  <BaseSelect
    v-if="isMobile" v-model="currentTab" popper :options="list"
    style="--tg-base-select-popper-bg-color:transparent;
    --tg-base-select-hover-bg-color:transparent;
    --tg-base-select-popper-style-padding-x:0;
    --tg-base-select-popper-style-padding-y:0;"
    @select="$emit('change')"
  >
    <template #label="{ data }">
      <div class="select-label">
        <AppImage
          width="18px" height="18px"
          :url="data?.icon_hl" is-cloud
        />
        <span>{{ data?.label }}</span>
      </div>
    </template>
  </BaseSelect>
  <div v-else class="event-type-tab">
    <div
      v-for="t in list" :key="t.value" class="tab"
      :class="{ active: t.value === currentTab }"
      @mouseenter="onMouseenter(t.value)" @mouseleave="onMouseLeave"
      @click="onClick(t)"
    >
      <AppImage
        width="18px" height="18px"
        :url="hoverTab === t.value || t.value === currentTab ? t.icon_hl : t.icon"
        is-cloud
      />
      <span>{{ t.label }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.select-label {
  font-size: var(--tg-font-size-md);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-white);
  --tg-icon-color: var(--tg-text-white);
  display: flex;
  gap: var(--tg-spacing-8);
  align-items: center;
  line-height: 25px;
}

.event-type-tab {
  font-size: var(--tg-font-size-md);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-lightgrey);
  display: flex;
  gap: var(--tg-spacing-26);

  .tab {
    display: flex;
    gap: var(--tg-spacing-8);
    align-items: center;
    line-height: 25px;
    cursor: pointer;

    &:active {
      transform: scale(0.96);
    }

    &:hover,
    &.active {
      color: var(--tg-text-white);
      --tg-icon-color: var(--tg-text-white);
    }
  }
}
</style>
