import BaseNotify from '~/components/BaseNotify.vue'

export type notifyType = 'set' | 'user' | 'email' | 'error' | 'success' | 'insurance' | 'statistics'
export function showBaseNotify({ type, icon, title, message, onClose }: { type?: notifyType; icon?: string; title?: string; message?: string; onClose?: () => void }) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(BaseNotify, {
    type,
    icon,
    title,
    message,
    onClose: () => {
      app.unmount()
      div.remove()
      onClose && onClose()
    },
  })
  app.mount(div)
}
