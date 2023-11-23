/**
 * 更新数据定时器
 * @param callback
 * @param duration 单位/秒
 * @param immediate 立即调用接口默认
 */
export function useSportsDataUpdate(
  callback: () => void,
  duration = 30,
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
