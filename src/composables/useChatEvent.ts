export function goBottom(time?: number) {
  nextTick(() => {
    // setTimeout(() => {
    document.querySelector('.msg-tail')?.scrollIntoView({ behavior: 'smooth' })
    // }, time !== undefined ? time : 300)
  })
}

export function useChatEvent() {
  const room = ref()

  return {
    room,
  }
}
