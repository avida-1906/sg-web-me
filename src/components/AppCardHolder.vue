<script setup lang="ts">
import { getCurrentLanguageIdForBackend } from '~/modules/i18n'

const closeDialog = inject('closeDialog', () => {})

const openName = ref('')
const selectBank = ref('')
const pagination = ref({
  page_size: '10',
  page: '1',
  bank_type: getCurrentLanguageIdForBackend(),
})

// 银行卡列表
const { list: bankcardList, run: runBankcardList, loading: bankcardListLoading } = useList(ApiMemberBankcardList, {
  loadingKeep: 1000,
})

const bindBanks = computed(() => {
  return bankcardList.value?.map((item) => {
    if (item.is_default === 1)
      selectBank.value = item.bank_account
    const temp = {
      label: item.bank_name,
      value: item.bank_account,
      icon: 'fiat-bank',
      fullName: `${item.bank_name} ${item.bank_account}`,
      name: item.open_name,
    }
    if (!openName.value)
      openName.value = item.open_name
    return temp
  })
})

const toAddBankcards = function () {
  console.log(bankcardList.value)
  const { openAddBankcardsDialog } = useAddBankcardsDialog({ title: '绑定银行卡', openName: openName.value, isFirst: !bankcardList.value?.length })
  closeDialog()
  nextTick(() => openAddBankcardsDialog())
}

runBankcardList(pagination.value)
</script>

<template>
  <div v-if="bankcardListLoading" class="loading-wrap">
    <BaseLoading />
  </div>
  <div v-else class="app-card-holder">
    <div class="layout-spacing reset wallet-address">
      <BaseCollapse v-for="i in 3" :key="i" :title="i.toString()">
        <template #top-right>
          <AppCurrencyIcon class="currency-icon" show-name :currency-type="1" />
        </template>
        <template #content>
          <div class="text">
            bc1qcttjkayjg28gkw6v4petiqk56p098xxnuo0ze
          </div>
        </template>
      </BaseCollapse>
    </div>
    <div class="layout-spacing reset bank-card">
      <BaseLabel v-for="i, index in bindBanks" :key="index" label="持卡人姓名" :label-content="i.name">
        <BaseInput v-model="i.fullName" disabled>
          <template #left-icon>
            <BaseIcon :name="i.icon" />
          </template>
        </BaseInput>
      </BaseLabel>
      <BaseButton class="add-btn" @click="toAddBankcards">
        +
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-card-holder {
  .wallet-address{
    gap:  var(--tg-spacing-2) 0;
    .currency-icon{
      margin-right:  var(--tg-spacing-8);
      color: var(--tg-text-white);
    }
    .text{
      background: var(--tg-secondary-dark);
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-white);
      line-height: 20px;
      padding: var(--tg-spacing-12) var(--tg-spacing-16);
    }
  }
  .bank-card{
    padding: var(--tg-spacing-16);
    gap: var(--tg-spacing-12);
    .add-btn{
      font-size: var(--tg-font-size-md);
      color: var(--tg-text-lightgrey);
    }
  }
}
.loading-wrap{
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
