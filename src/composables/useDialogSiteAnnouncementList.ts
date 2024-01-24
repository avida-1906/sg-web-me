import { uniq } from 'lodash'

export const useDialogSiteAnnouncementList = createGlobalState(() => {
  const currentNoticeId = ref('')

  const setCurrentNoticeId = (id: string) => {
    currentNoticeId.value = id
  }
  console.log('123===>', dayjs().get('date'))
  console.log('234===>', dayjs().subtract(1, 'day').get('date'))

  const saveCurrentNoticeId = () => {
    const arr = Local.get<string[]>(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'))?.value

    if (arr) {
      arr.push(currentNoticeId.value)
      Local.set(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'), uniq(arr))
    }
    else {
      Local.set(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'), [currentNoticeId.value])
    }
  }

  const removeCurrentNoticeId = () => {
    const arr = Local.get<string[]>(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'))?.value

    if (arr) {
      arr?.splice(arr.findIndex(a => a === currentNoticeId.value), 1)
      Local.set(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'), arr)
    }
  }

  return {
    currentNoticeId,
    setCurrentNoticeId,
    saveCurrentNoticeId,
    removeCurrentNoticeId,
  }
})
