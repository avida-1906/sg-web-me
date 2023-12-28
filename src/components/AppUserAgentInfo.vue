<script lang="ts" setup>
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const { isMobile } = storeToRefs(useWindowStore())
const { openAgentGradeDialog } = useDialogAgentGrade()
const { openAgentCommissionRecordDialog } = useDialogAgentCommissionRecord()
// const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
const { openCommissionWalletDialog } = useDialogCommissionWallet()

function openDialog() {
  openAgentGradeDialog()
}

function commissionRecord() {
  openAgentCommissionRecordDialog()
}

function drawDialog() {
  // openAgentCommissionDrawDialog()
  openCommissionWalletDialog()
}
</script>

<template>
  <div class="app-user-agent-info">
    <div class="cursor-pointer" @click="openDialog">
      <BaseIcon class="agent-badge" name="agent-badge" />
    </div>
    <div class="right-box">
      <div class="row flex-wrap">
        <div class="center account-info">
          <span>{{ $t('user_account') }}：</span>
          <span
            :class="{ 'is-mobile': isMobile }"
          >{{ userInfo?.username }}</span>
        </div>
        <div>
          <span>{{ $t('user_superior') }}ID：</span>
          <span>{{ $t('direct_vip') }}</span>
        </div>
      </div>
      <div class="row">
        <div class="center">
          <span>{{ $t('can_receive') }}：</span>
          <AppAmount
            style="color: var(--tg-text-warn);" amount="999999" currency-type="USDT"
          />
        </div>
        <div class="center btns">
          <BaseButton bg-style="primary" size="none" @click="drawDialog">
            {{ $t('wallet') }}
          </BaseButton>
          <BaseButton type="line" size="none" @click="commissionRecord">
            {{ $t('record') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-info {
  margin-right: 6px;
}
.flex-wrap {
  flex-wrap: wrap;
}
.app-user-agent-info {
  display: flex;
  align-items: center;
  gap: var(--tg-spacing-8);
  .agent-badge {
    font-size: 42px;
  }
  .right-box{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--tg-spacing-12);
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.4;
    }
    .btns {
      gap: var(--tg-spacing-8);
      --tg-base-button-line-border-color: var(--tg-text-blue);
      button {
        height: 23px;
        min-width: 48px;
        padding-left: 4px;
        padding-right: 4px;
        box-sizing: border-box;
        font-size: var(--tg-font-size-xs);
      }
    }
    &.is-mobile {
      max-width: 80px;
    }
  }
}
</style>
