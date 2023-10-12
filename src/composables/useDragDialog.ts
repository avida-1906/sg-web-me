import { render } from 'vue'
import BaseDragDialog from '~/components/BaseDragDialog.vue'

interface Props {
  type: 'trend' | 'live'
  url: string
  dialogId: string
}

export function useDragDialog(props: Props) {
  const { isLogin } = storeToRefs(useAppStore())

  const div = document.createElement('div')
  div.id = 'app-drag-dialog'

  function removeDiv() {
    div.remove()
  }

  const vNode = h(BaseDragDialog, {
    ...props,
    isLogin,
    onClose: () => {
      removeDiv()
    },
  })
  render(vNode, div)
  document.body.appendChild(div)
}
