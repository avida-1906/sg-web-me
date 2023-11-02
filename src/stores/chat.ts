import type { Room } from '~/types'
import { languageMap } from '~/modules/i18n'

const { VITE_SOCKET_PREFIX } = getEnv()

export const allEmojis = [
  'adesanya.png',
  'beer.png',
  'biden.png',
  'coffee.png',
  'coupon.png',
  'dendi.png',
  'djokovic.png',
  'doge.png',
  'donut.png',
  'easyms.png',
  'eddie.png',
  'elon.png',
  'ezpz.png',
  'feelsgoodman.png',
  'gary.png',
  'jordan.png',
  'kanye.png',
  'lambo.png',
  'lebron.png',
  'lefroge.png',
  'mahomes.png',
  'mcgregor.png',
  'messi.png',
  'monkas.png',
  'nadal.png',
  'nightdoge.png',
  'pepehands.png',
  'pikachu.png',
  'poggers.png',
  'rish.png',
  'ronaldo.png',
  'santa.png',
  'stonks.png',
  'sus.png',
  'trump.png',
  'umbrella.png',
  'woods.png',
  'cooldoge.png',
]

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
