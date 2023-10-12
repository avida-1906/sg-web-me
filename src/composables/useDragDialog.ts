import { render } from 'vue'
import BaseDragDialog from '~/components/BaseDragDialog.vue'

export function useDragDialog(props: { type: 'trend' | 'live'; url: string }) {
  const { isLogin } = storeToRefs(useAppStore())
  const div = document.createElement('div')
  div.id = 'app-drag-dialog'

  function close() {
    div.remove()
  }

  const vNode = h(BaseDragDialog, { ...props, close, isLogin })
  render(vNode, div)
  document.body.appendChild(div)
}
