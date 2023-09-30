<script lang="ts" setup>
</script>

<template>
  <section class="modal-content-normal">
    <ol class="rules-content">
      <li>
        <span>请勿在聊天时发送垃圾消息并避免使用过多的大写字母。</span>
      </li>
      <li>
        <span>请勿骚扰或冒犯其他用户及 Stake 工作人员。</span>
      </li>
      <li>
        <span>请勿分享您或其他玩家的任何个人信息（包括社交媒体账号）。</span>
      </li>
      <li>
        <span>请勿向其他用户讨钱或要求贷款、下红包雨、或小费。</span>
      </li>
      <li>
        <span>严禁使用除了主账户外您任何其他账户聊天。</span>
      </li>
      <li>
        <span>不允许可被视为诈骗的可疑行为。</span>
      </li>
      <li>
        <span>请勿从事任何形式的广告/交易/销售/购买/提供服务。</span>
      </li>
      <li>
        <span>请勿讨论直播主、 Twitch 或任何其他类似平台。</span>
      </li>
      <li>
        <span>请勿使用网址缩短服务。一定要提交完整的链接。</span>
      </li>
      <li>
        <span>请勿分享编码、脚本或任何机器人程序的服务。</span>
      </li>
      <li>
        <span>请只使用聊天室指定的语言聊天，潜在的滥用行为将受到制裁。</span>
      </li>
      <li>
        <span>严禁谈论政治与宗教话题。</span>
      </li>
    </ol>
    <div class="center">
      完整的规则可以在我们的<a><span>论坛</span><BaseIcon name="uni-jump-page" /></a>上找到。
    </div>
  </section>
</template>

<style lang="scss" scoped>
.modal-content-normal {
  padding-right: var(--tg-spacing-16);
  padding-left: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--tg-spacing-16);
  gap: var(--tg-spacing-16);
  touch-action: auto;
  line-height: 1.5;
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-normal);
  ol {
    list-style-type: decimal;
    list-style-position: inside;
    > *+* {
      margin-top: var(--tg-spacing-8);
    }
  }
  a {
    color: var(--tg-text-white);
    display: inline-flex;
    align-items: center;
    .app-svg-icon {
      font-size: var(--tg-font-size-xs);
    }
    .app-svg-icon {
      margin: 0 var(--tg-spacing-8);
    }
  }
}
</style>
