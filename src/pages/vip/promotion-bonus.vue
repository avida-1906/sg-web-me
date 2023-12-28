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
  },
  {
    title: t('vip_promotion_exp'),
    dataIndex: 'score',
    align: 'center',
    slot: 'score',
    clazz: 'flex-column-title',
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

function seeExpDialog() {
  openVipExpRuleDialog()
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
        <template #th-score>
          <span class="play-rules" @click="seeExpDialog">
            <BaseIcon name="uni-ques-blue" />
          </span>
        </template>
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
            :style="{ '--progress-width': floor(score / record.score, 1) }"
          >
            <!-- <span class="text"> -->
            <span v-if="+vip + 1 < +record.level">
              {{ record.score }}
            </span>
            <span
              v-else-if="+vip + 1 === +record.level"
            >
              {{ score }}/
              {{ record.score }}
            </span>
            <template v-else-if="+vip >= +record.level">
              <BaseButton
                v-if="bonusArray.length
                  && bonusArray.filter(b => +b.vip === +record.level
                    && +b.state === 1).length"
                bg-style="primary"
                custom-padding
                @click="() => openReceive(bonusArray.filter(b =>
                  +b.vip === +record.level && +b.state === 1)[0])"
              >
                {{ t('can_receive') }}
              </BaseButton>
              <BaseButton
                v-else-if="bonusArray.length
                  && bonusArray.filter(b => +b.vip === +record.level
                    && +b.state === 2).length"

                custom-padding disabled
              >
                {{ t('received') }}
              </BaseButton>
              <span v-else class="small-text">{{ t('upgraded') }}</span>
              <!-- <span v-else>{{ record.score }}</span> -->
            </template>
            <!-- </span> -->
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

<style>
.flex-column-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
.play-rules {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  vertical-align: middle;
  > svg {
    vertical-align: middle;
  }
}
.small-text {
  font-size: 12px;
}
.vip-badge {
  font-size: 32px;
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
  --tg-base-button-padding-y: 10px;
  --tg-base-button-padding-x: 37px;
  --tg-base-button-font-weight: 500;
  --tg-base-button-font-size: 12px;
  // > span {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
  // svg {
  //   margin-left: var(--tg-spacing-8);
  // }
}
.user-level-vip {
  background: #344452;
  max-width: 290px;
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
    background-color: #44883E;
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
  // --tg-table-font-size: 12px;
  --tg-app-amount-font-size: 12px;
  overflow: visible;
  &.is-mobile {
    .tabs {
      // padding: 0 12px;
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
