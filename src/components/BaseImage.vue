<script lang="ts" setup>
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  url: string // 图像地址
  name?: string // 图像名称
  width?: string // 图像宽度px
  height?: string // 图像高度px
  fit?: 'contain' | 'fill' | 'cover' // 图像如何适应容器高度和宽度
  isCloud?: boolean
  isGame?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  name: '',
  width: '100%',
  height: '100%',
  fit: 'contain',
})

const emit = defineEmits(['clickImg'])
const { bool: isError, setTrue: setErrorTrue } = useBoolean(false)
const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()

const imgUrl = computed(() => {
  if (props.isGame)
    return `${VITE_CASINO_IMG_CLOUD_URL}${props.url.replace('%lang%', getCurrentLanguageForBackend())}`

  if (props.isCloud)
    return `${VITE_CASINO_IMG_CLOUD_URL}${props.url}`

  return props.url
})

function handleClick() {
  emit('clickImg')
}
</script>

<template>
  <div class="base-image">
    <img
      v-if="!isError"
      :style="`width: ${width}; height: ${height}; object-fit: ${fit};`" loading="lazy" :src="imgUrl" @click="handleClick" @error="setErrorTrue"
    >
    <div v-else class="center img-load">
      <BaseEmpty>
        <template #icon>
          <BaseIcon font-size="43" name="img-error" />
        </template>
        <template #description>
          <span style="font-size: var(--tg-font-size-xs);">加载失败了x_x</span>
        </template>
      </BaseEmpty>
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
  .img-load {
    width: 100%;
    height: 100%;
    background-color: var(--tg-secondary-grey);
  }
  img{
    border-radius: var(--tg-base-img-style-radius);
    object-position: var(--tg-img-object-position);
  }
}
</style>
