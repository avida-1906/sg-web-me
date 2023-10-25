type EnumLanguageKey = keyof typeof EnumLanguage

// 获取枚举EnumLanguage的value作为类型

export function useChat(k: EnumLanguage) {
  const msgTopic = computed(() => {
    return 'prefix/chat/zhCN'
  })

  const sendMessage = (message: string) => {
    console.log(message)
  }

  return {
    sendMessage,
  }
}
