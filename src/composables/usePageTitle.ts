export function usePageTitle({ prefix = '', suffix = '', isT = false, isHost = true }:
{ prefix: string; suffix?: string; isT?: boolean; isHost?: boolean }) {
  const host = location.host

  const { t } = useI18n()

  const pre = computed(() => prefix && isT ? t(prefix) : prefix)
  const suf = computed(() => suffix && isT ? t(suffix) : suffix)
  const joint = computed(() => pre ? ' - ' : '')
  const title = computed(() => `${pre.value}${joint.value}${isHost ? host : ''} ${suf.value}`)

  useTitle(title)
}
