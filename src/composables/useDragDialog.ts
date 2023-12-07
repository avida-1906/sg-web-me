import { render } from 'vue'
import BaseDragDialog from '~/components/BaseDragDialog.vue'

interface Props {
  type: 'trend' | 'live'
  url: string
  dialogId: string
}

export function useDragDialog(props: Props) {
  const { isLogin } = storeToRefs(useAppStore())
  const { t } = useI18n()
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
