<script lang="ts" setup>
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  url: string // 图像地址
  name?: string // 图像名称
  width?: string // 图像宽度px
  height?: string // 图像高度px
  fit?: 'contain' | 'fill' | 'cover' // 图像如何适应容器高度和宽度
  isCloud?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  url: '',
  name: '',
  width: '100%',
  height: '100%',
  fit: 'contain',
})

const emit = defineEmits(['clickImg'])
const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()
const imgUrl = computed(() => {
  if (props.isCloud)
    return `${VITE_CASINO_IMG_CLOUD_URL}${props.url.replace('%lang%', getCurrentLanguageForBackend())}`

  return props.url
})

const { bool: complete, setTrue } = useBoolean(false)
function onComplete() { // 图片加载完成
  setTrue()
}

function handleClick() {
  emit('clickImg')
}
</script>

<template>
  <div class="base-image">
    <img
      :style="`width: ${width}; height: ${height}; object-fit: ${fit};`" loading="lazy" :src="imgUrl"
      @load="onComplete" @click="handleClick"
    >
    <div v-if="!complete" class="img-load">
      <slot>
        <!-- <BaseLoading /> -->
      </slot>
    </div>
  </div>
</template>

<style>
:root{
  --tg-base-img-style-radius: var(--tg-radius-none);
  --tg-img-object-position:left;
}
</style>

<style lang="scss" scoped>
.base-image {
  width: 100%;
  height: 100%;
  position: relative;

  .img-load {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    border-radius: var(--tg-base-img-style-radius);
    object-position: var(--tg-img-object-position);
  }
}
</style>
