/**
 * 更新数据定时器
 * @param callback
 * @param duration 单位/秒 默认120秒
 * @param immediate 立即调用接口默认 false
 */
export function useSportsDataUpdate(
  callback: () => void,
  duration = 120,
  immediate?: boolean,
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
