<script setup lang='ts'>
interface Props {
  type: 'casino' | 'sports'
  data: {
    [t: string]: any
  }
}
const props = defineProps<Props>()
const { t } = useI18n()

const isCasino = computed(() => props.type === 'casino')
const isSports = computed(() => props.type === 'sports')
const isBetSingle = computed(() => props.data.betType === 'single')
const isBetMulti = computed(() => props.data.betType === 'multi')
const slipList = computed(() => isBetSingle.value ? ['1.89'] : ['1.89', '1.89', '1.89'])
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
      <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" size="none">
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div>
      <div class="des">
        <span>{{ t('investor') }}：Tese0000001</span><br>
        <span class="time">于2023/07/07 17:42</span>
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
      <div
        v-for="slip, i in slipList" :key="i" class="sports-bet-slip"
        :class="{ before: i > 0 && isBetMulti }"
      >
        <div v-show="i === 0 || isBetSingle" class="header">
          <div class="status">
            {{ t('win') }}
          </div>
          <div class="time">
            17:42 2023/07/06
          </div>
        </div>
        <div class="body">
          <div class="teams-name">
            <BaseIcon name="spt-soccer" />
            <span>日本 - 西班牙</span>
          </div>
          <div class="market">
            {{ t('win_equal_lose') }}
          </div>
          <div class="odd-box">
            <span>{{ t('win') }}</span>
            <span>{{ slip }}</span>
          </div>
          <div class="result-box">
            <div class="result">
              10-11
            </div>
            <div class="btns">
              <BaseButton type="text" size="none">
                <BaseIcon name="spt-live" />
              </BaseButton>
              <BaseButton type="text" size="none">
                <BaseIcon name="uni-trend" />
              </BaseButton>
            </div>
          </div>
          <div v-show="i === slipList.length - 1" class="total-box">
            <div class="line" />
            <div class="item">
              <label>{{ t('sports_odds_title') }}</label>
              <span class="odds">1.08</span>
            </div>
            <div class="item">
              <label>{{ t('bet_amount') }}</label>
              <span>
                1.00000000
                <AppCurrencyIcon currency-type="BRL" />
              </span>
            </div>
            <div class="item">
              <label>{{ t('sports_payment_amount') }}</label>
              <span>
                1.00000000
                <AppCurrencyIcon currency-type="BRL" />
              </span>
            </div>
          </div>
        </div>
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
    }
  }
}

.sports-bottom {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
}

.sports-bet-slip {
  position: relative;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-lightgrey);

  .header {
    background-color: var(--tg-secondary-grey);
    display: flex;
    align-items: center;
    padding: var(--tg-spacing-13) var(--tg-spacing-12);
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;

    .status {
      font-size: var(--tg-font-size-xs);
      color: var(--tg-text-black);
      padding: 3px;
      background-color: var(--tg-text-green);
      border-radius: var(--tg-radius-sm);
      font-weight: var(--tg-font-weight-semibold);
      line-height: 1;
      margin-right: var(--tg-spacing-8);
    }
  }

  .body {
    background-color: var(--tg-primary-main);
    padding: var(--tg-spacing-8) var(--tg-spacing-12);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-8);
    font-weight: var(--tg-font-weight-semibold);

    .teams-name {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      color: var(--tg-text-white);
    }

    .odd-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--tg-text-white);
    }

    .result-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .result {
        color: var(--tg-text-warn);
      }

      .btns {
        display: flex;
        gap: var(--tg-spacing-12);
      }
    }

    .total-box {
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-8);

      .line {
        width: 61.32%;
        height: 1px;
        background-color: var(--tg-secondary-main);
        margin: 0 auto var(--tg-spacing-8);
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-weight: var(--tg-font-weight-normal);
          display: flex;
          align-items: center;
          gap: var(--tg-spacing-4);
        }

        .odds {
          font-weight: var(--tg-font-weight-semibold);
          color: var(--tg-text-blue);
        }
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    bottom: -4px;
    background:
      radial-gradient(circle, transparent, transparent 50%,
        var(--tg-primary-main) 50%,
        var(--tg-primary-main) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
  }

  &.before {
    margin-top: var(--tg-spacing-8);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      height: 6px;
      width: 100%;
      top: -4px;
      background:
        radial-gradient(circle, transparent, transparent 50%,
          var(--tg-primary-main) 50%,
          var(--tg-primary-main) 100%) 0px -6px/0.7rem 0.7rem repeat-x;
    }
  }
}
</style>
