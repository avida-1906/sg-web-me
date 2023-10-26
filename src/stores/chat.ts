import type { Room } from '~/types'
import { languageMap } from '~/modules/i18n'

export const useChatStore = defineStore('chat', () => {
  const { bool: hideChat, toggle: toggleChat } = useBoolean(false)

  const chatRoomList = reactive<Array<Room>>([
    { icon: 'cn', label: '中文', value: 'zh-CN' },
    { icon: 'vn', label: 'Tiếng Việt', value: 'vi-VN' },
    { icon: 'br', label: 'Português', value: 'pt-BR' },
  ])
  const room = ref(chatRoomList[0])

  const currentLanguage = computed(() => room.value.value)
  const roomLang = computed(() => languageMap[currentLanguage.value])
  const topic = computed(() => {
    const prefix = 'dev'
    const lang = languageMap[currentLanguage.value]
    const _topic = `${prefix}/chat/${lang}`
    return _topic
  })

  function setRoom(r: Room) {
    room.value = r
  }

  return {
    chatRoomList,
    room,
    setRoom,
    currentLanguage,
    topic,
    roomLang,
    hideChat,
    toggleChat,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
