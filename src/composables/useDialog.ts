import BaseDialog from '~/components/BaseDialog.vue'
import { install } from '~/modules'

interface DialogOptions {
  title?: string
  icon?: string
  maxWidth?: number
  showButtons?: boolean
  onCancel?: () => void
  onConfirm?: () => void
  default: () => Component
}

export function useDialog({ title, icon, default: defaultSlot, maxWidth, showButtons, onCancel, onConfirm }: DialogOptions) {
  const app = ref()
  const div = ref()
  const openDialog = () => {
    div.value = document.createElement('div')
    document.body.appendChild(div.value)
    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      maxWidth,
      showButtons,
      show: false,
      funcCall: true,
      onClose: () => {
        closeDialog()
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
      default: () => defaultSlot(),
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
