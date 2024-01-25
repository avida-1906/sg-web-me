<script setup lang='ts'>
const { t } = useI18n()
const { currentNoticeId, saveCurrentNoticeId, removeCurrentNoticeId } = useDialogSiteAnnouncementList()
const { bool: checked } = useBoolean(false)

function onNoMoreTipChecked(v: boolean) {
  if (v)
    return saveCurrentNoticeId()
  removeCurrentNoticeId()
}

watch(currentNoticeId, (a) => {
  console.log('🚀 ~ watch ~ a:', a)
})
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
