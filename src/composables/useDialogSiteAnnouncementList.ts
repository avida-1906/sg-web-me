import { uniq } from 'lodash'

export const useDialogSiteAnnouncementList = createGlobalState(() => {
  // 当前公告的id
  const currentNoticeId = ref('')
  // 所有隐藏‘今日不再提示’的id
  const hideNoMoreTipIds = ref<string[]>([])

  // 修改当前公告的id
  const setCurrentNoticeId = (id: string) => {
    currentNoticeId.value = id
  }

  // 选中不再显示时保存公告id
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

  // 取消选中不再显示时剔除公告id
  const removeCurrentNoticeId = () => {
    const arr = Local.get<string[]>(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'))?.value

    if (arr) {
      arr?.splice(arr.findIndex(a => a === currentNoticeId.value), 1)
      Local.set(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'), arr)
    }
  }

  // 清除前一天保存的id
  const clearYesterdayNoMoreList = () => {
    Local.remove(STORAGE_NO_MORE_TIP_DAY + dayjs().subtract(1, 'day').get('date'))
  }

  // 检查当前公告id是否已保存在不再显示列表中
  const checkIsNoMore = (id: string) => {
    const arr = Local.get<string[]>(STORAGE_NO_MORE_TIP_DAY + dayjs().get('date'))?.value

    if (arr)
      return arr.includes(id)

    return false
  }

  // 检查当前公告是否隐藏‘今日不再提示’
  const checkHideNoMoreTip = (id: string) => {
    return hideNoMoreTipIds.value.includes(id)
  }

  return {
    currentNoticeId,
    hideNoMoreTipIds,
    setCurrentNoticeId,
    saveCurrentNoticeId,
    removeCurrentNoticeId,
    clearYesterdayNoMoreList,
    checkIsNoMore,
    checkHideNoMoreTip,
  }
})
