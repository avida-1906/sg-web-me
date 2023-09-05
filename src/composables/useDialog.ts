import BaseDialog from '~/components/BaseDialog.vue'

export function useDialog({ title, icon, default: defaultSlot }: { title: string; icon: string; default: () => Component }) {
  const show = ref(false)
  const app = ref()

  const openDialog = () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    app.value = createApp(h(BaseDialog, {
      title,
      icon,
      show: true,
      onClose: () => {
        app.value.unmount()
        div.remove()
        closeDialog()
      },
    }, {
      default: () => defaultSlot(),
    }))
    app.value.mount(div)
    show.value = true
  }

  function closeDialog() {
    if (app.value)
      app.value.unmount()

    show.value = false
  }

  return {
    openDialog,
    closeDialog,
  }
}
