<script setup lang='ts'>
// const { isFullScreen } = storeToRefs(useWindowStore())
// const router = useRouter()
// const { t } = useI18n()
// tab值
const activeTab: Ref<string> = ref('deposit')
const tabOptions = [
  { value: 'deposit', label: '存款' },
  { value: 'withdraw', label: '提款' },
]

// interface Currency {
//   balance: string
//   icon: string
//   text: string
// }
const activeCurrency = ref()

function changeCurrency(item: any) {
  activeCurrency.value = item
}
const username = ref('')
const password = ref('')
const usernameErrorMsg = ref('')
</script>

<template>
  <div class="app-safe">
    <div class="safe-content">
      <BaseTab v-model="activeTab" :list="tabOptions" />
      <div class="flex-col-center">
        <span>货币</span>
        <AppWallet @change="changeCurrency" />
      </div>
      <div class="amount">
        <div class="top">
          <span class="label">金额</span>
          <span class="us">US$0.00</span>
        </div>
        <BaseInput v-model="username" type="number" placeholder="0.00000000" :msg="usernameErrorMsg">
          <template #right-icon>
            <BaseIcon :name="activeCurrency?.icon || ''" />
          </template>
          <template #right-button>
            <span>最大值</span>
          </template>
        </BaseInput>
      </div>
      <BaseButton v-if="activeTab === 'deposit'" class="safe-btn" bg-style="secondary" size="xl">
        存入保险库
      </BaseButton>
      <template v-else>
        <div>
          <BaseInput v-model="password" label="密码" :msg="usernameErrorMsg" placeholder="" type="password" must />
        </div>
        <BaseButton class="safe-btn" bg-style="secondary" size="xl">
          保险库取款
        </BaseButton>
      </template>
    </div>
    <div class="safe-bottom">
      <div>通过双重验证提高您的账户安全性</div>
      <BaseButton bg-style="primary" size="md">
        开启双重验证
      </BaseButton>
      <BaseButton class="more-btn" type="text">
        了解更多有关保险库的信息
      </BaseButton>
    </div>
    <!-- isFullScreen?:{{ isFullScreen }}
    <BaseButton @click="router.push('/casino')">
      casino
    </BaseButton> -->
  </div>
</template>

<style lang='scss' scoped>
.app-safe{
  .safe-content{
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .safe-btn{
      font-size: var(--tg-font-size-base);
    }
  }
  .flex-col-center{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    span{
      color: var(--tg-text-lightgrey);
      margin-bottom: 3px;
    }
  }
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding:1rem;
    gap: 1rem;
    color: var(--tg-text-lightgrey);
    .more-btn{
      padding: var(--tg-spacing-button-padding-vertical-none) var(--tg-spacing-button-padding-horizontal-none) !important;
      font-size: var(--tg-font-size-default);
    }
  }
  .amount {
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      justify-content: space-between;
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);
      margin-bottom: var(--tg-spacing-4);
      .us {
        font-size: var(--tg-font-size-xs);
      }
    }
  }
}
</style>
