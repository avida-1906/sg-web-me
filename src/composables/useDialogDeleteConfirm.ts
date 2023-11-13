import AppDeleteConfirmDialog from '~/components/AppDeleteConfirmDialog.vue'
import type { BankCard, VirtualCoin } from '~/apis/types'

export function useDeleteConfirmDialog(
  item: VirtualCoin | BankCard,
  updateWalletList: () => void,
  vCurrencyTitle?: string,
) {
  const { openDialog: openDeleteConfirm, closeDialog: closeDeleteConfirm } = useDialog({
    title: '删除确认',
    icon: 'uni-delete2',
    default: () => h(AppDeleteConfirmDialog, {
      item,
      updateWalletList,
      vCurrencyTitle,
    }),
  })

  return {
    openDeleteConfirm,
    closeDeleteConfirm,
  }
}
