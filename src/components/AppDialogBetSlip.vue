<script setup lang='ts'>
import type { ISportsMyBetSlipItem } from '~/apis/types'

interface Props {
  type: 'casino' | 'sports'
  sportsData: ISportsMyBetSlipItem
  casinoData: {
    [t: string]: any
  }
}
const props = defineProps<Props>()
const closeDialog = inject('closeDialog', () => {})

const { t } = useI18n()
const { openRightSidebar, rightIsExpand, currentRightSidebarContent } = useRightSidebar()
const windowStore = useWindowStore()
const { isMobile } = storeToRefs(windowStore)

const isCasino = computed(() => props.type === 'casino')
const isSports = computed(() => props.type === 'sports')
const betTime = computed(() => isCasino.value ? props.casinoData.bt : props.sportsData.bt)
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
</script>

<template>
  <div
    class="dialog-bet-slip"
    :style="{ paddingBottom: isCasino ? 'var(--tg-spacing-16)' : '' }"
  >
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
    <div v-if="isCasino" class="casino-bottom">
      <div class="item">
        <label>{{ t('menu_title_settings_bets') }}:</label>
        <span>
          4.00000000
          <AppCurrencyIcon currency-type="BRL" />
        </span>
      </div>
      <div class="item">
        <label>{{ t('multiple_count') }}:</label>
        <span>1.00x</span>
      </div>
      <div class="item">
        <label>{{ t('menu_title_settings_bets') }}:</label>
        <span>
          4.00000000
          <AppCurrencyIcon currency-type="BRL" />
        </span>
      </div>
    </div>
    <div v-else-if="isSports" class="sports-bottom">
      <AppSportsMyBetSlip :data="sportsData" is-dialog />
      <BaseButton v-if="!isSettled" size="md" @click="clickHandler">
        {{ t('add_one_bet') }}
      </BaseButton>
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
