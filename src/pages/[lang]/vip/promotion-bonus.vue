<script lang="ts" setup>
const params = { ty: 1 }

const { t } = useI18n()
const { openNotify } = useNotify()
const { isMobile } = storeToRefs(useWindowStore())
const { vip, score, vipConfigArray } = useVipInfo()
const { isLogin } = storeToRefs(useAppStore())

const { run: runGetPromoBonus, data: promoBonus, loading: loadPromoBonus }
  = useRequest(ApiMemberVipBonusAvailable, { ready: isLogin })

const { openVipBonusDialog } = useDialogVipBonus(() => {
  promoBonus.value = []
  setTimeout(() => {
    runGetPromoBonus(params)
  }, 100)
})
const { openVipExpRuleDialog } = useDialogVipExpRule()

const bonusArray = computed(() => promoBonus.value && promoBonus.value.length
  ? promoBonus.value
  : [])
const columns = computed<Column[]>(() => [
  {
    title: t('grade'),
    dataIndex: 'level',
    align: 'left',
    slot: 'level',
    skeWidth: '32px',
  },
  {
    title: t('integral'),
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
  {
    title: t('keep_integral'),
    dataIndex: 'retain_score',
    align: 'center',
    slot: 'retain_score',
  },
])

async function openReceive(item: any) {
  if (+item.amount > 0 && +item.state === 1)
    openVipBonusDialog({ vipBonus: '1', vipBonusId: '1' })
    // openReceiveBonusDialog({ vipBonus: item.amount, vipBonusId: item.id })
  else
    openNotify({ type: 'error', message: t('no_bonus_now'), title: t('fail_bonus') })
}

function seeExpDialog() {
  openVipExpRuleDialog()
}

onMounted(() => {
  runGetPromoBonus(params)
})
</script>

<template>
  <div
    class="vip-promotion-bonus" :class="{ 'is-mobile': isMobile }"
  >
    <div class="tabs">
      <BaseTable
        :columns="columns"
        :data-source="vipConfigArray" :loading="loadPromoBonus"
        :skeleton-width="50"
      >
        <template #th-score>
          <BaseButton
            type="text"
            size="none"
            @click="seeExpDialog"
          >
            <BaseIcon name="uni-ques-blue" />
          </BaseButton>
        </template>
        <template #level="{ record }">
          <!-- <div>VIP{{ record.level }}</div> -->
          <div class="vip-badge">
            <BaseIcon :name="`vip${record.level}`" />
          </div>
        </template>
        <template #retain_score="{ record: { retain_score, level } }">
          <span v-if="!Number(retain_score ?? 0)">-</span>
          <div
            v-else-if="+vip === +level" class="score-wrap user-level-vip"
            :style="{
              '--progress-width':
                `${(score / Number(retain_score)) > 1 ? 100
                  : (score / Number(retain_score)) * 100}%`,
            }"
          >
            <span>{{ score }}/{{ retain_score }}</span>
          </div>
          <span v-else>{{ retain_score }}</span>
        </template>
        <template #score="{ record }">
          <div
            class="score-wrap"
            :class="{
              'user-level-vip': +vip === +record.level,
              'lower-vip': +record.level <= +vip && bonusArray.length,
            }"
            :style="{
              '--progress-width':
                `${(score / Number(record.score)) > 1 ? 100
                  : (score / Number(record.score)) * 100}%`,
            }"
          >
            <span v-if="+vip < +record.level">
              {{ record.score }}
            </span>
            <span v-else-if="+vip === +record.level">
              {{ score }}/{{ record.score }}
            </span>
            <template v-else-if="+vip >= +record.level">
              <BaseButton
                v-if="bonusArray.length
                  && bonusArray.find(b => +b.vip === +record.level && +b.state === 1)"
                class="btn-limit"
                style="color: var(--tg-text-green)"
                custom-padding round
                @click="() => openReceive(bonusArray
                  .filter(b => +b.vip === +record.level && +b.state === 1)[0])"
              >
                {{ t('can_receive') }}
              </BaseButton>
              <BaseButton
                v-else-if="bonusArray.length
                  && bonusArray.find(b => +b.vip === +record.level && +b.state === 2)"
                class="btn-limit"
                round custom-padding disabled
              >
                {{ t('received') }}
              </BaseButton>
              <span v-else class="small-text">{{ t('upgraded') }}</span>
            </template>
          </div>
        </template>
        <template #up_gift="{ record }">
          <div class="flex-end">
            <AppAmount :amount="record.up_gift" currency-type="USDT" />
          </div>
        </template>
      </BaseTable>
    </div>
    <AppVipRuleDesc />
  </div>
</template>

<style lang="scss" scoped>
.small-text {
  font-size: var(--tg-font-size-xs);
}
.vip-badge {
  font-size: var(--tg-font-size-3xl);
  display: flex;
  align-items: center;
}
.lower-vip {
  max-width: 290px;
  margin: 0 auto;
  border-radius: 20px;
  // background: rgba(47, 69, 84, 0.70);
  color: var(--tg-text-white);
  display: block;
  width: 100%;
}
.score-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  --tg-base-button-padding-y: 4.5px;
  // --tg-base-button-padding-x: 45px;
  --tg-base-button-font-weight: 500;
  --tg-base-button-font-size: var(--tg-font-size-xs);
}
.btn-limit{
  display: block;
  max-width: 290px;
  width: 100%;
  margin: 0 auto;
}
.user-level-vip {
  max-width: 290px;
  background: #{rgba($color: var(--tg-color-green-rgb), $alpha: 0.3)};
  margin: 0 auto;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  color: var(--tg-text-white);
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
    background: var(--tg-text-green);
    border-radius: 20px;
  }
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.vip-promotion-bonus {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  --tg-app-amount-font-size: var(--tg-font-size-xs);
  overflow: visible;
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
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
