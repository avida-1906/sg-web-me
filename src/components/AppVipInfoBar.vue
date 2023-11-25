<script lang="ts" setup>
const { t } = useI18n()
const { openNotify } = useNotify()
const { userInfo, isLogin, vipConfigData } = storeToRefs(useAppStore())

const { openVipBonusRecordDialog } = useDialogVipBonusRecord()
const { openReceiveBonusDialog } = useDialogReceiveBonus()

const {
  run: runGetVipBonusAmount,
  data: vipBonusAmount,
  loading: getBonusLoading,
} = useRequest(ApiMemberVipBonusAmount, {
  ready: isLogin,
  manual: false,
})

const nextVip = computed(() => {
  if (userInfo.value && +userInfo.value.vip >= 0)
    return +userInfo.value.vip + 1
  else
    return '-'
})
const nextScore = computed(() => {
  if (userInfo.value && +userInfo.value.vip >= 0 && vipConfigData.value) {
    const temp = vipConfigData.value[`v${nextVip.value}`]
    const curScore = +userInfo.value.score >= 0 ? +userInfo.value.score : 0
    if (temp)
      return +temp.score - curScore
  }
  return '-'
})

function openRecord() {
  openVipBonusRecordDialog()
}

async function openReceive() {
  await runGetVipBonusAmount()
  if (vipBonusAmount.value && +vipBonusAmount.value > 0)
    openReceiveBonusDialog({ vipBonus: vipBonusAmount.value })
  else
    openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
}
</script>

<template>
  <div class="app-vip-info-bar">
    <BaseIcon class="vip-badge" :name="`vip${userInfo?.vip ?? '0'}`" />
    <div class="info">
      <span class="water">
        <span>
          {{ $t('next_vip_amount', { vip: `VIP${nextVip}`, amount: nextScore }) }}
        </span>
        <BaseIcon name="coin-usdt" />
        <span>{{ $t('water') }}</span>
      </span>
      <div class="btns">
        <BaseButton
          bg-style="primary"
          size="none"
          round
          :loading="getBonusLoading"
          @click="openReceive"
        >
          {{ $t('one_receive') }}
        </BaseButton>
        <BaseButton type="line" round size="none" @click="openRecord">
          {{ $t('receive_record_label') }}
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
    .water {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-4);
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
