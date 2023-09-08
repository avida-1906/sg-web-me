import BaseDialog from '~/components/BaseDialog.vue'

export function useDialog({ title, icon, default: defaultSlot }: { title: string; icon: string; default: () => Component }) {
  const show = ref(false)
  const app = ref()
  const div = ref()

  const openDialog = () => {
    div.value = document.createElement('div')
    document.body.appendChild(div.value)
    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      show: true,
      onClose: () => {
        app.value.unmount()
        div.value.remove()
        closeDialog()
      },
    }, {
      default: () => defaultSlot(),
    }))
    app.value.mount(div.value)
    show.value = true
  }

  function closeDialog() {
    if (app.value)
      app.value.unmount()
    if (div.value)
      div.value.remove()

    show.value = false
  }

  return {
    openDialog,
    closeDialog,
  }
}
