import AppChatRulesDialog from '~/components/AppChatRulesDialog.vue'

export function useChatRulesDialog() {
  const { openDialog: openChatRulesDialog, closeDialog: closeChatRulesDialog } = useDialog({
    title: '聊天室规则',
    icon: 'chat-rule',
    default: () => h(AppChatRulesDialog),
  })

  return {
    openChatRulesDialog,
    closeChatRulesDialog,
  }
}
