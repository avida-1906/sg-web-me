<script lang="ts" setup>
import type { notifyType } from '~/composables/useNotify'

interface INotifyData {
  type: notifyType
  title?: string
  message: string
}

const route = useRoute()
const router = useRouter()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const { isLessThanXs } = storeToRefs(useWindowStore())

const paramsData = ref(userInfo.value || {
  uid: '',
  realname: '',
  phone: '',
  email: '',
  telegram: '',
  facebook: '',
  zalo: '',
  line: '',
  viber: '',
  whatsapp: '',
  twitter: '',
  wechat: '',
  qq: '',
  area_code: '',
  /** 邮箱是否验证 1=已验证，2=未验证 */
  email_check_state: 2,
  sex: 1,
  username: '',
  pay_password: '',
})
const dataChangeCount = ref(0)
const socialData = [
  {
    label: 'Facebook',
    img: '/img/settings/social-facebook.png',
    index: 'facebook',
  },
  {
    label: 'WhatsApp',
    img: '/img/settings/social-whatsapp.png',
    index: 'whatsapp',
  },
  {
    label: 'Telegram',
    img: '/img/settings/social-telegram.png',
    index: 'telegram',
  },
  { label: 'Line', img: '/img/settings/social-line.png', index: 'line' },
  { label: 'X', img: '/img/settings/social-x.png', index: 'twitter' },
  { label: 'Zalo', img: '/img/settings/social-zalo.png', index: 'zalo' },
  { label: 'Viber', img: '/img/settings/social-viber.png', index: 'viber' },
  { label: 'WeChat', img: '/img/settings/social-wechat.png', index: 'wechat' },
  { label: 'QQ', img: '/img/settings/social-qq.png', index: 'qq' },
]
const notifyData = ref<INotifyData>({
  type: 'success',
  title: '',
  message: '修改成功',
})

const {
  bool: emailDisabledBtn,
  setTrue: setEmailDisabledBtnTrue,
  setFalse: setEmailDisabledBtnFalse,
} = useBoolean(true)
const {
  bool: phoneDisabledBtn,
  setTrue: setPhoneDisabledBtnTrue,
  setFalse: setPhoneDisabledBtnFalse,
} = useBoolean(true)
const {
  bool: socialDisabledBtn,
  setTrue: setSocialDisabledBtnTrue,
  setFalse: setSocialDisabledBtnFalse,
} = useBoolean(true)
const { data: areaCodeData } = useApiMemberTreeList('011')
const { run: runMemberUpdate } = useRequest(ApiMemberUpdate, {
  onSuccess() {
    openNotify(notifyData.value)
  },
})
const {
  run: runEmailCheckRequest,
  loading: loadingEmailCheckRequest,
} = useRequest(ApiMemberEmailCheckRequest, {
  onSuccess() {
    openNotify(notifyData.value)
  },
})

const areaCodeOptions = computed(() => {
  return areaCodeData.value?.map((item) => {
    const temp = { label: item.name, value: item.id }
    return temp
  })
})
const emailVerified = computed(() => paramsData.value?.email_check_state === 1)

const emailSubmit = function () {
  runMemberUpdate(paramsData.value)
  notifyData.value = {
    type: 'email',
    title: '成功更新电邮地址',
    message: `电邮地址已更新为 ${paramsData.value.email}`,
  }
  setEmailDisabledBtnTrue()
}
const numberSubmit = function () {
  runMemberUpdate(paramsData.value)
  notifyData.value = {
    type: 'phone',
    title: '成功更新手机号码',
    message: `手机号码已更新为 +${paramsData.value.phone}`,
  }
  setPhoneDisabledBtnTrue()
}
const socialSubmit = function () {
  runMemberUpdate(paramsData.value)
  notifyData.value = { type: 'success', message: '修改成功' }
  setSocialDisabledBtnTrue()
}
const emailCheck = function () {
  runEmailCheckRequest({ email: paramsData.value.email })
  notifyData.value = {
    type: 'email',
    title: '邮电已发送',
    message: `验证邮电已发送至 +${paramsData.value.email}`,
  }
}

/** 无法监听对象新旧值，使用深度克隆解决 */
watch(() => cloneDeep(paramsData.value), (newValue, oldValue) => {
  if (dataChangeCount.value > 0) {
    if (newValue.email !== oldValue.email) {
      if (newValue.email === '')
        setEmailDisabledBtnTrue()
      else
        setEmailDisabledBtnFalse()
    }
    else if (newValue.phone !== oldValue.phone
      || newValue.area_code !== oldValue.area_code) {
      if (newValue.phone === '' || newValue.area_code === '')
        setPhoneDisabledBtnTrue()
      else
        setPhoneDisabledBtnFalse()
    }
    else {
      if (
        newValue.facebook === '' || newValue.whatsapp === ''
        || newValue.telegram === '' || newValue.line === ''
        || newValue.twitter === '' || newValue.zalo === ''
        || newValue.viber === '' || newValue.wechat === ''
        || newValue.qq === ''
      )
        setSocialDisabledBtnTrue()
      else
        setSocialDisabledBtnFalse()
    }
  }
  dataChangeCount.value++
}, { deep: true })
watch(() => userInfo.value, (newValue) => {
  if (newValue)
    paramsData.value = newValue
})
watch(() => route.query, (newValue) => {
  if (JSON.stringify(newValue) !== '{}'
    && newValue.email
    && newValue.uid && newValue.captcha) {
    const { run } = useRequest(ApiMemberEmailCheck, {
      async onSuccess() {
        openNotify({ type: 'email', title: '验证成功', message: '恭喜您电邮验证成功!' })
        await updateUserInfo()
      },
      onAfter() {
        setTimeout(() => {
          router.replace(route.path)
        }, 2000)
      },
    })
    if (
      typeof newValue.email === 'string'
      && typeof newValue.uid === 'string'
      && typeof newValue.captcha === 'string') {
      run({
        email: newValue.email,
        uid: newValue.uid,
        captcha: newValue.captcha,
      })
    }
  }
}, { immediate: true })
</script>

<template>
  <div v-if="paramsData" class="tg-settings-general">
    <AppSettingsContentItem
      title="电邮地址"
      :verified="emailVerified || emailDisabledBtn" :badge="emailVerified"
      @submit="emailSubmit"
    >
      <BaseLabel label="用户名" must-small>
        <BaseInput
          v-model="paramsData.email" placeholder="请绑定邮箱"
          :disabled="emailVerified"
          :class="{ 'general-base-input-background': emailVerified }"
        />
      </BaseLabel>
      <template #btm-right>
        <BaseButton
          type="text"
          :disabled="emailVerified"
          :loading="loadingEmailCheckRequest"
          @click="emailCheck"
        >
          重新发送电邮
        </BaseButton>
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      title="手机号码"
      :verified="phoneDisabledBtn"
      @submit="numberSubmit"
    >
      <template #top-desc>
        我们只服务国际电话区号列表中所列有的区域。
      </template>
      <BaseLabel label="国际电话区号" must-small>
        <BaseSelect
          v-model="paramsData.area_code"
          :options="areaCodeOptions || []"
          class="general-base-select"
        />
      </BaseLabel>
      <BaseLabel label="手机号码" must-small>
        <BaseInput v-model="paramsData.phone" placeholder="请绑定手机号码" />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      title="社交账号"
      :verified="socialDisabledBtn"
      last-one
      class="general-app-settings-content-item"
      @submit="socialSubmit"
    >
      <div class="social-wrap" :class="{ 'is-less-than-xs': isLessThanXs }">
        <div
          v-for="item, index in socialData"
          :key="index"
          class="social-item"
        >
          <BaseImage
            :url="item.img"
            width="50px"
            height="50px"
            class="general-base-image"
          />
          <BaseInput
            v-model="paramsData[item.index as keyof typeof paramsData]"
            :label="item.label"
          />
        </div>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-general {
  .general-base-select{
    --tg-base-select-style-padding-x: var(--tg-spacing-6);
    --tg-base-select-style-padding-y: var(--tg-spacing-7);
  }
  .general-app-settings-content-item{
    --tg-app-settings-content-item-style-max-width: 100%;
  }
  .general-base-input-background{
    --tg-base-input-style-background-color: var(--tg-secondary-main);
  }
  .general-base-image{
    width: 50px;
    height: 50px;
    --tg-base-img-style-radius: var(--tg-radius-md);
  }
  .social-wrap{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.25rem;
    .social-item{
      font-size: 50px;
      display: flex;
      align-items: center;
      gap: .75rem;
    }
    &.is-less-than-xs{
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 设置常规 – Stake.com
</route>
