<script lang="ts" setup>
// interface Props {

// }

// withDefaults(defineProps<Props>(), {

// })
const currency = ref([
  { balance: '0.000000000', icon: 'coin-btc', text: 'BTC' },
  { balance: '0.000000000', icon: 'coin-eth', text: 'ETH' },
  { balance: '0.000000000', icon: 'coin-ltc', text: 'LTC' },
  { balance: '0.000000000', icon: 'coin-usdt', text: 'USDT' },
  { balance: '0.000000000', icon: 'coin-doge', text: 'DOGE' },
  { balance: '0.000000000', icon: 'coin-bch', text: 'BCH' },
  { balance: '0.000000000', icon: 'coin-xrp', text: 'XRP' },
  { balance: '0.000000000', icon: 'coin-eos', text: 'EOS' },
  { balance: '0.000000000', icon: 'coin-trx', text: 'TRX' },
  { balance: '0.000000000', icon: 'coin-bnb', text: 'BNB' },
  { balance: '0.000000000', icon: 'coin-usdc', text: 'USDC' },
  { balance: '0.000000000', icon: 'coin-ape', text: 'APE' },
  { balance: '0.000000000', icon: 'coin-busd', text: 'BUSD' },
  { balance: '0.000000000', icon: 'coin-cro', text: 'CRO' },
  { balance: '0.000000000', icon: 'coin-dai', text: 'DAI' },
  { balance: '0.000000000', icon: 'coin-link', text: 'LINK' },
  { balance: '0.000000000', icon: 'coin-sand', text: 'SAND' },
  { balance: '0.000000000', icon: 'coin-shib', text: 'SHIB' },
  { balance: '0.000000000', icon: 'coin-uni', text: 'UNI' },
  { balance: '0.000000000', icon: 'coin-matic', text: 'MATIC' },
  { balance: '0.00', icon: 'coin-eur', text: 'EUR' },
  { balance: 'JP¥0.00', icon: 'coin-jpy', text: 'JPY' },
  { balance: 'R$0.00', icon: 'coin-brl', text: 'BRL' },
  { balance: 'CA$0.00', icon: 'coin-cad', text: 'CAD' },
  { balance: '0.0', icon: 'coin-inr', text: 'INR' },
])
// 搜索内容
const searchValue = ref('')
// 下拉搜索是否显示
const isMenuShown = ref(false)
// 当前选择币种
const activeBalance = ref(currency.value[0])
// function dropShow() {
//   showDrop.value = true
// }
function dropHide() {
  searchValue.value = ''
}
function selectCurrency(item: any, hide: () => void) {
  hide()
  activeBalance.value = item
}

const getSearchBalance = computed(() => {
  if (searchValue.value) {
    return currency.value.filter((item) => {
      return item.text.includes(searchValue.value.toLocaleUpperCase())
    })
  }
  else {
    return currency.value
  }
})
</script>

<template>
  <div class="base-wallet">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-hide="dropHide">
      <!-- @apply-show="dropShow" -->
      <div class="center">
        <div class="wallet">
          <BaseButton type="text" size="sm">
            <span class="wallet-number">{{ activeBalance.balance }}</span>
            <BaseIcon class="coin" :name="activeBalance.icon" />
            <BaseIcon class="arrow" :class="{ 'arrow-up': isMenuShown }" name="uni-arrow-down" />
          </BaseButton>
        </div>
        <BaseButton class="wallet-right-btn" size="sm" bg-style="primary" @click.stop>
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper">
          <div class="popper-top">
            <BaseSearch v-model="searchValue" class="top-search" :clearable="searchValue?.length > 0" :white-style="true" place-holder="搜索货币" />
          </div>
          <div class="scroll-y popper-content">
            <div v-for="item of getSearchBalance" :key="item.text" class="content-row" @click.stop="selectCurrency(item, hide)">
              <div class="balance-num">
                {{ item.balance }}
              </div>
              <BaseIcon class="coin" :name="item.icon" />
              <span>{{ item.text }}</span>
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
      font-size: var(--tg-font-size-xs);
      margin-left: 8px;
    }
    .arrow-up{
      transform: rotate(180deg);
    }
    &:hover .arrow{
      --tg-icon-color: var(--tg-text-white);
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
    --tg-icon-color: var(--tg-text-white);
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
    overflow-y: auto;
    color: var(--tg-text-dark);
    font-size: var(--tg-font-size-default);
    font-weight: 500;

    &::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }

    .content-row {
      display: flex;
      align-items: center;
      padding: var(--tg-spacing-button-padding-vertical-s) var(--tg-spacing-button-padding-horizontal-xs);
      cursor: pointer;

      &:hover {
        background-color: var(--tg-secondary-light);
      }
      .balance-num{
        width: 14ch;
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
