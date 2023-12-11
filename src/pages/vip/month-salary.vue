<script lang="ts" setup>
const params = { ty: 4 }

const { t } = useI18n()
const { openNotify } = useNotify()
const { vip, vipConfigArray } = useVipInfo()

const { run: runGetPromoBonus, data: promoBonus } = useRequest(ApiMemberVipBonusAvailable)

const { openReceiveBonusDialog } = useDialogReceiveBonus(() => {
  promoBonus.value = []
  setTimeout(() => {
    runGetPromoBonus(params)
  }, 100)
})

const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
  },
  {
    title: t('status'),
    dataIndex: 'status',
    align: 'center',
    slot: 'status',
  },
  {
    title: t('vip_month_salary_bonus'),
    dataIndex: 'monthly_gift',
    align: 'right',
    slot: 'monthly_gift',
  },
])

const bonusArray = computed(() => promoBonus.value && promoBonus.value.length
  ? promoBonus.value
  : [])

async function openReceive(item: any) {
  if (+item.amount > 0 && +item.state === 1)
    openReceiveBonusDialog({ vipBonus: item.amount, vipBonusId: item.id })
  else
    openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
}

onMounted(() => {
  runGetPromoBonus(params)
})
</script>

<template>
  <div class="vip-month-salary">
    <BaseTable :columns="columns" :data-source="vipConfigArray">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
      <template #monthly_gift="{ record }">
        <div class="gift color-orange">
          <AppAmount :amount="record.monthly_gift" currency-type="USDT" />
        </div>
      </template>
      <template #status="{ record }">
        <span v-if="+record.level > +vip">{{ t('wait_upgrade') }}</span>
        <template v-else>
          <span
            v-if="bonusArray.length
              && bonusArray.filter(b => +b.vip === +record.level
                && +b.state === 1).length"
            class="green-text"
            @click="() => openReceive(bonusArray.filter(b =>
              +b.vip === +record.level && +b.state === 1)[0])"
          >
            {{ t('can_receive') }}
          </span>
          <span
            v-else-if="bonusArray.length
              && bonusArray.filter(b => +b.vip === +record.level
                && +b.state === 2).length"
          >
            {{ t('received') }}</span>
          <span v-else>{{ t('upgraded') }}</span>
        </template>
      </template>
    </BaseTable>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.green-text {
  color: var(--tg-text-green);
  cursor: pointer;
}
.gift {
  display: inline-block;
}
.color-orange {
  color: var(--tg-text-warn);
}
.flex-center {
  display: flex;
  justify-content: center;
}
.vip-month-salary {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-table-even-background: var(--tg-primary-main);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
