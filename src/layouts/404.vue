<script lang="ts" setup>
const { t } = useI18n()
const router = useLocalRouter()
</script>

<template>
  <div class="page-404">
    <BaseEmpty icon="uni-404">
      <template #icon>
        <BaseIcon font-size="168px" name="uni-404" />
      </template>
      <template #description>
        <BaseButton custom-padding bg-style="primary" @click="router.back()">
          {{ t('navigation_back') }}
        </BaseButton>
      </template>
    </BaseEmpty>
  </div>
</template>

<style lang="scss" scoped>
.page-404 {
  height: 100%;
  margin-top: 24.6vh;
  --tg-base-button-padding-x: var(--tg-spacing-38);
  --tg-base-button-padding-y: var(--tg-spacing-9);
}
</style>
