/** 银行列表api数据 */
export function useApiMemberBankCardList() {
  const { list: bankcardList, runAsync: runAsyncBankcardList } = useList(ApiMemberBankcardList)

  /** 默认银行 */
  const selectBank = ref('')

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
      return temp
    })
  })

  return {
    bankcardList,
    runAsyncBankcardList,
    bindBanks,
    selectBank,
  }
}
