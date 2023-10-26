import BaseImage from './BaseImage.vue'
import AppChatMsgAt from './AppChatMsgAt.vue'

const atUserReg = /@[a-z0-9]{3,14}/g
const emojiReg = /:[a-z]+:/g

const allEmojis = [
  'adesanya.webp',
  'beer.webp',
  'biden.png',
  'blob.webp',
  'catbread.gif',
  'coffee.webp',
  'coin.webp',
  'coupon.webp',
  'dendi.png',
  'djokovic.webp',
  'doge.png',
  'donut.webp',
  'easyms.webp',
  'eddie.webp',
  'elon.webp',
  'ezpz.webp',
  'feelsgoodman.webp',
  'gary.webp',
  'jordan.webp',
  'kanye.webp',
  'lambo.png',
  'lebron.webp',
  'lefroge.webp',
  'mahomes.webp',
  'mcgregor.png',
  'messi.webp',
  'monkas.webp',
  'nadal.png',
  'nightdoge.webp',
  'nyancat.gif',
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
]

export default {
  props: {
    msg: String,
  },
  setup({ msg }: any) {
    const splitByEmojiMsg = computed(() => msg.split(emojiReg))
    const matchedEmojis = computed(() => msg.match(emojiReg) ?? [])
    const matchedAtUsers = computed(() => msg.match(atUserReg))

    const msgHtml = computed(() => {
      const temp = []
      for (let i = 0; i < splitByEmojiMsg.value.length; i++) {
        const matchedAtUsersInner = splitByEmojiMsg.value[i].match(atUserReg)
        if (matchedAtUsersInner && matchedAtUsersInner.length) {
          const splitByAtUserMsgInner = splitByEmojiMsg.value[i].split(atUserReg)
          for (let j = 0; j < splitByAtUserMsgInner.length; j++) {
            temp.push(splitByAtUserMsgInner[j])
            if (j < matchedAtUsersInner.length)
              temp.push(h(AppChatMsgAt, { user: { name: matchedAtUsersInner[j] } }))
          }
        }
        else {
          temp.push(splitByEmojiMsg.value[i])
        }
        if (
          matchedEmojis.value
          && matchedEmojis.value.length
          && i <= matchedEmojis.value?.length - 1) {
          const idx = allEmojis.map(m => `:${m.split('.')[0]}:`).findIndex(ele => ele === matchedEmojis.value[i])
          if (idx !== -1)
            temp.push(h(BaseImage, { alt: matchedEmojis.value[i], url: `/img/emoji/${allEmojis[idx]}`, class: 'emoji' }))
          else
            temp.push(matchedEmojis.value[i])
        }
      }
      return temp
    })
    return () => h('span', null, msgHtml.value)
  },
}
