<script lang="ts" setup>
interface Props {
  level: string
}

defineProps<Props>()
</script>

<template>
  <BaseIcon :name="`vip${level}`" />
</template>

<style lang="scss" scoped>
</style>
