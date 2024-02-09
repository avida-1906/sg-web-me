export function usePageTitle({ prefix = '', suffix = '', isT = false, isHost = true }:
{
  prefix: string | Ref | ComputedRef
  suffix?: string | Ref | ComputedRef
  isT?: boolean
  isHost?: boolean
}) {
  const host = location.host
  const npre = toRef(prefix)
  const nsuf = toRef(suffix)

  const { t } = useI18n()

  const pre = computed(() => npre.value && isT ? t(npre.value) : npre.value)
  const suf = computed(() => nsuf.value && isT ? t(nsuf.value) : nsuf.value)
  const joint = computed(() => pre ? ' - ' : '')
  const title = computed(() => `${pre.value}${joint.value}${isHost ? host : ''} ${suf.value}`)

  useTitle(title)

  return {
    title,
  }
}
