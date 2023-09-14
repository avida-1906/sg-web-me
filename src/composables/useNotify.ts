import BaseNotify from '~/components/BaseNotify.vue'

export type notifyType = 'set' | 'user' | 'email' | 'error' | 'success' | 'insurance' | 'statistics'

export function useNotify({ showClose, onClose }: { onClose?: () => void; showClose?: boolean } = {}) {
  const app = ref<any>({})
  const box = ref<any>({})
  const notificationList = document.querySelector('#notificationList')

  const closeNotify = (uuid: string) => {
    if (app.value[uuid] && box.value[uuid]) {
      const notify = app.value[uuid]
      notify.unmount()
      const div = box.value[uuid]
      div.remove()
      delete app.value[uuid]
      delete box.value[uuid]
      onClose && onClose()
    }
  }

  const openNotify = ({ type, icon, title, message, default: defaultSlot }: { type?: notifyType; icon?: string; title?: string | (() => Component); message?: string | (() => Component); default?: () => Component }) => {
    if (notificationList) {
      const uuid = getUuid()
      box.value[uuid] = document.createElement('div')
      notificationList.appendChild(box.value[uuid])
      app.value[uuid] = (createApp(h(BaseNotify, {
        title: typeof title === 'string' ? title : undefined,
        message: typeof message === 'string' ? message : undefined,
        type,
        icon,
        showClose,
        funcCall: uuid,
        onClose: (uuid: string) => {
          closeNotify(uuid)
        },
      }, {
        default: () => defaultSlot !== undefined ? defaultSlot() : null,
        title: () => {
          return title === undefined ? null : (typeof title === 'string' ? null : title())
        },
        message: () => {
          return message === undefined ? null : (typeof message === 'string' ? null : message())
        },
      })))
      app.value[uuid].mount(box.value[uuid])
    }
  }

  return {
    openNotify,
    closeNotify,
  }
}
