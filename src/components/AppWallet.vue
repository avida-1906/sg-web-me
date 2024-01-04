<script lang="ts" setup>
import type { EnumCurrencyKey } from '~/apis/types'

interface Props {
  popperClazz?: string
}

defineProps<Props>()

const route = useRoute()
const appStore = useAppStore()
const isCasinoGame = computed(() => route.name === 'casino-games')
const { openWalletDialog } = useWalletDialog()
const { openWalletSetDialog } = useWalletSetDialog()
// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const { width } = storeToRefs(useWindowStore())
const searchRef = ref()
const {
  currentGlobalCurrency,
  currentGlobalCurrencyBalance,
} = storeToRefs(appStore)
const {
  searchValue,
  renderBalanceList,
  setHideZeroBalance,
  clearSearchValue,
} = useCurrencyData()

// 选择币种
function selectCurrency(item: EnumCurrencyKey, hide: () => void) {
  appStore.changeGlobalCurrency(item)
  hide()
}

function popperApplyShow() {
  clearSearchValue()
  useFixedTop('.app-h-wallet')
}
function handleHide() {
  searchRef.value?.manualBlur()
}
</script>

<template>
  <div class="app-wallet flex-box">
    <VDropdown
      v-model:shown="isMenuShown"
      :distance="10"
      @apply-show="popperApplyShow"
      @hide="handleHide"
    >
      <div class="flex-box">
        <BaseButton class="wallet" type="text" size="sm">
          <!-- <span v-if="isCasinoGame" class="in-play">
            ({{ $t('use_in_game') }})
            <AppCurrencyIcon :show-name="true" :currency-type="currentGlobalCurrency" />
          </span> -->
          <AppAmount
            v-if="application.isVirtualCurrency(currentGlobalCurrency)"
            style="color:var(--tg-text-white);"
            :amount="currentGlobalCurrencyBalance"
            :currency-type="currentGlobalCurrency"
          />
          <AppTooltip
            v-else :auto-hide="false"
            :triggers="['hover']" :distance="12"
          >
            <template #content>
              <AppAmount
                style="color:var(--tg-text-white);"
                :amount="currentGlobalCurrencyBalance"
                :currency-type="currentGlobalCurrency"
              />
            </template>
            <template #popper>
              <AppAmount
                :amount="currentGlobalCurrencyBalance"
                :currency-type="currentGlobalCurrency"
              />
            </template>
          </AppTooltip>
          <BaseIcon
            class="arrow"
            :class="{ 'arrow-up': isMenuShown }"
            name="uni-arrow-down"
          />
        </BaseButton>
        <BaseButton
          class="wallet-right-btn"
          custom-padding
          bg-style="primary"
          @click.stop="openWalletDialog"
        >
          <BaseIcon v-if="width < 910" name="navbar-wallet" class="icon-size" />
          <span v-else>{{ $t('wallet') }}</span>
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper" :class="[popperClazz]">
          <div class="popper-top">
            <BaseSearch
              ref="searchRef"
              v-model="searchValue"
              class="top-search"
              :clearable="searchValue?.length > 0"
              :place-holder="$t('search_currency')"
              shape="square"
              white-style
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
              {{ $t('currency_disable') }}
            </div>
          </div>
          <div class="popper-bottom">
            <BaseButton
              type="text"
              style="width: 100%;"
              custom-padding
              @click=" hide();openWalletSetDialog({ setHideZeroBalance })"
            >
              <BaseIcon class="icon-wallet-set" name="wallet-set" />
              <span style="color: var(--tg-popper-color-default);">
                {{ $t('title_wallet_set') }}</span>
            </BaseButton>
          </div>
        </div>
      </template>
    </VDropdown>
  </div>
</template>

<style>
:root {
  --tg-app-select-currency-poptop-width: max-content;
}
</style>

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
      transition: none;
    }
    .arrow-up{
      transform: rotate(180deg);
    }
  }

  .wallet-right-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    --tg-base-button-padding-y: var(--tg-spacing-button-padding-horizontal-sm);
    --tg-base-button-padding-x: var(--tg-spacing-button-padding-vertical-lg);
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
    // padding: 8px 12px;
    margin: 0 auto;
    padding-top: 8px;
    padding-bottom: 8px;
    width: var(--tg-app-select-currency-poptop-width);

    :deep(.base-search.top-search) {
      --tg-base-search-icon-size: var(--tg-font-size-base);
      width: 100%;
      max-width: 100%;
      margin: auto;
      background-color: var(--tg-text-white);
      border-color: var(--tg-text-grey-light);
      padding: 0 var(--tg-spacing-10);
      --tg-icon-color: var(--tg-secondary-light);
      height: 39px;
      .search-icon {
        color: var(--tg-secondary-light);
      }
      .clear-icon {
        right: 7px;
        top: 11px;
      }
      input {
        color: var(--tg-secondary-main);
        padding-left: var(--tg-spacing-8);
        font-weight: var(--tg-font-weight-semibold);
        &::placeholder {
          color: var(--tg-secondary-main) !important;
          font-weight: var(--tg-font-weight-semibold);
          opacity: 0.8;
        }
      }
    }
  }

  .popper-content {
    max-height: 20rem;
    overflow-y: auto;
    color: var(--tg-popper-color-default);
    font-size: var(--tg-font-size-default);
    font-weight: 500;
    flex: 1;
    border-bottom: 2px solid var(--tg-text-grey-light);
    // padding-bottom: var(--tg-spacing-15);
    &::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }
    .content-row {
      display: flex;
      align-items: center;
      padding: var(--tg-spacing-6) var(--tg-spacing-button-padding-horizontal-xs);
      cursor: pointer;
      --tg-app-amount-width:16ch;
      --tg-app-amount-max-width: 16ch;
      line-height: 20px;
      transition: all .2s ease;
      font-weight: var(--tg-font-weight-semibold);
      &:hover { // ,&.active
        background-color: var(--tg-secondary-light);
        // color: var(--tg-text-black);
        // color: var(--tg-popper-hover-color-default);
      }
      &:active div{
        transform: scale(0.96);
        // color: var(--tg-text-blue);
      }
    }
    .balance-not{
      text-align: center;
      // padding: 3px 0 12px;
      line-height: 36px;
      font-weight: var(--tg-font-weight-semibold);
    }
  }

  .popper-bottom {
    // background: var(--tg-primary-main);
    --tg-base-button-padding-y: var(--tg-spacing-button-padding-vertical-s);
    --tg-base-button-padding-x: var(--tg-spacing-button-padding-vertical-none);
    --tg-base-button-font-weight: var(--tg-font-weight-semibold);
    --tg-base-button-text-default-color: var(--tg-popper-color-default);
    margin: var(--tg-spacing-4) 0;
    width: 231.5px;
    .icon-wallet-set {
      font-size: var(--tg-font-size-base);
      --tg-icon-color: var(--tg-popper-color-default);
      margin-right: var(--tg-spacing-8);
    }
    &:hover{
      background-color: #b1bad3;
    }
  }

}
</style>
