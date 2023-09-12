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
  <div class="app-header">
    <BaseAspectRatio ratio="2/1" width="67px">
      <BaseLogo mode="svg" svg-name="app-logo" />
    </BaseAspectRatio>
    <div class="header-middle">
      <VDropdown :distance="6">
        <div class="wallet">
          <BaseButton type="text" size="md">
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
      <BaseButton class="wallet-right-btn" size="md" bg-style="primary">
        <BaseIcon name="header-wallet" class="icon-size" />
      </BaseButton>
    </div>
    <div class="header-right">
      <BaseButton type="text" class="search-btn">
        <BaseIcon class="icon-search" name="header-search" />
        <span>搜索</span>
      </BaseButton>
      <BaseButton type="text">
        <BaseIcon class="icon-size" name="header-user" />
      </BaseButton>
      <BaseButton type="text">
        <BaseIcon class="icon-size" name="header-notice" />
      </BaseButton>
      <BaseButton type="text">
        <BaseIcon class="icon-size" name="header-news" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  .icon-size{
    font-size: var(--tg-font-size-md);
  }
  .header-middle{
    display: flex;
    align-items: center;
    justify-content: center;
    .wallet{
      background-color: var(--tg-secondary-dark);
      border-radius: var( --tg-radius-sm) 0px 0px var( --tg-radius-sm);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset;
      .coin{
        font-size: var(--tg-font-size-md);
        margin-left: 5px;
      }
      .arrow{
        font-size: var(--tg-font-size-md);
        margin-left: 8px;
      }
    }
    .wallet-number{
      line-height: 1;
      color:var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-style: normal;
      font-weight: 500;
    }
    .wallet-right-btn{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .header-right{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    span{
      margin-left: 5px;
    }
    .search-btn{
      color:var(--tg-text-white);
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
      padding-left: 10px;
      .icon-search{
        font-size: var(--tg-font-size-xl);
      }
    }
  }
}
.dropdown-popper{
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  .popper-top{
    padding: 12px 20px;
    .top-search{
      max-width: 180px;
    }
  }
  .popper-content{
    max-height: 300px;
    overflow: auto;
    color: var(--, #05080A);
    font-size: var(--tg-font-size-default);
    font-weight: 500;
    .content-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:6px 12px;
      cursor: pointer;
      &:hover{
        background-color: #b1bad3;
      }
      .balance-type{
        display: flex;
        align-items: center;
      }
      .coin{
        font-size: var(--tg-font-size-md);
        margin-right: 5px;
      }
    }
  }
  .popper-bottom{
    // border-radius: 0px 0px 4px 4px;
    background: rgba(177, 186, 211, 0.30);
    .bottom-btn{
      width: 100%;
      color: #05080A;
      font-size: var(--tg-font-size-default);
      font-weight: 500;
    }
    .icon-wallet-set{
      font-size: var(--tg-font-size-md);
      margin-right: 5px;
    }
  }

}
</style>
