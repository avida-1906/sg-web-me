/**
 * 更新数据定时器
 * @param callback
 * @param duration 单位/秒
 * @param immediate 立即调用接口默认true
 */
export function useSportsDataUpdate(
  callback: () => void,
  duration = 10,
  immediate = true,
) {
  let timer: any = null

  function startTimer() {
    if (timer)
      stopTimer()

    if (immediate)
      callback()

    timer = setInterval(() => callback(), duration * 1000)
  }

  function stopTimer() {
    clearInterval(timer)
    timer = null
  }

  return { startTimer, stopTimer }
}
