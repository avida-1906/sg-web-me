<script setup lang="ts">
interface Props {
  mode?: 'light' | 'dark'
  useSmall?: boolean
  isBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'light',
  useSmall: false,
  isBack: false,
})

const router = useLocalRouter()
const { logoAndIcoAndLoading } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { leftIsExpand, closeLeftSidebar } = useLeftSidebar()

const showBack = computed(() => {
  return isMobile.value && props.isBack
    ? [`/sports/${getSportsPlatId()}`, '/casino'].includes(router.currentRoute.value.path)
    : true
})

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
      v-show="showBack"
      ratio="150/53"
      class="cursor-pointer"
      :style="{
        'max-width': useSmall ? '60px' : '80px',
        'min-width': '20px',
        '--app-sport-image-error-icon-size': '40px',
      }"
      @click="to"
    >
      <AppImage
        err-icon="img-casino-error"
        is-network
        :url="logoAndIcoAndLoading.logo"
      >
        <!-- <BaseImage v-if="mode === 'light'" url="/img/logo/logo_light.svg" />
        <BaseImage v-else url="/img/logo/logo_dark.svg" /> -->
      </AppImage>
    </BaseAspectRatio>
    <BaseButton
      v-show="!showBack"
      style="--tg-base-button-padding-x:var(--tg-spacing-button-padding-vertical-xs) 0;
        --tg-base-button-padding-y: var(--tg-spacing-button-padding-vertical-xs)
        var(--tg-spacing-button-padding-horizontal-lg)"
      type="text"
      custom-padding
      @click="router.back()"
    >
      <BaseIcon
        style="font-size: 21px;"
        name="uni-back"
      />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
</style>
