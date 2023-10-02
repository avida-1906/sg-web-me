<script setup lang="ts">
interface Props {
  ratio?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  ratio: '1/1',
  width: '',
})

const { bool: supportsFlex, setBool } = useBoolean(false)

// 检测supportsCSS方法，IE不存在方法，Opera使用了一个不同的方法名supportsCSS
const supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false)
const [w, h] = props.ratio.split('/').map(v => Number.parseInt(v))

const componentStyle = computed(() => {
  return {
    width: props.width || '100%',
    aspectRatio: supportsFlex.value ? props.ratio : '',
  }
})
const innerStyle = computed(() => {
  return {
    paddingTop: `${(h / w) * 100}%`,
  }
})

if (supportsCSS)
  setBool(CSS.supports('aspect-ratio', '1/1')) // 浏览器是否支持这个css
</script>

<template>
  <div class="base-aspect-ratio" :style="componentStyle">
    <div v-if="!supportsFlex" class="base-aspect-ratio__inner" :style="innerStyle">
      <div class="base-aspect-ratio__content">
        <slot />
      </div>
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style scoped>
.base-aspect-ratio{
  width: 100%;
}
.base-aspect-ratio__inner {
  width: 100%;
  position: relative;
}

.base-aspect-ratio__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
