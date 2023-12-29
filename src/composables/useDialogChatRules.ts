import AppChatRulesDialog from '~/components/AppChatRulesDialog.vue'

export function useChatRulesDialog() {
  const { t } = useI18n()
  const title = computed(() => t('chat_rule_title'))
  const {
    openDialog: openChatRulesDialog,
    closeDialog: closeChatRulesDialog,
  } = useDialog({
    title: title.value,
    icon: 'chat-rule',
    default: () => h(AppChatRulesDialog),
  })

  return {
    openChatRulesDialog,
    closeChatRulesDialog,
  }
}
