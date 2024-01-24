<script setup lang='ts'>
const { t } = useI18n()
const { bool: checked } = useBoolean(false)

function onNoMoreTipChecked(v: boolean) {
  if (v)
    return Local.set(STORAGE_NO_MORE_TIP_DAY, new Date().getDate())
  Local.remove(STORAGE_NO_MORE_TIP_DAY)
}
</script>

<template>
  <div class="flex items-center">
    <BaseCheckBox
      v-model="checked"
      style="--tg-base-checkbox-label-color:var(--tg-text-white);"
      @check="onNoMoreTipChecked"
    >
      {{ t('dont_tip_today') }}
    </BaseCheckBox>
  </div>
</template>

<style lang='scss' scoped>

</style>
