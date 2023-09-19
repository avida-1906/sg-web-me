<script setup lang='ts'>
// const { isFullScreen } = storeToRefs(useWindowStore())
// const router = useRouter()
// const { t } = useI18n()
// tab值
const activeTab: Ref<string> = ref('1')
const tabOptions = [
  { value: '1', label: '存款' },
  { value: '2', label: '提款' },
]
const username = ref('')
const usernameErrorMsg = ref('')
</script>

<template>
  <div class="app-safe">
    <div class="safe-">
      <div style="max-width: 160px;">
        <BaseTab v-model="activeTab" :list="tabOptions" />
      </div>
      <div>
        <span>货币</span>
        <AppWallet />
      </div>
      <div>
        <span>金额</span>
        <span>US$0.00</span>
      </div>
      <div>
        <BaseInput v-model="username" label="" :msg="usernameErrorMsg" placeholder="0.00000000" />
        <BaseButton>最大值</BaseButton>
      </div>
      <BaseButton bg-style="secondary">
        放入保险库
      </BaseButton>
    </div>
    <div class="safe-bottom">
      <div>通过双重验证提高您的账户安全性</div>
      <BaseButton bg-style="primary">
        开启双重验证
      </BaseButton>
      <BaseButton type="text">
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
  .safe-bottom{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
  }
}
</style>
