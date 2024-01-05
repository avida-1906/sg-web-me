<script lang="ts" setup>
// 前面都补充一个空格
/**
 * 解析规则：
 * casino:连续数字
 * sport:连续数字
 * :emoji_name:
 * @user_name_规则(没有最小长度)
 * /指令空格
 */
interface Props {
  msgInfo?: ChatMessageInfo
}

withDefaults(defineProps<Props>(), {})

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
const randomLoads = ref<any[]>([])
for (let i = 1; i <= getRandomInt(3) + 1; i++)
  randomLoads.value.push({ width: `${getRandomInt(50) + 50}%` })
</script>

<template>
  <section class="tg-chat-msg-item">
    <template v-if="msgInfo">
      <div v-if="msgInfo.type" class="header">
        <div v-if="msgInfo.type === 'tip'">
          <span>{{ $t('chat_send_tip_label') }}</span>
        </div>
      </div>
      <div class="content">
        <p>
          <AppChatUserTags :user-info="msgInfo.user" />:
          <AppChatMsgRender :msg="msgInfo.msg" />
        </p>
      </div>
    </template>
    <div v-else class="loading">
      <BaseSkeleton
        v-for="i, idx in randomLoads"
        :key="idx"
        bg="#B1BAD3"
        height="16px"
        :width="i.width"
        animated="ani-opacity"
      />
    </div>
  </section>
</template>

<style>
.base-image.emoji {
  width: 24px;
  display: inline-block;
  vertical-align: middle;
  height: auto;
  user-select: none;
  -webkit-user-select: none;
}
</style>

<style lang="scss" scoped>
.tg-chat-msg-item {
  width: 100%;
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  border-radius: var(--tg-radius-default);
  background: var(--tg-secondary-grey);
  .loading {
    display: flex;
    flex-direction: column;
  }
  .loading>*+* {
    margin-top: var(--tg-spacing-8);
  }
  .content {
    p {
      -webkit-text-size-adjust: 100%;
      display: block;
      width: 100%;
      color: var(--tg-text-white);
      text-align: left;
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-normal);
      line-height: 1.5;
      word-break: break-word;
      .emoji {
        width: 24px;
        display: inline-block;
        vertical-align: middle;
        height: auto;
        user-select: none;
        -webkit-user-select: none;
      }
    }
  }
}
</style>
