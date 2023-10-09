<script lang="ts" setup>
import type { IUserCurrencyList } from '~/stores/app'

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

const { openWalletDialog } = useWalletDialog()
// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const { appContentWidth } = storeToRefs(useWindowStore())
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalance,
  searchValue,
  renderCurrencyList,
  changeCurrency,
  clearSearchValue,
} = useCurrencyData()

const currentNetwork = ref('TRC20')
const networkList = [
  { label: 'ERC20', value: 'ERC20' },
  { label: 'TRC20', value: 'TRC20' },
]

// 选择币种
function selectCurrency(item: IUserCurrencyList, hide: () => void) {
  changeCurrency(item.type)
  hide()
  emit('change', item)
}
</script>

<template>
  <div class="app-wallet app-currency" :class="{ 'app-currency': network }">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="clearSearchValue">
      <div class="wallet-box">
        <BaseButton class="wallet" :class="{ 'wallet-only': !walletBtn }" type="text" size="md">
          <AppAmount v-if="showBalance" style="color:var(--tg-text-white);" :amount="currentGlobalCurrencyBalance" :currency-type="currentGlobalCurrency" />
          <AppCurrencyIcon v-else class="wallet-text" :show-name="!showBalance" :currency-type="currentGlobalCurrency" />
          <BaseIcon class="arrow" :class="{ 'arrow-up': isMenuShown }" name="uni-arrow-down" />
        </BaseButton>
        <BaseButton v-if="walletBtn" class="wallet-right-btn" bg-style="primary" @click.stop="openWalletDialog">
          <BaseIcon v-if="appContentWidth < 790" name="navbar-wallet" class="icon-size" />
          <span v-else>钱包</span>
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper need-pad-y">
          <div class="popper-top">
            <BaseSearch v-model="searchValue" :style="{ 'max-width': showBalance ? '180px' : '140px' }" class="top-search" :clearable="searchValue?.length > 0" :white-style="true" :place-holder="showBalance ? '搜索货币' : '搜索'" />
          </div>
          <div class="scroll-y popper-content" :class="{ 'justify-content': !showBalance }">
            <div v-for="item of renderCurrencyList" :key="item.type" class="content-row" @click.stop="selectCurrency(item, hide)">
              <AppAmount v-if="showBalance" :amount="item.balanceWithSymbol" :currency-type="item.type" show-name />
              <AppCurrencyIcon v-else show-name :currency-type="item.type" />
            </div>
            <div v-show="!renderCurrencyList.length" class="balance-not">
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
  .wallet-box{
    display: flex;
    justify-content: center;
  }
  .wallet {
    background-color: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
    box-shadow: 0px 1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset, 0px -1px 2px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

    .arrow {
      font-size: 10px;
      margin-left: 9px;
    }
    .arrow-up{
      transform: rotate(180deg);
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
    padding: 16.5px 16px 16.5px !important;
  }
  .icon-size{
    --tg-icon-color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
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
      --tg-app-amount-width:14ch;
      &:hover {
        background-color: var(--tg-text-lightgrey);
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
