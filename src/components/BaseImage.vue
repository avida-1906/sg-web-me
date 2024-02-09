<script lang="ts" setup>
interface Props {
  url: string // 图像地址
  name?: string // 图像名称
  width?: string // 图像宽度px
  height?: string // 图像高度px
  fit?: 'contain' | 'fill' | 'cover' // 图像如何适应容器高度和宽度
  isCloud?: boolean
  isNetwork?: boolean
  objectPosition?: string
  loading?: 'eager' | 'lazy'
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  name: '',
  width: '100%',
  height: '100%',
  fit: 'contain',
  objectPosition: 'center center',
  loading: 'lazy',
})

const emit = defineEmits(['clickImg', 'errorImg', 'loadImg'])

const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()
const suffix = document.documentElement.className.trim().split(' ').includes('webp')

const imgUrl = computed(() => {
  if (props.isCloud) {
    return `${VITE_CASINO_IMG_CLOUD_URL}${props
      .url.replace('%lang%', getCurrentLanguageForBackend())}`
  }
  if (props.isNetwork)
    return `${application.getImgUrl(props.url)}`

  return suffix ? props.url.replace(/png/g, 'webp') : props.url
})
</script>

<template>
  <div class="base-image">
    <img
      :style="`width: ${width}; height: ${height};
      object-fit: ${fit};object-position:${objectPosition};`"
      :loading="loading"
      :src="imgUrl"
      @load="emit('loadImg')"
      @click="emit('clickImg')"
      @error="emit('errorImg')"
    >
  </div>
</template>

<style>
:root {
  --tg-base-img-style-radius: var(--tg-radius-none);
  --tg-img-object-position: center;
  --tg-base-img-max-width: 100%;
  --tg-base-img-max-height: 100%;
}
</style>

<style lang="scss" scoped>
.base-image {
  position: relative;
  // width: 100%;
  // height: 100%;

  img {
    border-radius: var(--tg-base-img-style-radius);
    object-position: var(--tg-img-object-position);
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    max-width: var(--tg-base-img-max-width);
    max-height: var(--tg-base-img-max-height);
  }
}
</style>
