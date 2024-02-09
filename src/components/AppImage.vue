<script lang="ts" setup>
interface Props {
  errIcon?: string
}

withDefaults(defineProps<Props>(), {
  errIcon: 'uni-vector',
})

const { bool: showError, setTrue: setTrueShowError } = useBoolean(false)
</script>

<template>
  <BaseImage
    v-if="!showError"
    v-bind="$attrs"
    @error-img="setTrueShowError"
  />
  <slot v-else>
    <BaseIcon
      :data-title="JSON.stringify($attrs)"
      class="err-icon"
      :name="errIcon"
    />
  </slot>
</template>

<style>
:root {
  --app-sport-image-error-icon-size: 10px;
}
</style>

<style lang="scss" scoped>
.err-icon {
  font-size: var(--app-sport-image-error-icon-size);
}
</style>
