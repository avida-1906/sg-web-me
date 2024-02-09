<script setup lang='ts'>
interface Props {
  username: string
  level?: string
}

defineProps<Props>()

const { copy } = useClipboard()
const { openNotify } = useNotify()
const { t } = useI18n()

function copyClick(username: string) {
  copy(username)
  openNotify({
    title: t('copied'),
    type: 'success',
    message: t('copy_success') + username,
  })
}
</script>

<template>
  <div
    class="center app-report-user-name cursor-pointer"
    @click="copyClick(username)"
  >
    <AppVipIcon v-if="level" :level="level" />
    <span>{{ username }}</span>
    <BaseIcon name="uni-doc" />
  </div>
</template>

<style>
</style>

<style lang='scss' scoped>
.app-report-user-name {
  gap: var(--tg-spacing-4);
}
</style>
