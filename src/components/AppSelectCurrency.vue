<script lang="ts" setup>
import type { IUserCurrencyList } from '~/stores/app'

interface Props {
  showBalance?: boolean // 是否展示货币余额
  network?: boolean // 是否显示协议类型
  currencyList?: IUserCurrencyList[] // 渲染的货币列表
}

const props = withDefaults(defineProps<Props>(), {
  showBalance: true,
  network: false,
})

const emit = defineEmits(['change'])

// 下拉搜索是否显示
const { bool: isMenuShown } = useBoolean(false)
const { userCurrencyList } = useAppStore()
const {
  currentCurrency,
  searchValue,
  changeCurrentCurrency,
  clearSearchValue,
} = useCurrencyData()

const currentNetwork = ref()

const getCurrencyList = computed(() => {
  const activeList = props.currencyList || userCurrencyList
  if (searchValue.value)
    return activeList.filter((item: IUserCurrencyList) => item.type.includes(searchValue.value.toLocaleUpperCase()))
  return activeList
})
// 获取当前选择货币对象
const getCurrencyBalance = computed(() => {
  const activeList = props.currencyList || userCurrencyList
  return activeList
    .find((item: IUserCurrencyList) =>
      item.type === currentCurrency.value)
})
// 获取协议类型
const getCurContract = computed(() => {
  return getCurrencyBalance.value?.contract_type?.map((type) => {
    return { label: type, value: type }
  })
})

// 设置协议选项的值
function getTypeVal() {
  currentNetwork.value = getCurContract.value ? getCurContract.value[0]?.value : ''
}
// 选择币种
function selectCurrency(item: IUserCurrencyList, hide: () => void) {
  hide()
  changeCurrentCurrency(item.type)
  getTypeVal()
}

watch(() => getCurrencyBalance.value, () => {
  emit('change', getCurrencyBalance.value)
})

onMounted(() => {
  emit('change', getCurrencyBalance.value)
  getTypeVal()
})
</script>

<template>
  <div class="app-wallet app-currency">
    <VDropdown
      v-model:shown="isMenuShown"
      :distance="6"
      @apply-show="clearSearchValue"
    >
      <div class="wallet-box">
        <BaseButton class="wallet wallet-only" type="text" size="md">
          <AppAmount
            v-if="showBalance"
            style="color:var(--tg-text-white);"
            :amount="getCurrencyBalance?.balanceWithSymbol || ''"
            :currency-type="currentCurrency"
          />
          <AppCurrencyIcon
            v-else class="wallet-text"
            :show-name="!showBalance"
            :currency-type="currentCurrency"
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
          <div class="popper-top">
            <BaseSearch
              v-model="searchValue"
              class="top-search"
              :clearable="searchValue?.length > 0"
              :white-style="true"
              :style="{ 'max-width': showBalance ? '180px' : '140px' }"
              place-holder="搜索"
            />
          </div>
          <div
            class="scroll-y popper-content"
            :class="{ 'justify-content': !showBalance }"
          >
            <div
              v-for="item of getCurrencyList"
              :key="item.type" class="content-row"
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
              无法使用货币
            </div>
          </div>
        </div>
      </template>
    </VDropdown>
    <BaseSelect
      v-if="network && getCurContract?.length"
      v-model="currentNetwork"
      :options="getCurContract"
      popper
    />
  </div>
</template>

<style lang="scss" scoped>
.app-wallet {
    .wallet-box {
        display: flex;
        justify-content: center;
    }

    .wallet {
        background-color: var(--tg-secondary-dark);
        border-radius: var(--tg-radius-sm) 0px 0px var(--tg-radius-sm);
        box-shadow:
        0px 1px 2px 0px
        #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset,
        0px -1px 2px 0px
        #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.1)} inset;

        .arrow {
            font-size: 10px;
            margin-left: 9px;
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
        padding: 12px 0;

        .top-search {
            width: 85%;
            max-width: 140px;
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
            --tg-app-amount-width: 14ch;
            transition: color 0.2s ease;

            &:hover {
                // background-color: var(--tg-text-lightgrey);
                color: var(--tg-popper-hover-color-default);
            }

        }

        .balance-not {
            text-align: center;
            padding: 3px 0 12px;
        }
    }

    .justify-content {
        .content-row {
            justify-content: center;
        }
    }

}
</style>
