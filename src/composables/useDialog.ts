import BaseDialog from '~/components/BaseDialog.vue'
import { install } from '~/modules'

export function useDialog({ title, icon, default: defaultSlot, maxWidth }: { title: string; icon: string; default: () => Component; maxWidth?: number }) {
  const app = ref()
  const div = ref()
  const openDialog = () => {
    div.value = document.createElement('div')
    document.body.appendChild(div.value)
    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      maxWidth,
      show: false,
      funcCall: true,
      onClose: () => {
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
