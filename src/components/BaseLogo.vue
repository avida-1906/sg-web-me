<script setup lang="ts">
interface Props {
  mode?: 'light' | 'dark'
  useSmall?: boolean
  isBack?: boolean
  static?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'light',
  useSmall: false,
  isBack: false,
  static: true,
})

const router = useLocalRouter()
const { logoAndIcoAndLoading } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const { leftIsExpand, closeLeftSidebar } = useLeftSidebar()

const showBack = computed(() => {
  return isMobile.value && props.isBack && isLogin.value
    ? [`/${getCurrentUrlLanguage()}/sports/${getSportsPlatId()}`, `/${getCurrentUrlLanguage()}/casino`].includes(router.currentRoute.value.path)
    : true
})

function to() {
  if (props.static)
    return
  const currentPath = router.currentRoute.value.path
  if (currentPath.includes('sports')) {
    sportsLobbyBus.emit(true)
    router.push(`/sports/${getSportsPlatId()}`)
  }

  else {
    casinoLobbyBus.emit(true)
    router.push('/casino')
  }

  isMobile.value && leftIsExpand.value && closeLeftSidebar()
}
</script>

<template>
  <div class="base-logo">
    <BaseAspectRatio
      v-show="showBack"
      ratio="150/53"
      :style="{
        'max-width': useSmall ? '60px' : '80px',
        'min-width': '20px',
        '--app-sport-image-error-icon-size': '40px',
      }"
      @click="to"
    >
      <BaseButton v-if="!static" type="text" size="none">
        <AppImage
          v-if="logoAndIcoAndLoading.logo_white"
          err-icon="img-casino-error"
          is-network
          :url="mode === 'light'
            ? logoAndIcoAndLoading.logo_white : logoAndIcoAndLoading.logo_gray
          "
        >
          <BaseImage v-if="mode === 'light'" url="/img/logo/logo_light.svg" />
          <BaseImage v-else url="/img/logo/logo_dark.svg" />
        </AppImage>
      </BaseButton>
      <template v-else>
        <AppImage
          v-if="logoAndIcoAndLoading.logo_white"
          err-icon="img-casino-error"
          is-network
          :url="mode === 'light'
            ? logoAndIcoAndLoading.logo_white : logoAndIcoAndLoading.logo_gray
          "
        >
          <BaseImage v-if="mode === 'light'" url="/img/logo/logo_light.svg" />
          <BaseImage v-else url="/img/logo/logo_dark.svg" />
        </AppImage>
      </template>
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
        style="font-size: var(--tg-font-size-base);
        --tg-icon-color:var(--tg-text-white)"
        name="uni-back"
      />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
</style>
