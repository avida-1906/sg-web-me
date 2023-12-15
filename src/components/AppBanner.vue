<script setup lang="ts">
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  type?: 'casino' | 'sports'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'casino',
})

const router = useLocalRouter()
const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()

const {
  runAsync: runMemberBannerList,
  data: bannerList,
} = useRequest(ApiMemberBannerList)

function jumpToUrl(item: { type: number; url: string }) {
  /** 跳转类型 1-自定义 2-娱乐城 3-体育 4-优惠活动 5-联盟中心 */
  switch (item.type) {
    case 1:
      window.location.href = item.url
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

function loadImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      resolve(true)
    }
    img.onerror = () => {
      reject(new Error(`load image error: ${url}`))
    }
  })
}

const items = computed(() => {
  if (!bannerList.value)
    return []
  return bannerList.value.map(item => ({
    imgUrl: item.image_url[getCurrentLanguageForBackend()],
    type: item.jump_type,
  }))
})

function fetchDataOrLoadImage() {
  return new Promise((resolve, reject) => {
    runMemberBannerList({
      banner_type: props.type === 'casino' ? '1' : '2',
    }).then(async () => {
      items.value.forEach(async (item) => {
        await loadImage(`${VITE_CASINO_IMG_CLOUD_URL}/${item.imgUrl}`)
      })
      resolve(true)
    }).catch(() => {
      reject(new Error('fetch data error'))
    })
  })
}

await application.allSettled([fetchDataOrLoadImage()])
</script>

<template>
  <div class="app-banner">
    <BaseSwipe
      :items="items"
      @click-item="jumpToUrl"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-banner{
  margin-top: var(--tg-spacing-12);
}
</style>
