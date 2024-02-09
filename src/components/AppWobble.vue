<script lang="ts" setup>
import type { EnumSportType } from '~/utils/enums'

interface Props {
  type?: EnumSportType
  icon?: string
}

const props = defineProps<Props>()

const _icon = computed(() => {
  if (props.icon !== void 0)
    return props.icon

  else if (props.type !== void 0)
    return `spt-${props.type}`

  else
    return 'app-logo'
})
</script>

<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="wobble">
        <BaseIcon :name="_icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wobble {
  animation-name: wobble;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.87,-.41,.19,1.44);
}
.loader-wrapper {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
