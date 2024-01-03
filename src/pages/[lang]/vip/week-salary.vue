<script lang="ts" setup>
const params = { ty: 3 }

const { t } = useI18n()
const { openNotify } = useNotify()
const { vip, vipConfigArray } = useVipInfo()
const { isMobile } = storeToRefs(useWindowStore())

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
  <div
    class="vip-week-salary"
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
        <template #weekly_gift="{ record }">
          <div class="gift color-orange">
            <AppAmount :amount="record.weekly_gift" currency-type="USDT" />
          </div>
        </template>
        <template #status="{ record }">
          <span
            v-if="+record.level > +vip"
            class="small-text"
          >{{ t('wait_upgrade') }}</span>
          <template v-else>
            <span
              v-if="bonusArray.length
                && bonusArray.filter(b => +b.vip === +record.level
                  && +b.state === 1).length"
              class="green-text small-text"
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
        </template>
      </BaseTable>
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
  --tg-app-amount-font-size: 12px;
  :deep(th) {
    font-size: 14px;
  }
  &.is-mobile {
    .tabs {
      // padding: 0 12px;
      position: relative;
    }
  }
  .tabs {
    background: #0F212E;
    padding: 12px;
    border-radius: 4px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
