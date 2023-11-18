import AppDeleteConfirmDialog from '~/components/AppDeleteConfirmDialog.vue'
import type { BankCard, VirtualCoin } from '~/apis/types'

export function useDeleteConfirmDialog(
  item: VirtualCoin | BankCard,
  updateWalletList: () => void,
  vCurrencyTitle?: string,
) {
  const { t } = useI18n()

  const { openDialog: openDeleteConfirm, closeDialog: closeDeleteConfirm } = useDialog({
    title: t('delete_confirm'),
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
