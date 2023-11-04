<script lang="ts" setup>
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
</script>

<template>
  <div class="app-user-agent-info">
    <div class="left">
      <BaseIcon class="agent-badge" name="agent-badge" />
      <div class="info">
        <div>{{ $t('user_account') }}：<span>{{ userInfo?.username }}</span></div>
        <div>{{ $t('user_superior') }}ID：<span>直属会员</span></div>
      </div>
    </div>
    <div class="right">
      <div>{{ $t('can_receive') }}：<span class="money">999,999.00</span></div>
      <div class="btns">
        <BaseButton bg-style="primary" round>
          {{ $t('receive_commission') }}
        </BaseButton>
        <BaseButton type="line" round>
          {{ $t('commission_history') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-user-agent-info {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-secondary-light);
  .left {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    gap: var(--tg-spacing-8);
    .agent-badge {
      font-size: var(--tg-font-size-5xl);
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: var(--tg-spacing-20);
      span {
        color: var(--tg-text-white);
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    color: var(--tg-text-white);
    button {
      height: 24px;
      width: 68px;
      padding: 0 !important;
      box-sizing: border-box;
      font-size: var(--tg-font-size-xs);
    }
    .money {
      color: var(--tg-text-warn);
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--tg-spacing-4);
    }
  }
}
</style>
