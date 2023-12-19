<script lang="ts" setup>
const params = { ty: 1 }

const { t } = useI18n()
const { openNotify } = useNotify()
const { isMobile } = storeToRefs(useWindowStore())
const { vip, score, vipConfigArray } = useVipInfo()

const { run: runGetPromoBonus, data: promoBonus } = useRequest(ApiMemberVipBonusAvailable)

const { openReceiveBonusDialog } = useDialogReceiveBonus(() => {
  promoBonus.value = []
  setTimeout(() => {
    runGetPromoBonus(params)
  }, 100)
})

const bonusArray = computed(() => promoBonus.value && promoBonus.value.length
  ? promoBonus.value
  : [])
const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
  },
  {
    title: t('vip_promotion_exp'),
    dataIndex: 'score',
    align: 'center',
    slot: 'score',
  },
  {
    title: t('vip_promotion_bonus'),
    dataIndex: 'up_gift',
    align: 'right',
    slot: 'up_gift',
  },
])

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
    class="vip-promotion-bonus" :class="{ 'is-mobile': isMobile }" :style="{
      '--tg-table-td-padding': '12.5px',
    }"
  >
    <div class="tabs">
      <BaseTable :columns="columns" :data-source="vipConfigArray">
        <template #level="{ record }">
          <!-- <div>VIP{{ record.level }}</div> -->
          <div class="vip-badge">
            <BaseIcon :name="`vip${record.level}`" />
          </div>
        </template>
        <template #score="{ record }">
          <div
            class="score-wrap"
            :class="{
              'user-level-vip':
                +vip + 1 === +record.level,
              'lower-vip': +record.level <= +vip && bonusArray.length,
            }"
          >
            <span
              class="text"
              :style="{ '--progress-width': floor(score / record.score, 1) }"
            >
              <span v-if="+vip + 1 < +record.level">
                {{ record.score }}
              </span>
              <span
                v-else-if="+vip + 1 === +record.level"
              >
                {{ score }}/
                {{ record.score }}
              </span>
              <span
                v-else-if="+vip >= +record.level"
                class="dark-bar"
              >
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
              <!-- <span v-else>{{ record.score }}</span> -->
              </span>
            </span>
          </div>
        </template>
        <template #up_gift="{ record }">
          <div class="flex-end color-orange">
            <AppAmount :amount="record.up_gift" currency-type="USDT" />
          </div>
        </template>
      </BaseTable>
    </div>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.vip-badge {
  font-size: 28px;
  display: flex;
  align-items: center;
}
.lower-vip {
  max-width: 290px;
  margin: 0 auto;
  border-radius: 20px;
  background: rgba(47, 69, 84, 0.70);
  color: var(--tg-text-white);
  display: block;
  width: 100%;
  .green-text {
    color: var(--tg-text-green);
    cursor: pointer;
  }
}
.score-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    margin-left: var(--tg-spacing-8);
  }
}
.user-level-vip {
  background: rgba($color: var(--tg-color-green-rgb), $alpha: 0.3);
  color: var(--tg-text-black);
  max-width: 290px;
  margin: 0 auto;
  border-radius: 20px;
  font-weight: var(--tg-font-weight-semibold);
  position: relative;
  overflow: hidden;
  span {
    position: relative;
    display: flex;
    align-items: center;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--progress-width);
    height: 100%;
    background-color: var(--tg-text-green);
    border-radius: 20px;
  }
}
.color-orange {
  color: var(--tg-text-warn);
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.vip-promotion-bonus {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-table-th-background: var(--tg-secondary-grey);
  --tg-table-even-background: var(--tg-secondary-grey);
  --tg-table-odd-background: var(--tg-primary-main);
  --tg-table-thtd-radius: 0;
  overflow: visible;
  &.is-mobile {
    .tabs {
    }
  }
  .tabs {
    background: #0F212E;
    padding: 16px 12px;
    border-radius: 0px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
