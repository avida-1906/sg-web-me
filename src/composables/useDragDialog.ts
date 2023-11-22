import { render } from 'vue'
import { i18n } from '~/modules/i18n'
import BaseDragDialog from '~/components/BaseDragDialog.vue'

interface Props {
  type: 'trend' | 'live'
  url: string
  dialogId: string
}
const { t } = i18n.global

export function useDragDialog(props: Props) {
  const { isLogin } = storeToRefs(useAppStore())
  const { dragDialogListAdd, checkDragDialog, dragDialogListRemove } = useDragDialogList()

  const div = document.createElement('div')
  div.id = 'app-drag-dialog'

  if (!checkDragDialog(props.dialogId))
    dragDialogListAdd(props.dialogId)

  function removeDiv() {
    dragDialogListRemove(props.dialogId)
    div.remove()
  }

  const vNode = h(BaseDragDialog, {
    ...props,
    isLogin,
    t,
    onClose: () => {
      removeDiv()
    },
  })
  render(vNode, div)
  document.body.appendChild(div)
}
