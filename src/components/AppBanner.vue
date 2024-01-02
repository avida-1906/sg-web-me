<script setup lang="ts">
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  type?: 'casino' | 'sports'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'casino',
})

const router = useLocalRouter()
const { appContentWidth } = storeToRefs(useWindowStore())

const {
  runAsync: runMemberBannerList,
  data: bannerList,
} = useRequest(ApiMemberBannerList)

const mgt = computed(() => {
  if (appContentWidth.value < 600)
    return '0'
  else
    return 'var(--tg-spacing-12)'
})

function jumpToUrl(item: { type: number; jumpUrl: string }) {
  /** 跳转类型 1-自定义 2-娱乐城 3-体育 4-优惠活动 5-联盟中心 */
  switch (item.type) {
    case 1:
      router.push(item.jumpUrl)
      break
    case 2:
      router.push('/casino')
      break
    case 3:
      router.push(`/sports/${getSportsPlatId()}`)
      break
    case 4:
      router.push('/promotions')
      break
    case 5:
      router.push('/affiliate/promotion-tutorial')
      break
  }
}

const items = computed(() => {
  if (!bannerList.value)
    return []
  return bannerList.value.map(item => ({
    imgUrl: item.image_url[getCurrentLanguageForBackend()],
    type: item.jump_type,
    jumpUrl: item.jump_url,
  }))
})

function fetchDataOrLoadImage() {
  return new Promise((resolve, reject) => {
    runMemberBannerList({
      banner_type: props.type === 'casino' ? '1' : '2',
    }).then(async () => {
      await application.allSettled([...items.value.map(item => application.loadImage(item.imgUrl))])
      resolve(true)
    }).catch(() => {
      reject(new Error('fetch data error'))
    })
  })
}

await application.allSettled([fetchDataOrLoadImage()])
</script>

<template>
  <div
    class="app-banner" :style="{
      marginTop: mgt,
    }"
  >
    <BaseSwipe
      :items="items"
      @click-item="jumpToUrl"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>
