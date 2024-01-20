import AppWalletDialog from '~/components/AppWalletDialog.vue'
import type { EnumCurrencyKey } from '~/apis/types'
import { i18n } from '~/modules/i18n'

export function useWalletDialog(params?: {
  activeTab?: string
  initCurrency?: EnumCurrencyKey
}) {
  const { t } = i18n.global
  const title = computed(() => t('wallet'))
  const { openDialog: openWalletDialog, closeDialog: closeWalletDialog } = useDialog({
    title: title.value,
    icon: 'navbar-wallet',
    default: () => h(AppWalletDialog, {
      activeTab: params?.activeTab,
      initCurrency: params?.initCurrency,
    }),
  })

  return {
    openWalletDialog,
    closeWalletDialog,
  }
}
