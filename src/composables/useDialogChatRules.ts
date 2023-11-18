import AppChatRulesDialog from '~/components/AppChatRulesDialog.vue'

export function useChatRulesDialog() {
  const { t } = useI18n()

  const {
    openDialog: openChatRulesDialog,
    closeDialog: closeChatRulesDialog,
  } = useDialog({
    title: t('chat_rule_title'),
    icon: 'chat-rule',
    default: () => h(AppChatRulesDialog),
  })

  return {
    openChatRulesDialog,
    closeChatRulesDialog,
  }
}
