<script setup lang='ts'>
// 1:FB, 2:Google, 3:Twitch, 4:Line
enum AuthTypes {
  'fb' = 1,
  'google' = 2,
  'twitch' = 3,
  'line' = 4,
}

type AuthTypesKeys = keyof typeof AuthTypes

const closeDialog = inject('closeDialog', () => { })

const { VITE_SOCKET_PREFIX } = getEnv()

const { t } = useI18n()
const { openNotify } = useNotify()
const appStore = useAppStore()
const { openThirdAuthFormDialog } = useDialogThirdAuthForm()
const refreshAuthBus = useEventBus(REFRESH_AUTH_BUS)

const ty = ref()
const state = ref(Math.random().toString(36).slice(-10))
const gWin = ref()

const topic = computed(() => `${VITE_SOCKET_PREFIX}/auth/${state.value}`)

const { run: runGetAuthUrl } = useRequest(ApiMemberThirdAuthUrl, {
  onSuccess: (data) => {
    setTimeout(() => {
      data && gWin.value?.location.replace(data)
    }, 0)
  },
})

function goAuth(type: AuthTypesKeys) {
  gWin.value = window.open('', '_blank', 'popup=yes,width=600,height=600')
  ty.value = AuthTypes[type]
  runGetAuthUrl({ state: state.value, type, device_number: application.getDeviceNumber() })
}
onMounted(() => {
  socketClient.addSubscribe(topic.value)
  refreshAuthBus.on((data: any) => {
    closeDialog()
    if (data) {
      if (data.action === 'register') {
        setTimeout(() => {
          openThirdAuthFormDialog({ data: data.extra_data, ty: ty.value })
        }, 0)
      }

      else if (data.action === 'success') {
        appStore.setToken(data.extra_data)
        // setTimeout(() => {
        //   location.reload()
        // }, 100)
      }

      else if (data.action === 'error') {
        openNotify({ type: 'error', message: data.extra_data })
      }
    }
    setTimeout(() => {
      gWin.value?.close()
    }, 1500)
  })
})

onUnmounted(() => {
  socketClient.removeSubscribe(topic.value)
})
</script>

<template>
  <div class="app-bottom">
    <div class="app-bottom-divider">
      <BaseDivider title-placement="center" spacing="8" size="1">
        <span>{{ t('or_use') }}</span>
      </BaseDivider>
    </div>
    <div class="app-bottom-icon">
      <BaseButton class="item-svg" size="sm" @click="goAuth('fb')">
        <BaseIcon name="facebook" />
      </BaseButton>
      <BaseButton class="item-svg" size="sm" @click="goAuth('google')">
        <BaseIcon name="google" />
      </BaseButton>
      <BaseButton class="item-svg" size="sm" @click="goAuth('line')">
        <BaseIcon name="line" />
      </BaseButton>
      <BaseButton class="item-svg" size="sm" @click="goAuth('twitch')">
        <BaseIcon name="messenger" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-bottom {
  font-size: var(--tg-font-size-default);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  // margin-top: -4px;
  &-divider {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    span{
      color: var(--tg-text-lightgrey);
      line-height: 1.5;
    }
  }
  &-icon {
    gap: var(--tg-spacing-8);

    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(50px,1fr));
    grid-auto-rows: auto;
    --tg-icon-color:var(--tg-text-white)

    .item-svg {
      border-radius: var(--tg-radius-default);
      display: flex;
      justify-content: center;
      align-items: center;
      background:var(--tg-secondary-main);
      font-size: var(--tg-font-size-default);
    }
  }
}
</style>
