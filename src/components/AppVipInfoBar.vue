<script lang="ts" setup>
const { openVipBonusRecordDialog } = useDialogVipBonusRecord()
const { openReceiveBonusDialog } = useDialogReceiveBonus()

function openRecord() {
  openVipBonusRecordDialog()
}

function openReceive() {
  openReceiveBonusDialog({ vipBonus: '1002' })
}
</script>

<template>
  <div class="app-vip-info-bar">
    <BaseIcon class="vip-badge" name="vip10" />
    <div class="info">
      <span>{{ $t('next_vip_amount', { vip: 'VIP2', amount: '100万' }) }}</span>
      <div class="btns">
        <BaseButton bg-style="primary" size="none" round @click="openReceive">
          {{ $t('receive_commission') }}
        </BaseButton>
        <BaseButton type="line" round size="none" @click="openRecord">
          {{ $t('commission_history') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-vip-info-bar {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  color: var(--tg-text-white);
  .vip-badge {
    font-size: var(--tg-font-size-5xl);
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: var(--tg-spacing-20);
    overflow: hidden;
    white-space: nowrap;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    button {
      height: 24px;
      min-width: 68px;
      box-sizing: border-box;
      font-size: var(--tg-font-size-xs);
      padding: 0 var(--tg-spacing-6);
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
