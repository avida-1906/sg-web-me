import AppVipExpRule from '~/components/AppVipExpRule.vue'

export function useDialogVipExpRule() {
  const { t } = useI18n()
  const {
    openDialog: openVipExpRuleDialog,
    closeDialog: closeVipExpRuleDialog,
  } = useDialog({
    title: t('exp_rule'),
    icon: 'uni-conter-line',
    default: () => h(AppVipExpRule),
  })

  return {
    openVipExpRuleDialog,
    closeVipExpRuleDialog,
  }
}
