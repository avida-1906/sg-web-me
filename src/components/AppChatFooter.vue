<script lang="ts" setup>
//  @ 用户
//  : 表情
//  / 指令
//  enter 消息加空格->发送
//  enter 加空格再次 enter 发送

// type CommandType = '/bet' | '/user' | '/tip' | '/rain' | '/ignore' | '/unignore'

const chatStore = useChatStore()
const { roomLang } = storeToRefs(chatStore)
const { openChatRulesDialog } = useChatRulesDialog()
const { openStatisticsDialog } = useStatisticsDialog()

const maxMsgLen = 512
const msgInput = ref()
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
const atUsers = reactive([
  { name: 'abc32434', id: '39429304' },
  { name: 'adflkl32434', id: '234324335' },
  { name: 'iofugsdfs32434', id: '3450503495' },
  { name: 'eoiqfd00809', id: '98734957342' },
  { name: 'flasuoi0320423', id: '932479238' },
])
const allCommandList = reactive([
  { icon: 'chat-bet', command: '/bet', param: '[bet id]', text: '查看赌注' },
  { icon: 'chat-atuser', command: '/user', param: '@user', text: '查看玩家' },
  { icon: 'chat-tip', command: '/tip', param: '@user', text: '给用户发送小费' },
  { icon: 'chat-rain', command: '/rain', param: '', text: '下红包雨' },
  { icon: 'chat-ignore', command: '/ignore', param: '@user', text: '拉入黑名单' },
  {
    icon: 'chat-unignore',
    command: '/unignore',
    param: '@user',
    text: '移出黑名单',
  },
])

const commandList = computed(() => {
  const i = message.value.lastIndexOf('/')
  if (i === 0)
    return allCommandList.filter(a => a.command.indexOf(message.value) === 0)

  return []
})
const matched_at_users = computed(() => {
  const j = message.value.lastIndexOf('@')
  const k = message.value.lastIndexOf(' ')
  if (k > j || j === -1) {
    return []
  }
  else {
    const temp = message.value.slice(j + 1)
    const filtered = atUsers.filter(a => a.name.includes(temp))
    if (filtered.length)
      return filtered

    else
      return [{ name: temp, id: '00' }]
  }
})
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
  if (emojiName.value === undefined) {
    return []
  }
  else {
    return allEmojis.filter((e) => {
      return e.split('.')[0].includes(emojiName.value ?? '')
    })
  }
})
const isCommand = computed(() => message.value[0] === '/')

const { run: runSendMsg, loading: sendLoading } = useRequest(ApiChatSendMessage, {
  onSuccess: () => {
    message.value = ''
    goBottom()
  },
})
function addEmoMsg(emo: string) {
  const i = message.value.lastIndexOf(':')
  message.value = `${message.value.slice(0, i + 1)}${emo.split('.')[0]}` + ': '
  msgInput.value?.getFocus()
}
function addAtUser(u: { name: string }) {
  const i = message.value.lastIndexOf('@')
  message.value = `${message.value.slice(0, i + 1) + u.name} `
  msgInput.value?.getFocus()
}
function addCommand(u: { command: string }) {
  message.value = `${u.command} `
  msgInput.value?.getFocus()
}
function sendMsg() {
  if (message.value[0] === '/') {
    const temp = message.value.split(' ')
    const firstSpaceIdx = message.value.indexOf(' ')
    const param = firstSpaceIdx !== -1 ? message.value.slice(firstSpaceIdx) : ''
    switch (temp[0]) {
      case '/bet':
        break
      case '/user':
        openStatisticsDialog(param.replace('@', ''))
        break
      case '/tip':
        break
      case '/rain':
        break
      case '/ignore':
        break
      case '/unignore':
        break
      default:
        break
    }
    return
  }
  if (message.value.length)
    runSendMsg({ c: message.value, lang: roomLang.value })
}

function enterPress(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (isCommand.value)
    console.log('处理指令')
}
</script>

<template>
  <section class="tg-app-chat-footer">
    <Transition>
      <div
        v-show="!sendLoading && emojis.length"
        class="scroll-y emoji-wrap layout-grid wrap"
      >
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
    <Transition>
      <div
        v-show="!sendLoading && matched_at_users.length"
        class="scroll-y wrap at-users-wrap layout-default"
      >
        <div
          v-for="u in matched_at_users"
          :key="u.id"
          class="button-wrap"
          @click="addAtUser(u)"
        >
          <div class="at-user-name">
            {{ u.name }}
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <div
        v-if="commandList.length"
        class="scroll-y wrap layout-default command-wrap"
      >
        <div
          v-for="u in commandList"
          :key="u.command"
          class="button-wrap"
          @click="addCommand(u)"
        >
          <div class="command">
            <div class="label">
              <BaseIcon :name="u.icon" />
              <span>{{ u.command }}</span>
              <span v-if="u.param" class="param">{{ u.param }}</span>
            </div>
            <div class="desc">
              {{ u.text }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <div class="chat-input">
      <BaseInput
        ref="msgInput"
        v-model="message"
        placeholder="输入您的消息"
        textarea
        :max="maxMsgLen"
        @down-enter="enterPress"
      />
    </div>
    <div class="online">
      <div class="green-dot" />
      <div>
        <span>在线： </span>
        <span>10,950</span>
      </div>
    </div>
    <div class="actions">
      <span>{{ maxMsgLen - message.length }}</span>
      <BaseButton type="text" @click="openChatRulesDialog">
        <BaseIcon name="chat-rule" />
      </BaseButton>
      <BaseButton bg-style="secondary" size="md" @click="sendMsg">
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
.at-users-wrap, .command-wrap {
  background: var(--tg-secondary-main);
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  overflow-y: auto;
  max-height: 50vh;
  .button-wrap {
    .at-user-name, .command {
      transition: background-color 0.2s;
      cursor: pointer;
      font-size: var(--tg-font-size-default);
      color: var(--tg-secondary-light);
      background-color: var(--tg-secondary-main);
      box-shadow: var(--tg-box-shadow);
      font-weight: var(--tg-font-weight-normal);
      padding:
      var(--tg-spacing-button-padding-vertical-sm)
      var(--tg-spacing-button-padding-horizontal-sm);
    }
    .command {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--tg-spacing-8);
      font-size: var(--tg-font-size-default);
      .label {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-semibold);
        .param {
          margin-left: var(--tg-spacing-4);
        }
      }
      .desc {
        font-weight: var(--tg-font-weight-normal);
        color: var(--tg-secondary-light);
      }
    }
  }
  .button-wrap:first-child {
    .at-user-name, .at-user-name:hover, .command, .command:hover {
      background-color: var(--tg-secondary-dark);
    }
    .command {
      .label {
        color: var(--tg-secondary-light);
      }
    }
  }
  .button-wrap:not(first-child) {
    .at-user-name:hover, .command:hover {
      background-color: var(--tg-text-grey);
    }
  }
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
