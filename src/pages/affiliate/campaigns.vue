<script lang="ts" setup>
</script>

<template>
  <div class="tg-affiliate-campaigns">
    <div class="stats-grid">
      <div class="stat">
        <span>活动点击量</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>推荐用户</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>总存款次数</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>独立存款</span>
        <span>0</span>
      </div>
      <div class="stat">
        <span>可用金额</span>
        <span>0.00000000</span>
      </div>
    </div>
    <BaseButton>
      创建新活动
    </BaseButton>
  </div>
</template>

<style lang="scss">
.tg-affiliate-campaigns {
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
    grid-gap: var(--spacing-2);
    .stat {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
