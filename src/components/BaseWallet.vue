<script lang="ts" setup>
// interface Props {

// }
const currency = ref([
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
])

const searchValue = ref()
// withDefaults(defineProps<Props>(), {

// })
</script>

<template>
  <div class="base-wallet center">
    <VDropdown :distance="6">
      <div class="wallet">
        <BaseButton type="text" size="sm">
          <span class="wallet-number">0.00000000</span>
          <BaseIcon class="coin" name="coin-btc" />
          <BaseIcon class="arrow" name="header-arrow-down" />
          <!-- <BaseIcon name="uni-arrow-up-big" /> -->
        </BaseButton>
      </div>
      <template #popper>
        <div class="dropdown-popper">
          <div class="popper-top">
            <BaseSearch v-model="searchValue" class="top-search" clearable :white-style="true" place-holder="搜索货币" />
          </div>
          <div class="popper-content">
            <div v-for="item of currency" :key="item.text" class="content-row">
              <div>{{ item.balance }}</div>
              <div class="balance-type">
                <BaseIcon class="coin" name="coin-btc" />
                <span>{{ item.text }}</span>
              </div>
            </div>
          </div>
          <div class="popper-bottom">
            <BaseButton type="text" class="bottom-btn">
              <BaseIcon class="icon-wallet-set" name="wallet-set" />
              <span>钱包设置</span>
            </BaseButton>
          </div>
        </div>
      </template>
    </VDropdown>
    <BaseButton class="wallet-right-btn" size="sm" bg-style="primary">
      <BaseIcon name="header-wallet" class="icon-size" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.base-wallet {

  .wallet {
    background-color: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset;

    .coin {
      font-size: var(--tg-font-size-md);
      margin-left: 5px;
    }

    .arrow {
      font-size: var(--tg-font-size-md);
      margin-left: 8px;
    }
  }

  .wallet-number {
    line-height: 1;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    font-style: normal;
    font-weight: 500;
  }

  .wallet-right-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .icon-size{
    font-size: var(--tg-font-size-md);
  }
}

.dropdown-popper {
  display: flex;
  flex-direction: column;
  max-width: 100vw;

  .popper-top {
    padding: 8px 20px 12px;

    .top-search {
      max-width: 180px;
    }
  }

  .popper-content {
    max-height: 20rem;
    overflow: auto;
    color: var(--tg-text-dark);
    font-size: var(--tg-font-size-default);
    font-weight: 500;

    .scroll-light::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }

    .scrollY::-webkit-scrollbar-thumb,
    .scrollX::-webkit-scrollbar-thumb {
      border-radius: var(--tg-radius-lg);
    }

    .scrollY::-webkit-scrollbar {
      width: 1px;
    }

    .content-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      cursor: pointer;

      &:hover {
        background-color: var(--tg-secondary-light);
      }

      .balance-type {
        display: flex;
        align-items: center;
      }

      .coin {
        font-size: var(--tg-font-size-md);
        margin-right: 5px;
      }
    }
  }

  .popper-bottom {
    border-radius: 0px 0px 4px 4px;
    background: rgba(177, 186, 211, 0.30);

    .bottom-btn {
      width: 100%;
      color: var(--tg-text-dark);
      font-size: var(--tg-font-size-default);
      font-weight: 500;
      padding: var(--tg-spacing-button-padding-vertical-s) 0 !important;

      span {
        line-height: 1;
      }
    }

    .icon-wallet-set {
      font-size: var(--tg-font-size-md);
      margin-right: 5px;
    }
  }

}
</style>
