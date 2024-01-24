<script lang="ts" setup>
// const params = { ty: 2 }

const { t } = useI18n()
const route = useRoute()
// const { openNotify } = useNotify()
const { vip, vipConfigArray } = useVipInfo()
const { isMobile } = storeToRefs(useWindowStore())
const { openVipBonusDialog } = useDialogVipBonus()
const { isLogin } = storeToRefs(useAppStore())
// const { run: runGetPromoBonus, data: promoBonus } = useRequest(ApiMemberVipBonusAvailable)

// const { openReceiveBonusDialog } = useDialogReceiveBonus(() => {
//   promoBonus.value = []
//   setTimeout(() => {
//     runGetPromoBonus(params)
//   }, 100)
// })

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
  },
  // {
  //   title: t('status'),
  //   dataIndex: 'status',
  //   align: 'center',
  //   slot: 'status',
  // },
  {
    title: t('vip_day_salary_bonus'),
    dataIndex: 'daily_gift',
    align: 'right',
    slot: 'daily_gift',
  },
  {
    title: t('vip_week_salary_bonus'),
    dataIndex: 'weekly_gift',
    align: 'right',
    slot: 'weekly_gift',
  },
  {
    title: t('vip_month_salary_bonus'),
    dataIndex: 'monthly_gift',
    align: 'right',
    slot: 'monthly_gift',
  },
])

// const bonusArray = computed(() => promoBonus.value && promoBonus.value.length
//   ? promoBonus.value
//   : [])

// async function openReceive(item: any) {
//   if (+item.amount > 0 && +item.state === 1)
//     openReceiveBonusDialog({ vipBonus: item.amount, vipBonusId: item.id })
//   else
//     openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
// }

// onMounted(() => {
//   runGetPromoBonus(params)
// })
</script>

<template>
  <div
    class="vip-day-salary"
    :class="{ 'is-mobile': isMobile }"
  >
    <div class="tabs">
      <BaseTable :columns="columns" :data-source="vipConfigArray">
        <template #level="{ record }">
          <!-- <div>VIP{{ record.level }}</div> -->
          <div class="vip-badge">
            <BaseIcon :name="`vip${record.level}`" />
          </div>
        </template>
        <template #daily_gift="{ record }">
          <div class="gift small-text">
            <AppAmount :amount="record.daily_gift" currency-type="USDT" />
          </div>
        </template>
        <template #weekly_gift="{ record }">
          <div class="gift">
            <AppAmount :amount="record.weekly_gift" currency-type="USDT" />
          </div>
        </template>
        <template #monthly_gift="{ record }">
          <div class="gift">
            <AppAmount :amount="record.monthly_gift" currency-type="USDT" />
          </div>
        </template>
        <!-- <template #status="{ record }">
          <span
            v-if="+record.level > +vip"
            class="small-text"
          >{{ t('wait_upgrade') }}</span>
          <template v-else>
            <span
              v-if="bonusArray.length
                && bonusArray.filter(b => +b.vip === +record.level
                  && +b.state === 1).length"
              class="small-text green-text"
              @click="() => openReceive(bonusArray.filter(b =>
                +b.vip === +record.level && +b.state === 1)[0])"
            >
              {{ t('can_receive') }}
            </span>
            <span
              v-else-if="bonusArray.length
                && bonusArray.filter(b => +b.vip === +record.level
                  && +b.state === 2).length"
              class="small-text"
            >
              {{ t('received') }}</span>
            <span v-else class="small-text">{{ t('upgraded') }}</span>
          </template>
        </template> -->
      </BaseTable>
      <div v-if="route.path.includes('/vip/')" class="btn-box">
        <BaseButton class="btn-receive" bg-style="secondary" custom-padding :disabled="!isLogin" @click="openVipBonusDialog">
          {{ t('receive_bonus') }}
        </BaseButton>
      </div>
    </div>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.small-text {
  font-size: 12px;
}
.vip-badge {
  font-size: 32px;
  display: flex;
  align-items: center;
}
.gift {
  display: inline-block;
}
.vip-day-salary {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: var(--tg-spacing-14);
  &.is-mobile {
    .tabs {
      background: none;
      padding: 0 0;
      position: relative;
    }
  }
  .tabs {
    background: var(--tg-secondary-dark);
    padding: 12px 12px;
    border-radius: var(--tg-radius-default);
    .btn-box{
      margin-top: 20px;
    }
    .btn-receive{
      max-width: 400px;
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
