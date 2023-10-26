export const chatEventBus = useEventBus<string>('/chat/zh_CN')

export function goBottom() {
  nextTick(() => {
    setTimeout(() => {
      document.querySelector('.msg-tail')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  })
}

export function useChatEvent() {
  const room = ref()

  return {
    room,
  }
}
