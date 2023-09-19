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
const username = ref('')
const password = ref('')
const usernameErrorMsg = ref('')
</script>

<template>
  <div class="app-safe">
    <div class="safe-content">
      <div style="max-width: 160px;margin: auto;">
        <BaseTab v-model="activeTab" :list="tabOptions" />
      </div>
      <div class="flex-col-center">
        <span>货币</span>
        <AppWallet />
      </div>
      <div>
        <div class="label-row flex-between">
          <span>金额</span>
          <span>US$0.00</span>
        </div>
        <div class="flex-between amount-row">
          <div class="input-view" style="flex: 1;">
            <BaseInput v-model="username" label="" type="number" :msg="usernameErrorMsg" placeholder="0.00000000" />
          </div>
          <BaseButton class="max-btn" size="sm">
            最大值
          </BaseButton>
        </div>
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
      font-size: 16px;
    }
  }
  .flex-between{
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      padding: 0 !important;
      font-size: var(--tg-font-size-default);
    }
  }
  .max-btn{
    height: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .label-row{
    margin-bottom: var(--tg-spacing-7);
    color: var(--tg-text-lightgrey);
  }
  :deep(.input-view){
    label{
      display: none;
    }
    .input-box{
      box-shadow:none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom:0;
    }
    input{
      line-height: 1;
    }
  }
}
</style>
