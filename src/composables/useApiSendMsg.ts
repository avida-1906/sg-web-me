/**
 * 发送消息 test
 * @description 用于发送消息[短信，邮件]
 */
export function useApiSendMsg(type: 'sms' | 'email') {
  const sid = ref('')
  const ts = ref('')

  const { run, loading } = useRequest(() => ApiSmsSend({
    tel: '123456789',
    flag: 'text',
    ty: type === 'sms' ? 1 : 2,
  }), {
    onSuccess(res) {
      const [_sid, _ts] = res.data.split('|')
      sid.value = _sid
      ts.value = _ts
    },
  })

  return {
    run,
    loading,
    sid,
    ts,
  }
}
