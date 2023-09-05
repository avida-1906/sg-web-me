import BaseNotify from '~/components/BaseNotify.vue'

export type notifyType = 'set' | 'user' | 'email' | 'error' | 'success' | 'insurance' | 'statistics'

export function useNotify({ showClose, onClose }: { onClose?: () => void; showClose?: boolean } = {}) {
  const app = ref()
  const div = ref()

  const openNotify = ({ type, icon, title, message, defaultSlot }: { type?: notifyType; icon?: string; title?: string | (() => Component); message?: string | (() => Component); defaultSlot?: () => Component }) => {
    const notificationList = document.querySelector('#notificationList')
    if (notificationList) {
      div.value = document.createElement('div')
      notificationList.appendChild(div.value)
      app.value = createApp(h(BaseNotify, {
        type,
        icon,
        showClose,
        onClose: () => {
          app.value.unmount()
          div.value.remove()
          onClose && onClose()
        },
      }, {
        default: () => defaultSlot !== undefined ? defaultSlot() : null,
        title: () => {
          return title === undefined ? null : (typeof title === 'string' ? title : title())
        },
        message: () => {
          return message === undefined ? null : (typeof message === 'string' ? message : message())
        },
      }))
      app.value.mount(div.value)
    }
  }

  const closeNotify = () => {
    if (app.value && div.value) {
      app.value.unmount()
      div.value.remove()
      onClose && onClose()
    }
  }

  return {
    openNotify,
    closeNotify,
  }
}
