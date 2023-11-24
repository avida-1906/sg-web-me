<script lang="ts" setup>
interface Props {
  url: string // 图像地址
  name?: string // 图像名称
  /** 大小 单位px 默认100% */
  size?: number
  fit?: 'contain' | 'fill' | 'cover' // 图像如何适应容器高度和宽度
  isNetwork?: boolean
  errIcon: string
}

withDefaults(defineProps<Props>(), {
  name: '',
  fit: 'contain',
  isNetwork: false,
  errIcon: 'uni-vector',
})

const { bool: showError, setTrue: setTrueShowError } = useBoolean(false)
</script>

<template>
  <BaseImage
    v-if="!showError"
    :url="url"
    :name="name"
    :width="size ? (`${size}px`) : '100%'"
    :fit="fit"
    :is-network="isNetwork"
    @error-img="setTrueShowError"
  />
  <BaseIcon
    v-else
    :style="{ 'font-size': size ? (`${size}px`) : 'inherit' }"
    :name="errIcon"
  />
</template>

<style lang="scss" scoped>

</style>
