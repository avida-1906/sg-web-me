<script lang="ts" setup>
</script>

<template>
  <div class="error-page">
    <span class="error-code">Error 404</span>
    <span class="error-msg">
      failed to load: {"message":"Fixture does not exist"}
    </span>
    <BaseButton bg-style="primary" size="sm">
      Refresh
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  border: 3px solid var(--tg-secondary-grey);
  background: var(--tg-secondary-dark);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-24);
  padding: var(--tg-spacing-32) var(--tg-spacing-48);
  width: 100%;
  align-items: center;
  border-radius: var(--tg-radius-md);
  line-height: 1.5;
  span {
    display: inline-flex;
    align-items: center;
    text-align: left;
    justify-content: flex-start;
  }
  .error-code {
    color: var(--tg-text-error);
    font-size: var(--tg-font-size-3xl);
    font-weight: var(--tg-font-weight-semibold);
  }
  .error-msg {
    color: var(--tg-text-error);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
  }
}
</style>
