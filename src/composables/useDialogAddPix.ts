import AppAddPix from '~/components/AppAddPix.vue'
import { i18n } from '~/modules/i18n'

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
    default: () => h(AppAddPix, {
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
