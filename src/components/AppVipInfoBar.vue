<script lang="ts" setup>
// const { t } = useI18n()
// const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { nextLevel, scoreToNext } = useVipInfo()

// const { openVipBonusRecordDialog } = useDialogVipBonusRecord()
// const { openReceiveBonusDialog } = useDialogReceiveBonus()

// const {
//   run: runGetVipBonusAmount,
//   data: vipBonusAmount,
//   loading: getBonusLoading,
// } = useRequest(ApiMemberVipBonusAmount, {
//   ready: isLogin,
//   manual: false,
// })

// function openRecord() {
//   openVipBonusRecordDialog()
// }

// async function openReceive() {
//   await runGetVipBonusAmount()
//   if (vipBonusAmount.value && +vipBonusAmount.value > 0)
//     openReceiveBonusDialog({ vipBonus: vipBonusAmount.value })
//   else
//     openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
// }
</script>

<template>
  <div class="app-vip-info-bar">
    <BaseIcon class="vip-badge" :name="`vip${userInfo?.vip ?? '0'}`" />
    <div class="info">
      <span v-if="nextLevel" class="water">
        <span>
          {{ $t('next_vip_amount',
                { vip: `VIP${nextLevel.level}`, amount: toFixed(scoreToNext, 2) }) }}
        </span>
        <!-- <BaseIcon name="coin-usdt" /> -->
        <span>{{ $t('integral') }}</span>
      </span>
      <span v-else class="water">
        {{ $t('vip_top') }}
      </span>
    </div>
    <!-- <div class="btns"> -->
    <!-- <BaseButton
          bg-style="primary"
          size="none"
          round
          :loading="getBonusLoading"
          @click="openReceive"
        >
          {{ $t('one_receive') }}
        </BaseButton> -->
    <!-- <BaseButton bg-style="primary" round size="none" @click="openRecord">
        {{ $t('receive_record_label') }}
      </BaseButton>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.app-vip-info-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  color: var(--tg-text-white);
  .vip-badge {
    font-size: 59px;
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: var(--tg-spacing-20);
    overflow: hidden;
    white-space: normal;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    button {
      height: 24px;
      min-width: 68px;
      box-sizing: border-box;
      font-size: var(--tg-font-size-xs);
      padding: 0 var(--tg-spacing-6);
    }
    .water {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-4);
      flex-wrap: wrap;
    }
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--tg-spacing-4);
    button {
      height: 24px;
      min-width: 68px;
      box-sizing: border-box;
      font-size: var(--tg-font-size-xs);
      padding: 0 var(--tg-spacing-6);
    }
  }
}
</style>
