import BaseDialog from '~/components/BaseDialog.vue'

export function useDialog({ title, icon, default: defaultSlot }: { title: string; icon: string; default: () => Component }) {
  const app = ref()
  const div = ref()

  const openDialog = () => {
    div.value = document.createElement('div')
    document.body.appendChild(div.value)
    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      show: false,
      funcCall: true,
      onClose: () => {
        closeDialog()
      },
    }, {
      default: () => defaultSlot(),
    }))
    app.value.mount(div.value)
  }

  function closeDialog() {
    if (app.value)
      app.value.unmount()
    if (div.value)
      div.value.remove()
  }

  return {
    openDialog,
    closeDialog,
  }
}
