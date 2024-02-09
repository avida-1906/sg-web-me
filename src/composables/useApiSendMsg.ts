interface IApiSmsSendParams {
  key?: string
  tel?: string
  email?: string
  countdown?: number
}

/**
 * 发送消息 test
 * @description 用于发送消息[短信，邮件]
 * @param type 消息类型
 * @param option 选项
 */
export function useApiSendMsg(type: 'sms' | 'email', option: IApiSmsSendParams) {
  const sid = ref('')
  const ts = ref('')
  const countdown = ref(option.countdown || 60)

  let timer: NodeJS.Timeout | null = null

  /** 开始倒计时 */
  const startCountdown = () => {
    timer = setInterval(() => {
      countdown.value -= 1
      if (countdown.value === 0 && timer)
        clearInterval(timer)
    }, 1000)
  }

  /** 暂停倒计时 */
  const stopCountdown = () => {
    if (timer) {
      countdown.value = 0
      clearInterval(timer)
      timer = null
    }
  }

  /** 重置倒计时 */
  const resetCountdown = () => {
    countdown.value = option.countdown || 60
  }

  const { run, loading } = useRequest(() => ApiSmsSend({
    tel: '123456789',
    flag: 'text',
    ty: type === 'sms' ? 1 : 2,
  }), {
    manual: true,
    onSuccess(res) {
      const [_sid, _ts] = res.data.split('|')
      sid.value = _sid
      ts.value = _ts

      startCountdown()
    },
  })

  watch(countdown, (val) => {
    if (val > 0) {
      Session.set(`countdown-key-${option.key}`, val)
    }
    else {
      stopCountdown()
      Session.remove(`countdown-key-${option.key}`)
    }
  })

  return {
    run,
    loading,
    sid,
    ts,
    countdown,
  }
}
