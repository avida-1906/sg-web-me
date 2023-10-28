import type { Room } from '~/types'
import { languageMap } from '~/modules/i18n'

const { VITE_SOCKET_PREFIX } = getEnv()

export const useChatStore = defineStore('chat', () => {
  const { bool: hideChat, toggle: toggleChat } = useBoolean(false)

  const chatRoomList = reactive<Array<Room>>([
    { icon: 'cn', label: '中文', value: 'zh-CN' },
    { icon: 'vn', label: 'Tiếng Việt', value: 'vi-VN' },
    { icon: 'br', label: 'Português', value: 'pt-BR' },
    { icon: 'in', label: 'India', value: 'hi-IN' },
    { icon: 'thai', label: 'ประเทศไทย', value: 'th-TH' },
  ])
  const room = ref(chatRoomList[0])

  const currentLanguage = computed(() => room.value.value)
  const roomLang = computed(() => languageMap[currentLanguage.value])
  const topic = computed(() => {
    const prefix = VITE_SOCKET_PREFIX
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
    currentLanguage,
    topic,
    roomLang,
    hideChat,
    toggleChat,
    setRoom,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
