import type { Room } from '~/types'

export interface FeedBackItem {
  feed_id: string
  bonusState: 1 | 2
  [k: string]: any
}

const { VITE_SOCKET_PREFIX } = getEnv()

export const allSmileFace = [
  '😁', '😂', '😃', '😄', '😅', '😆',
  '😉', '😊', '😋', '😌', '😍', '😏',
  '😒', '😓', '😔', '😖', '😘', '😚',
  '😜', '😝', '😞', '😠', '😡', '😢',
  '😣', '😤', '😥', '😨', '😩', '😪',
  '😫', '😭', '😰', '😱', '😲', '😳',
  '😵', '😷', '😸', '😹', '😺', '😻',
  '😼', '😽', '😾', '😿', '🙀', '🙅',
  '🙆', '🙇', '🙈', '🙉', '🙊', '🙋',
  '🙌', '🙍', '🙎', '🙏', '😀', '😇',
  '😈', '😎', '😐', '😑', '😕', '😗',
  '😙', '😛', '😟', '😦', '😧', '😬',
  '😮', '😯', '😴', '😶', '💚', '💛',
  '💝', '💞', '💟', '💔', '💕', '💖',
  '💗',
]

export const allEmojis = [
  'adesanya.png',
  'biden.png',
  'beer.png',
  'blob.webp',
  'catbread.webp',
  'coffee.png',
  'cooldoge.png',
  'coupon.png',
  'coin.webp',
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
  'nyancat.webp',
  'lefroge.png',
  'mahomes.png',
  'mcgregor.png',
  'messi.png',
  'monkas.png',
  'nadal.png',
  'nightdoge.png',
  'pepehands.png',
  'pikachu.png',
  'rish.png',
  'ronaldo.png',
  'woods.png',
  'santa.png',
  'stonks.png',
  'sus.png',
  'trump.png',
  'umbrella.png',
  'pepelaugh.png',
  'pepe.png',
  'poggers.png',
]

export const useChatStore = defineStore('chat', () => {
  const { bool: hideChat, toggle: toggleChat } = useBoolean(false)
  const {
    bool: showFeedbackChat,
    setFalse: setFeedbackChatFalse,
    setTrue: setFeedbackChatTrue,
  } = useBoolean(false)
  const feedBackItem = ref<FeedBackItem | undefined>()

  const chatRoomList = reactive<Array<Room>>([
    { icon: 'flag-cn', label: '中文', value: 'zh-CN' },
    { icon: 'flag-en', label: 'English', value: 'en-US' },
    { icon: 'flag-vn', label: 'Tiếng Việt', value: 'vi-VN' },
    { icon: 'flag-br', label: 'Português', value: 'pt-BR' },
    { icon: 'flag-in', label: 'India', value: 'hi-IN' },
    { icon: 'flag-thai', label: 'ประเทศไทย', value: 'th-TH' },
  ])

  const room = ref(chatRoomList.find(c => c.value === getCurrentLanguageForFrontend()) || chatRoomList[0])

  const currentLanguage = computed(() => room.value.value)
  const roomLang = computed(() => EnumLanguage[currentLanguage.value])
  const topic = computed(() => {
    const prefix = VITE_SOCKET_PREFIX
    const lang = EnumLanguage[currentLanguage.value]
    const _topic = `${prefix}/chat/${lang}`
    return _topic
  })

  function setRoom(r: Room) {
    room.value = r
  }

  function setFeedbackItem(v?: FeedBackItem) {
    feedBackItem.value = v
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
    showFeedbackChat,
    setFeedbackChatFalse,
    setFeedbackChatTrue,
    feedBackItem,
    setFeedbackItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
