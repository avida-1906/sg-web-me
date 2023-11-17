<script setup lang='ts'>
// 123
</script>

<template>
  <div class="get-new-crypto">
    <span class="title">{{ $t('change_byte_addr', { delta: 'USDT' }) }}</span>
    <div class="content">
      <span>{{ $t('attention') }}：</span>
      <ul>
        <li>{{ $t('change_byte_addr_1') }}</li>
        <li>{{ $t('change_byte_addr_2') }}</li>
        <li>{{ $t('action_no_cancel') }}。</li>
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
