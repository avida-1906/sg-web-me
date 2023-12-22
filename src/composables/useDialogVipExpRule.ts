import AppVipExpRule from '~/components/AppVipExpRule.vue'

export function useDialogVipExpRule() {
  const {
    openDialog: openVipExpRuleDialog,
    closeDialog: closeVipExpRuleDialog,
  } = useDialog({
    title: '经验计算规则',
    icon: 'uni-conter-line',
    default: () => h(AppVipExpRule),
  })

  return {
    openVipExpRuleDialog,
    closeVipExpRuleDialog,
  }
}
