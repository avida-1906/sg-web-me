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
  msgInfo: ChatMessageInfo
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="tg-chat-msg-item">
    <div v-if="msgInfo.type" class="header">
      <div v-if="msgInfo.type === 'tip'">
        <span>发送小费</span>
      </div>
    </div>
    <div class="content">
      <p>
        <AppChatUserTags :user-info="msgInfo.sender" />
        <span>:<span v-html="msgInfo.html" /></span>
        <AppChatMsgOrder type="casino" order="982964823672423" />
        <AppChatMsgAt :user="{ name: 'abce24234', id: '123kjh24sdfs' }" />
        <BaseImage alt=":monkas:" url="/img/emoji/monkas.webp" class="emoji" />
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-chat-msg-item {
  width: 100%;
  padding: var(--tg-spacing-8) var(--tg-spacing-16);
  border-radius: var(--tg-radius-default);
  background: var(--tg-secondary-grey);
  .content {
    p {
      display: block;
      width: 100%;
      color: var(--tg-text-white);
      text-align: left;
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-normal);
      line-height: 1.5;
      .emoji {
        width: 24px;
        display: inline-block;
        vertical-align: middle;
        height: auto;
        user-select: none;
      }
    }
  }
}
</style>
