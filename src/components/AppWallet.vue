<script lang="ts" setup>
import type { EnumCurrencyKey } from '~/apis'

const route = useRoute()
const isCasinoGame = computed(() => route.name === 'casino-games')
const { openWalletDialog } = useWalletDialog()
const { openWalletSetDialog } = useWalletSetDialog()
// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const { width } = storeToRefs(useWindowStore())
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalance,
  searchValue,
  renderBalanceList,
  setHideZeroBalance,
  changeGlobalCurrency,
  clearSearchValue,
} = useCurrencyData()

// 选择币种
function selectCurrency(item: EnumCurrencyKey, hide: () => void) {
  changeGlobalCurrency(item)
  hide()
}
</script>

<template>
  <div class="app-wallet flex-box">
    <VDropdown v-model:shown="isMenuShown" :distance="6" @apply-show="clearSearchValue">
      <div class="flex-box">
        <BaseButton class="wallet" type="text" size="sm">
          <span v-if="isCasinoGame" class="in-play">
            (游戏使用中)
            <AppCurrencyIcon :show-name="true" :currency-type="currentGlobalCurrency" />
          </span>
          <AppAmount
            v-else
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
          <BaseIcon v-if="width < 910" name="navbar-wallet" class="icon-size" />
          <span v-else>钱包</span>
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper">
          <div class="popper-top">
            <BaseSearch
              v-model="searchValue"
              class="top-search"
              :clearable="searchValue?.length > 0"
              place-holder="搜索货币"
              shape="square"
            />
          </div>
          <div class="scroll-y popper-content">
            <div
              v-for="item of renderBalanceList"
              :key="item.type"
              class="content-row"
              :class="{ active: item.type === currentGlobalCurrency }"
              @click.stop="selectCurrency(item.type, hide)"
            >
              <AppAmount
                :amount="item.balanceWithSymbol"
                :currency-type="item.type"
                show-name
              />
            </div>
            <div v-show="!renderBalanceList.length" class="balance-not">
              无法使用货币
            </div>
          </div>
          <div class="popper-bottom">
            <BaseButton
              type="text"
              class="bottom-btn"
              @click=" hide();openWalletSetDialog({ setHideZeroBalance })"
            >
              <BaseIcon class="icon-wallet-set" name="navbar-wallet" />
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
  .in-play{
      color: var( --tg-text-white);
      display: inline-flex;
      gap: var(--tg-spacing-8);
      align-items: center;
    }
    .arrow {
      font-size: var(--tg-font-size-default);
      margin-left: 8px;
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
    color: var(--tg-popper-color-default);
    font-size: var(--tg-font-size-default);
    font-weight: 500;
    flex: 1;
    padding-bottom: var(--tg-spacing-15);
    &::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }
    .content-row {
      display: flex;
      align-items: center;
      padding: var(--tg-spacing-6) var(--tg-spacing-button-padding-horizontal-xs);
      cursor: pointer;
      --tg-app-amount-width:14ch;
      line-height: 20px;
      transition: color .2s ease;
      &:hover,&.active {
        background-color: var(--tg-text-blue);
        // color: var(--tg-popper-hover-color-default);
      }

    }
    .balance-not{
      text-align: center;
      // padding: 3px 0 12px;
    }
  }

  .popper-bottom {
    background: var(--tg-primary-main);

    .bottom-btn {
      width: 100%;
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: 400;
      padding: var(--tg-spacing-button-padding-vertical-s) 0 !important;

      span {
        line-height: 20px;
      }
    }

    .icon-wallet-set {
      font-size: var(--tg-font-size-base);
      --tg-icon-color: var(--tg-text-white);
      margin-right: 8px;
    }
  }

}
</style>
