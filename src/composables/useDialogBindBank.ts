import AppBindBankDialog from '~/components/AppBindBankDialog.vue'
import { i18n } from '~/modules/i18n'

export function useDialogBindBank(config: {
  isFirst?: boolean
  openName?: string
  currencyId: string
  closeDialog?: () => void
}) {
  const { t } = i18n.global
  const {
    openDialog: openBindBankDialog,
    closeDialog: closeBindBankDialog,
  } = useDialog({
    title: t('wallet'),
    icon: 'fiat-bank',
    default: () => h(AppBindBankDialog, {
      isFirst: config.isFirst,
      openName: config.openName,
      currencyId: config.currencyId,
    }),
  })

  return {
    openBindBankDialog,
    closeBindBankDialog,
  }
}
