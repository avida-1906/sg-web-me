<script lang="ts" setup>
interface Props {
  walletBtn?: boolean
  showBalance?: boolean
  network?: boolean
}

withDefaults(defineProps<Props>(), {
  walletBtn: false,
  showBalance: true,
  network: false,
})

const emit = defineEmits(['change'])

const currency = ref([
  { balance: '0.000000000', icon: 'coin-btc', text: 0 },
  { balance: '0.000000000', icon: 'coin-eth', text: 1, legalTender: true },
  { balance: '0.000000000', icon: 'coin-ltc', text: 2 },
  { balance: '0.000000000', icon: 'coin-usdt', text: 3 },
  { balance: '0.000000000', icon: 'coin-doge', text: 4 },
  { balance: '0.000000000', icon: 'coin-bch', text: 5 },
  { balance: '0.000000000', icon: 'coin-xrp', text: 6 },
  { balance: '0.000000000', icon: 'coin-eos', text: 7 },
  { balance: '0.000000000', icon: 'coin-trx', text: 8 },
  { balance: '0.000000000', icon: 'coin-bnb', text: 9 },
  { balance: '0.000000000', icon: 'coin-usdc', text: 10 },
  { balance: '0.000000000', icon: 'coin-ape', text: 11 },
  { balance: '0.000000000', icon: 'coin-busd', text: 12 },
  { balance: '0.000000000', icon: 'coin-cro', text: 13 },
  { balance: '0.000000000', icon: 'coin-dai', text: 14 },
  { balance: '0.000000000', icon: 'coin-link', text: 15 },
  { balance: '0.000000000', icon: 'coin-sand', text: 16 },
  { balance: '0.000000000', icon: 'coin-shib', text: 17 },
  { balance: '0.000000000', icon: 'coin-uni', text: 18 },
  { balance: '0.000000000', icon: 'coin-matic', text: 19 },
  { balance: '0.00', icon: 'coin-eur', text: 20 },
  { balance: 'JP¥0.00', icon: 'coin-jpy', text: 21 },
  { balance: 'R$0.00', icon: 'coin-brl', text: 22 },
  { balance: 'CA$0.00', icon: 'coin-cad', text: 23 },
  { balance: '0.0', icon: 'coin-inr', text: 24 },
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
      return item.icon.split('-')[1].includes(searchValue.value.toLocaleLowerCase())
    })
  }
  else {
    return currency.value
  }
})

const currentNetwork = ref('1')
const networkList = [
  { label: '网络1', value: '1' },
  { label: '网络2', value: '2' },
  { label: '网络3', value: '3' },
  { label: '网络4', value: '4' },
]

onMounted(() => {
  emit('change', currency.value[0])
  console.log(EnumCurrency)
})
const { openWalletDialog } = useWalletDialog()
</script>

<template>
  <div class="app-wallet app-currency" :class="{ 'app-currency': network }">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="dropShow">
      <!-- @apply-hide="dropHide" -->
      <div class="center">
        <div class="wallet" :class="{ 'wallet-only': !walletBtn }">
          <BaseButton type="text" size="md">
            <span v-if="showBalance" class="wallet-text" style="padding-right: 5px;">{{ activeBalance.balance }}</span>
            <AppCurrencyIcon class="wallet-text" :show-name="!showBalance" :currency-type="activeBalance.text" />
            <BaseIcon class="arrow" :class="{ 'arrow-up': isMenuShown }" name="uni-arrow-down" />
          </BaseButton>
        </div>
        <BaseButton v-if="walletBtn" class="wallet-right-btn" size="sm" bg-style="primary" @click.stop="openWalletDialog">
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper need-pad-y">
          <div class="popper-top">
            <BaseSearch v-model="searchValue" :style="{ 'max-width': showBalance ? '180px' : '140px' }" class="top-search" :clearable="searchValue?.length > 0" :white-style="true" :place-holder="showBalance ? '搜索货币' : '搜索'" />
          </div>
          <div class="scroll-y popper-content" :class="{ 'justify-content': !showBalance }">
            <div v-for="item of getSearchBalance" :key="item.text" class="content-row" @click.stop="selectCurrency(item, hide)">
              <div v-if="showBalance" class="balance-num">
                {{ item.balance }}
              </div>
              <AppCurrencyIcon show-name :currency-type="item.text" />
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
    <BaseSelect v-if="network" v-model="currentNetwork" :options="networkList" popper />
  </div>
</template>

<style lang="scss" scoped>
.app-wallet {

  .wallet {
    background-color: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
    box-shadow: 0px 1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset, 0px -1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

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
.app-currency {
  display: flex;
  justify-content: center;
  gap: var(--tg-spacing-12);
}
.dropdown-popper {
  max-height: inherit;
  max-width: inherit;
  display: flex;
  flex-direction: column;
  .popper-top {
    padding: 12px 0;

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
    flex: 1;
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
