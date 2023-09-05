import BaseNotify from '~/components/BaseNotify.vue'

export type notifyType = 'set' | 'user' | 'email' | 'error' | 'success' | 'insurance' | 'statistics'
export function showBaseNotify({ type, icon, title, message, defaultSlot, showClose, onClose }: { type?: notifyType; icon?: string; title?: string | (() => Component); message?: string | (() => Component); defaultSlot?: () => Component; onClose?: () => void; showClose?: boolean }) {
  const notificationList = document.querySelector('#notificationList')
  if (notificationList) {
    const div = document.createElement('div')
    notificationList.appendChild(div)
    const app = createApp(h(BaseNotify, {
      type,
      icon,
      showClose,
      onClose: () => {
        app.unmount()
        div.remove()
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
    app.mount(div)
  }
}
