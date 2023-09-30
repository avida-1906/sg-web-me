<script lang="ts" setup>
//  @ 用户
//  : 表情
//  / 指令
//  enter 消息加空格->发送

const { openChatRulesDialog } = useChatRulesDialog()

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
const message = ref('')

const emojiName = computed(() => {
  const i = message.value.lastIndexOf(':')
  const j = message.value.lastIndexOf('@')
  const k = message.value.lastIndexOf(' ')
  if (k > i || j > i)
    return undefined

  if (i !== -1)
    return message.value.slice(i + 1)
  return undefined
})
const emojis = computed(() => {
  if (emojiName.value === undefined)
    return []
  else
    return allEmojis.filter(e => e.split('.')[0].includes(emojiName.value ?? ''))
})

function addEmoMsg(emo: string) {
  const i = message.value.lastIndexOf(':')
  message.value = `${message.value.slice(0, i + 1)}${emo.split('.')[0]} ` + ': '
}
</script>

<template>
  <section class="tg-app-chat-footer">
    <Transition>
      <div v-show="emojis.length" class="emoji-wrap scroll-y layout-grid wrap">
        <div v-for="emo in emojis" :key="emo" class="button-wrap">
          <span class="box" @click="addEmoMsg(emo)">
            <BaseButton type="text">
              <div class="emo">
                <BaseImage :url="`/img/emoji/${emo}`" />
              </div>
            </BaseButton>
          </span>
        </div>
      </div>
    </Transition>
    <div class="chat-input">
      <BaseInput v-model="message" placeholder="输入您的消息" textarea />
    </div>
    <div class="online">
      <div class="green-dot" />
      <div>
        <span>在线： </span>
        <span>10,950</span>
      </div>
    </div>
    <div class="actions">
      <span>88</span>
      <BaseButton type="text" @click="openChatRulesDialog">
        <BaseIcon name="chat-rule" />
      </BaseButton>
      <BaseButton bg-style="secondary" size="md">
        发送
      </BaseButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(50px,1fr));
  gap: var(--tg-spacing-4);
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
}
.emoji-wrap {
  background: var(--tg-secondary-main);
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  overflow-y: auto;
  max-height: 50vh;
  .button-wrap {
    .box {
      display: inline-block;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 0.2s;
      &:hover, &.active {
        background-color: var(--tg-secondary-deepdark);
      }
    }
    .emo {
      width: var(--tg-spacing-25);
      height: var(--tg-spacing-25);
    }
  }
  .button-wrap:first-child {
    .box {
      background-color: var(--tg-secondary-deepdark);
    }
  }
}
.green-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
  background: var(--tg-primary-success);
  animation: OnlineFlash .2s ease-out;
}
.tg-app-chat-footer {
  position: relative;
  display: grid;
  align-items: center;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-8);
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
      "input input"
      "online actions";
  touch-action: none;
  .chat-input {
    grid-area: input;
  }
  .online {
    grid-area: online;
    display: flex;
    align-items: center;
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-xs);
    font-weight: var(--tg-font-weight-semibold);
    gap: var(--tg-spacing-8);
  }
  .actions {
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-xs);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    grid-area: actions;
    justify-content: flex-end;
    align-items: center;
    gap: var(--tg-spacing-12);
  }
}
</style>
