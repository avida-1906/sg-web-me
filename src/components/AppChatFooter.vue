<script lang="ts" setup>
//  @ 用户
//  : 表情
//  / 指令
//  enter 消息加空格->发送
//  enter 加空格再次 enter 发送

// type CommandType = '/bet' | '/user' | '/tip' | '/rain' | '/ignore' | '/unignore'
const { t } = useI18n()
const chatStore = useChatStore()
const { roomLang } = storeToRefs(chatStore)
const { userInfo, isLogin } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { openChatRulesDialog } = useChatRulesDialog()
const { openStatisticsDialog } = useStatisticsDialog()
const chatMessageBus = useEventBus(CHAT_MESSAGE_BUS)
const { bool: showEmoji, toggle: toggleEmoji, setBool: setEBool } = useBoolean(false)

const { openNotify } = useNotify()

const manCount = ref(application.numberToLocaleString(
  Math.floor(Math.random() * 100) + 1800,
  getCurrentLanguageForFrontend(),
))
const emojiWrap = ref()
const maxMsgLen = 160
const msgInput = ref()
const message = ref('')
const atUsers = reactive([
  { name: 'abc32434', id: '39429304' },
  { name: 'adflkl32434', id: '234324335' },
  { name: 'iofugsdfs32434', id: '3450503495' },
  { name: 'eoiqfd00809', id: '98734957342' },
  { name: 'flasuoi0320423', id: '932479238' },
])
const allCommandList = reactive([
  {
    icon: 'chat-bet',
    command: '/bet',
    param: '[bet id]',
    text: t('chat_command_see_bet'),
  },
  {
    icon: 'chat-atuser',
    command: '/user',
    param: '@user',
    text: t('chat_command_see_user'),
  },
  { icon: 'chat-tip', command: '/tip', param: '@user', text: t('chat_command_tip_user') },
  { icon: 'chat-rain', command: '/rain', param: '', text: t('chat_command_tip_rain') },
  {
    icon: 'chat-ignore',
    command: '/ignore',
    param: '@user',
    text: t('chat_command_ignore_user'),
  },
  {
    icon: 'chat-unignore',
    command: '/unignore',
    param: '@user',
    text: t('chat_command_unignore_user'),
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
// const emojiName = computed(() => {
//   const i = message.value.lastIndexOf(':')
//   const j = message.value.lastIndexOf('@')
//   const k = message.value.lastIndexOf(' ')
//   if (k > i || j > i)
//     return undefined

//   if (i !== -1)
//     return message.value.slice(i + 1)
//   return undefined
// })

const emojis = computed(() => {
  return allEmojis
  // if (emojiName.value === void 0) {
  //   return showEmoji.value ? allEmojis : []
  // }
  // else {
  //   return allEmojis.filter((e) => {
  //     return e.split('.')[0].includes(emojiName.value ?? '')
  //   })
  // }
})
const trimMessage = computed(() => message.value.trim())
const isCommand = computed(() => message.value[0] === '/')

const { run: runSendMsg, loading: sendLoading } = useRequest(ApiChatSendMessage)
function addEmoMsg(emo: string, isFace?: boolean) {
  if (isFace) {
    message.value += emo
    showEmoji.value = false
    msgInput.value?.getFocus()
    return
  }
  const i = message.value.lastIndexOf(':%')
  const j = message.value.lastIndexOf(':')
  if (j === message.value.length - 1)
    message.value = message.value.slice(0, j)

  if (i === -1)
    message.value += `%:${emo.split('.')[0]}:% `

  else
    message.value += `%:${emo.split('.')[0]}:% `

  msgInput.value?.getFocus()
  showEmoji.value = false
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
  setEBool(false)
  if (trimMessage.value.length && !sendLoading.value) {
    if (!isLogin.value) {
      openNotify({ type: 'error', code: 'chat_not_login', message: t('notify_error_forbid_operation') })
      return
    }
    const tt = new Date().getTime()
    const s = `${Math.random().toString(36).slice(-10)}|${tt}`
    chatMessageBus.emit({ c: trimMessage.value, s, u: userInfo.value?.uid, n: userInfo.value?.username, t: tt })
    runSendMsg({ c: trimMessage.value, lang: roomLang.value, s, v: userInfo.value?.vip })
    message.value = ''
    msgInput.value.getFocus()
  }
}
function enterPress(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (trimMessage.value.length) {
    if (!isLogin.value) {
      openNotify({ type: 'error', code: 'chat_not_login', message: t('notify_error_forbid_operation') })
      return
    }
    if (isCommand.value) {
      const temp = trimMessage.value.split(' ')
      const firstSpaceIdx = trimMessage.value.indexOf(' ')
      const param = firstSpaceIdx !== -1 ? trimMessage.value.slice(firstSpaceIdx) : ''
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
    sendMsg()
  }
}
onClickOutside(emojiWrap, event => showEmoji.value = false)

watch(message, (val) => {
  const j = val.lastIndexOf(':')
  if (j !== -1 && j === val.length - 1)
    showEmoji.value = true
  else
    showEmoji.value = false
})
</script>

<template>
  <section class="tg-app-chat-footer">
    <Transition>
      <div
        v-show="!sendLoading && showEmoji"
        ref="emojiWrap"
        class="emoji-wrap"
      >
        <div class="emoji-header">
          <span>{{ t('emoji_title') }}</span>
          <div class="close" @click="setEBool(false)">
            <BaseIcon name="uni-close" />
          </div>
        </div>
        <div
          class="scroll-y layout-grid emojis-box wrap"
        >
          <div v-for="emo in emojis" :key="emo" class="button-wrap">
            <span class="box" @click="addEmoMsg(emo)">
              <BaseButton type="text" size="none">
                <div class="emo">
                  <BaseImage :url="`/png/emoji/${emo}`" />
                </div>
              </BaseButton>
            </span>
          </div>
          <div v-for="emo, idx in allSmileFace" :key="idx" class="button-wrap">
            <span class="box" @click="addEmoMsg(emo, true)">
              <BaseButton type="text" size="none">
                <div class="emo face-emo">
                  <span>{{ emo }}</span>
                </div>
              </BaseButton>
            </span>
          </div>
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
        :placeholder="t('chat_send_msg_placeholder')"
        textarea
        @down-enter="enterPress"
      >
        <template #right-icon>
          <BaseButton
            size="none" type="text"
            style="overflow: visible;height: 32px;"
            @click.stop="toggleEmoji()"
          >
            <span class="smile">😀</span>
          </BaseButton>
        </template>
      </BaseInput>
    </div>
    <div class="online">
      <div class="green-dot" />
      <div>
        <span>{{ t('active_state') }}： </span>
        <span>{{ manCount }}</span>
      </div>
    </div>
    <div class="actions">
      <span>{{ maxMsgLen - message.length }}</span>
      <BaseButton
        class="rule"
        :class="{ 'is-mobile': isMobile }" size="sm" @click="openChatRulesDialog"
      >
        <BaseIcon name="chat-rule" />
      </BaseButton>
      <BaseButton
        :disabled="maxMsgLen - message.length < 0"
        bg-style="secondary" class="send" size="sm" shadow @click="sendMsg"
      >
        {{ t('send') }}
      </BaseButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.emoji-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  color: var(--tg-text-white);
  font-weight: 600;
  line-height: 30px;
  font-size: var(--tg-font-size-default);
  .close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    --tg-icon-color: var(--tg-secondary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:active {
      background-color: var(--tg-secondary-deepdark);
    }
  }
}
.smile {
  font-size: var(--tg-font-size-base);
}
.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(40px,1fr));
  gap: var(--tg-spacing-16);
  // padding: var(--tg-spacing-8) var(--tg-spacing-16);
  max-height: 13rem;
  margin: 16px;
  margin-top: 0;
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
  background: var(--tg-secondary-grey);
  box-shadow: inset 0 -5px 4px -4px #0003, 0 -1px 4px #0003;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  .emojis-box {
    overflow-y: auto;
    max-height: 13rem;
  }
  .button-wrap {
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background-color: transparent;
      width: 40px;
      height: 40px;
      transition: background-color 0.2s;
      &:active { // &:hover, &.active,
        background-color: var(--tg-text-grey);
      }
    }
    .emo {
      width: var(--tg-spacing-25);
      height: var(--tg-spacing-25);
    }
    .face-emo {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--tg-font-size-xl);
    }
  }
  // .button-wrap:first-child {
  //   .box {
  //     background-color: var(--tg-secondary-deepdark);
  //   }
  // }
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
  padding: var(--tg-spacing-16) var(--tg-spacing-16) var(--tg-spacing-16);
  row-gap: var(--tg-spacing-8);
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
      "input input"
      "online actions";
  touch-action: none;
  --tg-base-input-textarea-minheight: 37px;
  .chat-input {
    grid-area: input;
    --tg-base-input-style-right-icon-pad-v: 0;
    :deep(.base-input .input-box .right-icon) {
      padding: 0;
      button {
        width: 32px;
        margin-right: 3px;
        &:hover {
          background: var(--tg-secondary-main);
        }
      }
    }
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
    --tg-icon-color: var(--tg-text-white);
    :deep(button.send) {
      // background: linear-gradient(180deg, var(--tg-sub-green-light) 0%, var(--tg-sub-green) 100%);
      color: var(--tg-text-dark);
      background: var(--tg-text-green);
      box-shadow: var(--tg-box-shadow);
      transition: all 0.15s linear;
      .content {
        transition: all 0.15s linear;
        width: 100%;
        height: 100%;
      }
      &:active {
        color: var(--tg-sub-info);
        background: var(--tg-primary-success);
        .content {
          transform: scale(0.88);
          opacity: 0.75;
        }
      }
    }
    :deep(button.rule) {
      box-shadow: var(--tg-box-shadow);
      &.is-mobile {
        &:active {
          background: var(--tg-secondary-dark);
        }
      }
    }
  }
}
</style>
