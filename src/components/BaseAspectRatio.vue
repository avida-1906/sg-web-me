<script setup lang="ts">
interface Props {
  ratio?: string
  width?: string
}
// validator: (v) => {
//   const [w, h] = v.split(":").map(v => parseInt(v))
//   return !Number.isNaN(w) && !Number.isNaN(h)
// }
const props = withDefaults(defineProps<Props>(), {
  ratio: '1:1',
  width: '',
})

const [w, h] = props.ratio.split(':').map(v => Number.parseInt(v))

const componentStyle = computed(() => {
  return props.width ? { width: props.width } : {}
})
const innerStyle = computed(() => {
  return {
    paddingTop: `${(h / w) * 100}%`,
  }
})
</script>

<template>
  <div class="vue-aspect-ratio" :style="componentStyle">
    <div class="vue-aspect-ratio__inner" :style="innerStyle">
      <div class="vue-aspect-ratio__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-aspect-ratio__inner {
    position: relative;
}

.vue-aspect-ratio__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
