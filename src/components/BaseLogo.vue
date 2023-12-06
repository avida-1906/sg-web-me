<script setup lang="ts">
interface Props {
  mode?: 'light' | 'dark'
  useSmall?: boolean
}

withDefaults(defineProps<Props>(), {
  mode: 'light',
  useSmall: false,
})

const router = useLocalRouter()
const { logoAndIcoAndLoading } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { leftIsExpand, closeLeftSidebar } = useLeftSidebar()

function to() {
  const currentPath = router.currentRoute.value.path
  if (currentPath.includes('sports'))
    router.push(`/sports/${getSportsPlatId()}`)
  else if (currentPath.includes('casino'))
    router.push('/casino')
  isMobile.value && leftIsExpand.value && closeLeftSidebar()
}
</script>

<template>
  <div class="base-logo">
    <BaseAspectRatio
      ratio="150/53"
      :style="{ 'max-width': useSmall ? '45px' : '95px', 'min-width': '20px' }"
      @click="to"
    >
      <AppImage
        :style="{
          '--app-sport-image-error-icon-size': '40px',
        }"
        err-icon="img-casino-error"
        is-cloud
        :url="useSmall ? logoAndIcoAndLoading.logo
          : logoAndIcoAndLoading.logo"
      />
    </BaseAspectRatio>
  </div>
</template>

<style lang="scss" scoped>
.base-logo {
  .icon-app-logo {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
