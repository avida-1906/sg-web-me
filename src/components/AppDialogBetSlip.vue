<script setup lang='ts'>
import type { ICasinoBetRecordItem, ISportsMyBetSlipItem } from '~/apis/types'

interface Props {
  type: 'casino' | 'sports'
  sportsData: ISportsMyBetSlipItem
  casinoData: ICasinoBetRecordItem
}
const props = defineProps<Props>()
const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const { openRightSidebar, rightIsExpand, currentRightSidebarContent } = useRightSidebar()
const windowStore = useWindowStore()
const { isMobile } = storeToRefs(windowStore)
const router = useRouter()

const isCasino = computed(() => props.type === 'casino')
const isSports = computed(() => props.type === 'sports')
const betTime = computed(() => isCasino.value
  ? props.casinoData.bet_time
  : props.sportsData.bt)
const isSettled = computed(() => props.sportsData.os === 1)

function clickHandler() {
  if (!rightIsExpand.value && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  else if (currentRightSidebarContent.value !== EnumRightSidebarContent.BETTING && !isMobile.value)
    openRightSidebar(EnumRightSidebarContent.BETTING)

  closeDialog()

  // if (sportStore.cart.checkWid(props.cartInfo.wid)) {
  //   sportStore.cart.remove(props.cartInfo.wid)
  // }
  // else {
  //   sportStore.cart.add(props.cartInfo)
  //   if (isMobile.value)
  //     mobileDomTransition()

  //   else
  //     pcDomTransition()
  // }
}

function openCasinoGame() {
  const { game_code, platform_id, platform_name, game_name } = props.casinoData
  router.push(`/casino/games?name=${game_name}&pn=${platform_name}&pid=${platform_id}&game_id=${game_code}`)
  closeDialog()
}
</script>

<template>
  <div
    class="dialog-bet-slip"
    :style="{ paddingBottom: isCasino ? 'var(--tg-spacing-16)' : '' }"
  >
    <template v-if="isSports">
      <div class="top">
        <div class="game-type">
          {{ t(type) }}
        </div>
        <!-- <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div> -->
        <div class="des">
          <span>{{ t('investor') }}：***test</span><br>
          <span class="time">{{ t('on') }} {{ timeToFormat(betTime) }}</span>
        </div>
      </div>
      <div class="sports-bottom">
        <AppSportsMyBetSlip :data="sportsData" is-dialog />
        <BaseButton v-if="!isSettled" size="md" @click="clickHandler">
          {{ t('add_one_bet') }}
        </BaseButton>
      </div>
    </template>

    <div v-else-if="isCasino" class="top">
      <BaseButton
        type="text" size="none"
        @click="openCasinoGame"
      >
        <div class="game-type">
          {{ casinoData.game_name }}
        </div>
      </BaseButton>
      <!-- <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div> -->
      <div class="des">
        <span>{{ t('investor') }}：{{ casinoData.username }}</span><br>
        <span class="time">{{ t('on') }} {{ timeToFormat(betTime) }}</span>
      </div>
    </div>
    <div class="casino-bottom">
      <div class="item">
        <label>{{ t('menu_title_settings_bets') }}:</label>
        <span>
          {{ casinoData.bet_amount }}
          <AppCurrencyIcon
            :currency-type="getCurrencyConfigByCode(casinoData.currency_id)?.name"
          />
        </span>
      </div>
      <!-- <div class="item">
        <label>{{ t('multiple_count') }}:</label>
        <span>1.00x</span>
      </div> -->
      <div class="item">
        <label>{{ t('sports_payment_amount') }}:</label>
        <span :class="{ win: +casinoData.net_amount > 0 }">
          {{ casinoData.net_amount }}
          <AppCurrencyIcon
            :currency-type="getCurrencyConfigByCode(casinoData.currency_id)?.name"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.dialog-bet-slip {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.5;

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--tg-spacing-16);

    .game-type,
    .order-id {
      font-size: var(--tg-font-size-base);
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }

    .order-id {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      margin-bottom: var(--tg-spacing-20);
    }

    .des {
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      text-align: center;
      font-weight: var(--tg-font-weight-semibold);

      .time {
        font-weight: var(--tg-font-weight-normal);
      }
    }
  }
}

.casino-bottom {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: var(--tg-spacing-12)var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);

    span {
      color: var(--tg-text-white);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--tg-spacing-4);

      &.win {
        color: var(--tg-text-green);
      }
    }
  }
}

.sports-bottom {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tg-spacing-16);
}
</style>
