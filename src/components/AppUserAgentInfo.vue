<script lang="ts" setup>
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const { isMobile } = storeToRefs(useWindowStore())
// const { openAgentGradeDialog } = useDialogAgentGrade()
const { openAgentCommissionRecordDialog } = useDialogAgentCommissionRecord()
// const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()
const { openCommissionWalletDialog } = useDialogCommissionWallet()

// function openDialog() {
//   openAgentGradeDialog()
// }

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
    <!-- <div> -->
    <!-- <BaseIcon style="font-size: 42px;" name="agent-20" /> -->
    <BaseImage width="42px" url="/png/affiliate/medal.png" />
    <!-- </div> -->
    <div class="right-box">
      <div class="row flex-wrap">
        <div>
          <span>{{ $t('user_superior') }}ID：</span>
          <span>{{ userInfo?.parent_name ?? '-' }}</span>
        </div>
        <BaseButton bg-style="primary" custom-padding @click="drawDialog">
          {{ $t('commission_wallet') }}
        </BaseButton>
      </div>
      <div class="row">
        <!-- <div class="center">
          <span>{{ $t('can_receive') }}：</span>
          <AppAmount
            style="color: var(--tg-text-warn);" amount="999999" currency-type="USDT"
          />
        </div> -->
        <div class="center account-info">
          <span>{{ $t('user_account') }}：</span>
          <span
            :class="{ 'is-mobile': isMobile }"
          >{{ userInfo?.username }}</span>
        </div>
        <BaseButton custom-padding @click="commissionRecord">
          {{ $t('commission_record') }}
        </BaseButton>
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
  .right-box{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--tg-spacing-7);
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 1.4;
    }
    --tg-base-button-padding-y: 8px;
    --tg-base-button-padding-x: 16px;
    --tg-base-button-font-weight: 500;
    &.is-mobile {
      max-width: 80px;
    }
  }
}
</style>
