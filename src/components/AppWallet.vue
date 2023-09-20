<script lang="ts" setup>
interface Props {
  walletBtn?: boolean
  showBalance?: boolean
}

withDefaults(defineProps<Props>(), {
  walletBtn: false,
  showBalance: true,
})

const emit = defineEmits(['change'])

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
const { bool: isMenuShown } = useBoolean(false)
// 当前选择币种
const activeBalance = ref(currency.value[0])
//
function dropShow() {
  searchValue.value = ''
}
// function dropHide() {
//   searchValue.value = ''
// }
// 选择币种
function selectCurrency(item: any, hide: () => void) {
  hide()
  activeBalance.value = item
  emit('change', item)
}
// 搜索币种
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
onMounted(() => {
  emit('change', currency.value[0])
})
const { openWalletDialog } = useWalletDialog()
</script>

<template>
  <div class="base-wallet">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="dropShow">
      <!-- @apply-hide="dropHide" -->
      <div class="center">
        <div class="wallet" :class="{ 'wallet-only': !walletBtn }">
          <BaseButton type="text" size="md">
            <span v-if="showBalance" class="wallet-text">{{ activeBalance.balance }}</span>
            <BaseIcon class="coin" :name="activeBalance.icon" />
            <span v-if="!showBalance" class="wallet-text" style="padding-left: 5px;">{{ activeBalance.text }}</span>
            <BaseIcon class="arrow" :class="{ 'arrow-up': isMenuShown }" name="uni-arrow-down" />
          </BaseButton>
        </div>
        <BaseButton v-if="walletBtn" class="wallet-right-btn" size="sm" bg-style="primary" @click.stop="openWalletDialog">
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper">
          <div class="popper-top">
            <BaseSearch v-model="searchValue" :style="{ 'max-width': showBalance ? '180px' : '140px' }" class="top-search" :clearable="searchValue?.length > 0" :white-style="true" :place-holder="showBalance ? '搜索货币' : '搜索'" />
          </div>
          <div class="scroll-y popper-content" :class="{ 'justify-content': !showBalance }">
            <div v-for="item of getSearchBalance" :key="item.text" class="content-row" @click.stop="selectCurrency(item, hide)">
              <div v-if="showBalance" class="balance-num">
                {{ item.balance }}
              </div>
              <BaseIcon class="coin" :name="item.icon" />
              <span>{{ item.text }}</span>
            </div>
            <div v-show="!getSearchBalance.length" class="balance-not">
              无法使用货币
            </div>
          </div>
          <div v-if="walletBtn" class="popper-bottom">
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
    box-shadow: 0px 1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset, 0px -1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

    .coin {
      font-size: var(--tg-font-size-default);
      margin-left: 5px;
    }

    .arrow {
      font-size: 10px;
      margin-left: 8px;
    }
    .arrow-up{
      transform: rotate(180deg);
    }
    &:hover .arrow{
      --tg-icon-color: var(--tg-text-white);
    }
  }
  .wallet-only{
    border-radius: var(--tg-radius-sm);
  }
  .wallet-text {
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
    // width: 100%;
    padding: 8px 0 12px;

    .top-search {
      width: 85%;
      max-width: 180px;
      margin: auto;
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
        background-color: var(--tg-text-lightgrey);
      }
      .balance-num{
        width: 14ch;
      }

      .coin {
        font-size: var(--tg-font-size-md);
        margin-right: 5px;
      }
    }
    .balance-not{
      text-align: center;
      padding: 3px 0 12px;
    }
  }
  .justify-content{
    .content-row{
      justify-content:center;
    }
  }
  .popper-bottom {
    border-radius: 0px 0px 4px 4px;
    background: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.3)};

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
