<script lang="ts" setup>
const homeContainerRef = ref<HTMLElement | null>(null)

const windowStore = useWindowStore()
const { width } = useElementSize(homeContainerRef)

watch(() => width.value, (newWidth) => {
  windowStore.setAppContentWidth(newWidth)
})
</script>

<template>
  <section class="page-content">
    <div ref="homeContainerRef" class="home-container margin-auto">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.margin-auto {
  margin: 0 auto;
}
</style>
