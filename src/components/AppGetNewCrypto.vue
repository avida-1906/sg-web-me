<script setup lang='ts'>
// 123
</script>

<template>
  <div class="get-new-crypto">
    <span class="title">您确定要更换您的 BTC 存款地址吗？</span>
    <div class="content">
      <span>请注意：</span>
      <ul>
        <li>您一旦更换存款地址，旧地址便将被禁用。只有新地址才可用于存款。请切勿再使用旧地址进行任何存款。</li>
        <li>请在您更换存款地址前先确保您已无任何待处理的存款交易。</li>
        <li>此操作无法撤消。</li>
      </ul>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.get-new-crypto {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  line-height: 1.5;

  .content {
    color: var(--tg-text-lightgrey);

    ul {
      list-style-type: disc;
      margin-left: var(--tg-spacing-32);
    }
  }
}
</style>
