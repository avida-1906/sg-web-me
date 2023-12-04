<script lang="ts" setup>
const params = { ty: 3 }

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
    title: t('vip_week_salary_bonus'),
    dataIndex: 'weekly_gift',
    align: 'right',
    slot: 'weekly_gift',
  },
])

const bonusArray = computed(() => promoBonus.value && promoBonus.value.length
  ? promoBonus.value.filter(p => +p.state === 1)
  : [])

async function openReceive() {
  if (bonusArray.value.length > 0)
    openReceiveBonusDialog({ vipBonus: bonusArray.value[0].amount, vipBonusId: bonusArray.value[0].id })
  else
    openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
}

onMounted(() => {
  runGetPromoBonus(params)
})
</script>

<template>
  <div class="vip-week-salary">
    <BaseTable :columns="columns" :data-source="vipConfigArray">
      <template #level="{ record }">
        <div>VIP{{ record.level }}</div>
      </template>
      <template #weekly_gift="{ record }">
        <div class="gift color-orange">
          <AppAmount :amount="record.weekly_gift" currency-type="USDT" />
        </div>
      </template>
      <template #status="{ record }">
        <span v-if="+record.level > +vip">{{ t('wait_upgrade') }}</span>
        <span v-else-if="+record.level < +vip">{{ t('upgraded') }}</span>
        <span v-else>
          <span
            v-if="bonusArray.length"
            class="green-text"
            @click="openReceive"
          >
            {{ t('can_receive') }}
          </span>
          <span v-else>
            {{ t('received') }}
          </span>
        </span>
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
.vip-week-salary {
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
