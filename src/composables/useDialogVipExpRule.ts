import AppVipExpRule from '~/components/AppVipExpRule.vue'

export function useDialogVipExpRule() {
  const { t } = useI18n()
  const title = computed(() => t('exp_rule'))
  const {
    openDialog: openVipExpRuleDialog,
    closeDialog: closeVipExpRuleDialog,
  } = useDialog({
    title: title.value,
    icon: 'uni-currency-rate',
    default: () => h(AppVipExpRule),
  })

  return {
    openVipExpRuleDialog,
    closeVipExpRuleDialog,
  }
}
