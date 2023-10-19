<script lang="ts" setup>
import type { IUserCurrencyList } from '~/stores/app'

const { openWalletDialog } = useWalletDialog()
const { openWalletSetDialog } = useWalletSetDialog()
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

// 选择币种
function selectCurrency(item: IUserCurrencyList, hide: () => void) {
  changeCurrency(item.type)
  hide()
}
</script>

<template>
  <div class="app-wallet flex-box">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="clearSearchValue">
      <div class="flex-box">
        <BaseButton class="wallet" type="text" size="sm">
          <AppAmount
            style="color:var(--tg-text-white);"
            :amount="currentGlobalCurrencyBalance"
            :currency-type="currentGlobalCurrency"
          />
          <BaseIcon
            class="arrow"
            :class="{ 'arrow-up': isMenuShown }"
            name="uni-arrow-down"
          />
        </BaseButton>
        <BaseButton
          class="wallet-right-btn"
          bg-style="primary"
          @click.stop="openWalletDialog"
        >
          <BaseIcon v-if="appContentWidth < 790" name="navbar-wallet" class="icon-size" />
          <span v-else>钱包</span>
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper need-pad-y">
          <div class="popper-top">
            <BaseSearch
              v-model="searchValue"
              class="top-search"
              :clearable="searchValue?.length > 0"
              :white-style="true" place-holder="搜索货币"
            />
          </div>
          <div class="scroll-y popper-content">
            <div
              v-for="item of renderCurrencyList"
              :key="item.type"
              class="content-row"
              @click.stop="selectCurrency(item, hide)"
            >
              <AppAmount
                :amount="item.balanceWithSymbol"
                :currency-type="item.type"
                show-name
              />
            </div>
            <div v-show="!renderCurrencyList.length" class="balance-not">
              无法使用货币
            </div>
          </div>
          <div class="popper-bottom">
            <BaseButton
              type="text"
              class="bottom-btn"
              @click=" hide();openWalletSetDialog()"
            >
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
.flex-box{
  display: flex;
  justify-content: center;
}
.app-wallet {
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
