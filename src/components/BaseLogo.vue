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
    <BaseButton v-show="!showBack" type="text" @click="router.back()">
      <BaseIcon name="uni-arrowleft-line" />
      返回
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.base-logo {

}
</style>
