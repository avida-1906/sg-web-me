<script setup lang="ts">
interface Props {
  msg: string
}

const { msg } = defineProps<Props>()

const atUserReg = /@[a-z0-9]{3,14}/g
const emojiReg = /%:[a-z]+:%/g

const splitByEmojiMsg = computed(() => msg.split(emojiReg))
const matchedEmojis = computed(() => msg.match(emojiReg) ?? [])
// const matchedAtUsers = computed(() => msg.match(atUserReg))

const msgHtml = computed(() => {
  const temp = []
  for (let i = 0; i < splitByEmojiMsg.value.length; i++) {
    const matchedAtUsersInner = splitByEmojiMsg.value[i].match(atUserReg)
    if (matchedAtUsersInner && matchedAtUsersInner.length) {
      const splitByAtUserMsgInner = splitByEmojiMsg.value[i].split(atUserReg)
      for (let j = 0; j < splitByAtUserMsgInner.length; j++) {
        temp.push({ content: splitByAtUserMsgInner[j], type: 'text' })
        if (j < matchedAtUsersInner.length)
          temp.push({ type: 'AppChatMsgAt', content: { name: matchedAtUsersInner[j] } as any })
      }
    }
    else {
      temp.push({ content: splitByEmojiMsg.value[i], type: 'text' })
    }
    if (
      matchedEmojis.value
      && matchedEmojis.value.length
      && i <= matchedEmojis.value?.length - 1) {
      const idx = allEmojis.map(m => `%:${m.split('.')[0]}:%`).findIndex(ele => ele === matchedEmojis.value[i])
      if (idx !== -1)
        temp.push({ type: 'BaseImage', content: { alt: matchedEmojis.value[i], url: `/png/emoji/${allEmojis[idx]}`, class: 'emoji' } as any })
      else
        temp.push({ content: matchedEmojis.value[i], type: 'text' })
    }
  }
  return temp
})
</script>

<template>
  <span>
    <template v-for="item in msgHtml" :key="item">
      <template v-if="item.type === 'AppChatMsgAt'">
        <AppChatMsgAt :user="item.content" />
      </template>
      <template v-else-if="item.type === 'BaseImage'">
        <BaseImage v-bind="item.content" />
      </template>
      <template v-else>{{ item.content }}</template>
    </template>
  </span>
</template>

<style lang="scss" scoped>
span {
  font-size: var(--tg-font-size-default);
  -webkit-text-size-adjust: 100%;
}
</style>
