<script lang="ts" setup>
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const { isMobile } = storeToRefs(useWindowStore())
const { openAgentGradeDialog } = useDialogAgentGrade()
const { openAgentCommissionRecordDialog } = useDialogAgentCommissionRecord()
const { openAgentCommissionDrawDialog } = useDialogAgentCommissionDraw()

function openDialog() {
  openAgentGradeDialog()
}

function commissionRecord() {
  openAgentCommissionRecordDialog()
}

function drawDialog() {
  openAgentCommissionDrawDialog()
}
</script>

<template>
  <div class="app-user-agent-info">
    <div class="left">
      <div class="cursor-pointer" @click="openDialog">
        <BaseIcon class="agent-badge" name="agent-badge" />
      </div>
      <div class="info">
        <div>
          <span>{{ $t('user_account') }}：</span>
          <span
            class="user-name"
            :class="{ 'is-mobile': isMobile }"
          >{{ userInfo?.username }}</span>
        </div>
        <div class="up">
          {{ $t('can_receive') }}：
          <span class="money"><AppAmount amount="999999" currency-type="USDT" /></span>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- <span class="money">999,999.00</span> -->
      <div>
        <span>{{ $t('user_superior') }}ID：</span>
        <span>{{ $t('direct_vip') }}</span>
      </div>
      <div class="btns">
        <BaseButton bg-style="primary" size="none" round @click="drawDialog">
          {{ $t('wallet') }}
        </BaseButton>
        <BaseButton type="line" round size="none" @click="commissionRecord">
          {{ $t('record') }}
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
    align-items: center;
    justify-content: flex-start;
    gap: var(--tg-spacing-10);
    max-width: 75%;
    overflow: hidden;
    .agent-badge {
      font-size: 42px;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      line-height: var(--tg-spacing-20);
      overflow: hidden;
      white-space: nowrap;
      > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .user-name {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.is-mobile {
          max-width: 80px;
        }
      }
      span:last-child {
        color: var(--tg-text-white);
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    color: var(--tg-text-white);
    gap: 12px;
    button {
      height: 23px;
      min-width: 48px;
      box-sizing: border-box;
      font-size: var(--tg-font-size-xs);
      // padding: 0 var(--tg-spacing-6);
    }
    .up {
      display: flex;
      align-items: center;
    }
    .money {
      color: var(--tg-text-warn);
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--tg-spacing-8);
      --tg-base-button-line-border-color: var(--tg-text-blue);
    }
  }
}
</style>
