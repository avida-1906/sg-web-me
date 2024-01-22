<script lang="ts" setup>
import type { CurrencyData } from '~/composables/useCurrencyData'
import type { availableCurrency } from '~/apis/types'

interface Props {
  modelValue?: string
  showBalance?: boolean // 是否展示货币余额
  network?: boolean // 是否显示协议类型
  type?: number
  placeholder?: string
  distance?: number
  activeCurrencyList?: availableCurrency[]
}

const props = withDefaults(defineProps<Props>(), {
  showBalance: true,
  network: false,
  type: 3,
  placeholder: 'search_currency',
  distance: 6,
})

const emit = defineEmits(['change', 'update:modelValue'])
const { userInfo } = storeToRefs(useAppStore())

const { t } = useI18n()
// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const {
  clearSearchValue,
  currentCurrency,
  searchValue,
  renderBalanceList,
  renderBalanceLockerList,
  renderCurrencyList,
  renderFinanceCurrencyList,
  getVirtualCurrencyContractType,
} = useCurrencyData()

const currentNetwork = ref()
const activeCurrency = ref<CurrencyData>()

const getCurrencyList = computed(() => {
  switch (props.type) {
    case 1: return renderBalanceList.value
    case 2: return renderBalanceLockerList.value
    case 3: return renderCurrencyList.value
    case 4: return renderFinanceCurrencyList.value(props.activeCurrencyList ?? [])
    default: return []
  }
})
// 获取协议类型
const curContractList = computed(() => {
  if (!activeCurrency.value)
    return []
  return getVirtualCurrencyContractType(activeCurrency.value.type)
})
const showNetwork = computed(() => {
  return props.network && curContractList.value?.length > 1
})

// 设置协议默认值
function getTypeVal() {
  currentNetwork.value = curContractList.value ? curContractList.value[0]?.value : ''
  emit('change', activeCurrency.value, currentNetwork.value)
}

// 选择币种
function selectCurrency(item: CurrencyData, hide: () => void) {
  hide()
  activeCurrency.value = item
  getTypeVal()
  emit('change', item, currentNetwork.value)
}
function getActiveValue() {
  activeCurrency.value = getCurrencyList.value.find(item => item.type === (activeCurrency.value?.type ?? currentCurrency.value))
    ?? getCurrencyList.value[0]
  emit('change', activeCurrency.value, currentNetwork.value)
}

watch(() => props.type, () => {
  getActiveValue()
})
watch(() => currentNetwork.value, () => {
  emit('change', activeCurrency.value, currentNetwork.value)
})
watch(() => props.activeCurrencyList, () => {
  nextTick(() => {
    getActiveValue()
  })
})
watch(() => [userInfo.value.balanceData, userInfo.value.lockerData], () => {
  getActiveValue()
})

onMounted(() => {
  getActiveValue()
  getTypeVal()
})
</script>

<template>
  <div class="app-wallet app-currency">
    <VDropdown
      v-model:shown="isMenuShown"
      :distance="distance"
      handle-resize
      style="width: var(--tg-app-dropdown-width)"
      @apply-show="clearSearchValue"
    >
      <div class="wallet-box">
        <span v-if="showNetwork">{{ t('currency') }}</span>
        <BaseButton class="wallet wallet-only" custom-padding type="text" size="md">
          <AppAmount
            v-if="showBalance"
            style="color:var(--tg-text-white);"
            :amount="activeCurrency?.balanceWithSymbol || ''"
            :currency-type="activeCurrency?.type || currentCurrency"
          />
          <AppCurrencyIcon
            v-else
            class="wallet-text"
            :show-name="!showBalance"
            :currency-type="activeCurrency?.type || currentCurrency"
          />
          <BaseIcon
            class="arrow"
            :class="{ 'arrow-up': isMenuShown }"
            name="uni-arrow-down"
          />
        </BaseButton>
      </div>
      <template #popper="{ hide }">
        <div class="dropdown-popper need-pad-y">
          <div class="popper-top" :style="{ '--tg-app-select-currency-poptop-width': showBalance ? '218px' : '136px' }">
            <BaseSearch
              v-model="searchValue"
              class="top-search"
              :clearable="searchValue?.length > 0"
              :place-holder="$t(placeholder)"
              shape="square"
              white-style
            />
          </div>
          <div
            class="scroll-y popper-content"
            :class="{ 'justify-content': !showBalance }"
          >
            <div
              v-for="item of getCurrencyList"
              :key="item.type"
              class="content-row"
              :class="{ active: item.type === activeCurrency?.type }"
              @click.stop="selectCurrency(item, hide)"
            >
              <AppAmount
                v-if="showBalance"
                :amount="item.balanceWithSymbol"
                :currency-type="item.type"
                show-name
              />
              <AppCurrencyIcon v-else show-name :currency-type="item.type" />
            </div>
            <div v-show="!getCurrencyList.length" class="balance-not">
              {{ $t('currency_disable') }}
            </div>
          </div>
        </div>
      </template>
    </VDropdown>
    <div v-if="showNetwork" class="wallet-box">
      <span>{{ t('network') }}</span>
      <BaseSelect
        v-model="currentNetwork"
        :options="curContractList"
        popper
      />
    </div>
  </div>
</template>

<style>
:root {
  --tg-app-select-currency-poptop-width: max-content;
  --tg-app-select-currency-padding-x: 20px;
  --tg-app-select-currency-padding-y: 15px;
  --tg-app-dropdown-width: auto;
  --tg-app-select-currency-bg: var(--tg-secondary-dark);
}
/* .select-currency{
  --tg-base-select-popper-active-color: none;
} */
</style>

<style lang="scss" scoped>
.app-wallet {
    .wallet-box {
        display: flex;
        gap: var(--tg-spacing-4);
        justify-content: center;
        flex-direction: column;
        --tg-base-button-padding-x: var(--tg-app-select-currency-padding-x);
        --tg-base-button-padding-y: var(--tg-app-select-currency-padding-y);
    }
    .wallet {
        background-color: var(--tg-app-select-currency-bg);
        border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
        // box-shadow:
        // 0px 1px 2px 0px
        // #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset,
        // 0px -1px 2px 0px
        // #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

        .arrow {
            font-size: var(--tg-font-size-default);
            margin-left: var(--tg-spacing-9);
            transition: none;
        }

        .arrow-up {
            transform: rotate(180deg);
        }
    }

    .wallet-only {
        border-radius: var(--tg-radius-sm);
    }

    .wallet-text {
        line-height: 1;
        color: var(--tg-text-white);
        font-size: var(--tg-font-size-default);
        font-style: normal;
        font-weight: 500;
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
        padding: 4px 12px;
        padding-bottom: 8px;
        width: var(--tg-app-select-currency-poptop-width);

        :deep(.base-search.top-search) {
            --tg-base-search-icon-size: var(--tg-font-size-base);
            width: 100%;
            margin: auto;
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
                opacity: 0.82;
              }
            }
        }
    }

    .popper-content {
        max-height: 300px;
        overflow-y: auto;
        color: var(--tg-popper-color-default);
        font-size: var(--tg-font-size-default);
        font-weight: 500;
        flex: 1;
        &::-webkit-scrollbar-thumb {
            background: var(--tg-secondary-light);
        }
        .content-row {
            display: flex;
            align-items: center;
            padding:
            var(--tg-spacing-button-padding-vertical-s)
            var(--tg-spacing-button-padding-horizontal-xs);
            cursor: pointer;
            --tg-app-amount-width: 12ch;
            transition: color 0.2s ease;
            font-weight: var(--tg-font-weight-semibold);

            &:hover {
              background-color: var(--tg-secondary-light);
            }
            &:active div{
              transform: scale(0.96);
            }

        }

        .balance-not {
            text-align: center;
            padding: 3px 0 12px;
        }
    }

    .justify-content {
        .content-row {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
    }

}
</style>
