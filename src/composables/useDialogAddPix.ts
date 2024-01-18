import { i18n } from '~/modules/i18n'
import AppAddPixDialog from '~/components/AppAddPixDialog.vue'

export function useDialogAddPix(params: {
  title: string
  icon: string
  openName: string
  isFirst: boolean
  currencyId: string
}) {
  const { t } = i18n.global

  const {
    openDialog: openAddPixDialog,
    closeDialog: closeAddPixDialog,
  } = useDialog({
    title: t('wallet'),
    icon: params.icon,
    default: () => h(AppAddPixDialog, {
      openName: params.openName,
      isFirst: params.isFirst,
      title: params.title,
      currencyId: params.currencyId,
    }),
  })

  return {
    openAddPixDialog,
    closeAddPixDialog,
  }
}
