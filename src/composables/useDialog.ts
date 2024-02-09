import BaseDialog from '~/components/BaseDialog.vue'
import AppEmptyDiv from '~/components/AppEmptyDiv.vue'
import { install } from '~/modules'

interface DialogOptions {
  title?: string
  icon?: string
  maxWidth?: number
  showButtons?: boolean
  transparent?: boolean
  showClose?: boolean
  closeOnClickOverlay?: boolean
  noMoreToday?: boolean
  onCancel?: () => void
  onConfirm?: () => void
  onDialogClose?: () => void
  default: (params?: any) => Component
  bottomSlot?: () => Component
}

export function useDialog({
  title,
  icon,
  default: defaultSlot, maxWidth, showButtons, transparent, onCancel, onConfirm, onDialogClose,
  showClose, closeOnClickOverlay, noMoreToday, bottomSlot,
}: DialogOptions) {
  const app = ref()
  const div = ref()
  const openDialog = (params?: any) => {
    div.value = document.createElement('div')
    document.body.appendChild(div.value)
    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      maxWidth,
      showButtons,
      show: false,
      funcCall: true,
      transparent,
      showClose: params && params.showClose !== undefined ? params.showClose : showClose,
      noMoreToday,
      closeOnClickOverlay: params && params.closeOnClickOverlay !== undefined
        ? params.closeOnClickOverlay
        : closeOnClickOverlay,
      onClose: () => {
        closeDialog()
        onDialogClose && onDialogClose()
      },
      onCancel: () => {
        onCancel && onCancel()
        closeDialog()
      },
      onConfirm: () => {
        onConfirm && onConfirm()
        closeDialog()
      },
    }, {
      default: () => defaultSlot(params),
      bottom: bottomSlot ? bottomSlot() : h(AppEmptyDiv),
    }))
    install(app.value)
    app.value.mount(div.value)
  }

  function closeDialog() {
    if (app.value) {
      app.value.unmount()
      app.value = null
    }
    if (div.value) {
      div.value.remove()
      div.value = null
    }
  }

  return {
    openDialog,
    closeDialog,
  }
}
