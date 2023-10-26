export const chatEventBus = useEventBus<string>('/chat/zh_CN')

export function useChatEvent() {
  const room = ref()

  return {
    room,
  }
}
