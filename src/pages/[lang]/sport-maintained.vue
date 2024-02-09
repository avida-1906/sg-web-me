<script setup lang='ts'>
const { t } = useI18n()
const { push } = useLocalRouter()
</script>

<template>
  <div class="min-h-[80vh] w-full flex items-center justify-center">
    <div class="flex flex-col items-center gap-16">
      <BaseIcon class="text-[125px] md:text-[173px]" name="empty-sports" />
      <span class="text-tg-secondary-light text-[18px] font-medium md:text-[24px]">
        {{ t('sports_under_maintain') }}
      </span>
      <div class="text-tg-text-grey text-center text-[14px] leading-[1.5] md:text-[18px]">
        <span>{{ t('maintain_time') }}</span><br>
        <span>2024-02-12 01:00  {{ t('to') }}  2024-02-12 06:00</span>
      </div>
      <BaseButton size="sm" @click="push('/')">
        {{ t('back_to_home') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

<route lang="yaml">
meta:
  layout: home
  </route>
