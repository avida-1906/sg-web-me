<script lang="ts" setup>
import type { notifyType } from '~/composables/useNotify'
import type { IUserInfo } from '~/apis'

interface INotifyData {
  type: notifyType
  title?: string
  message: string
}
interface ISocialData {
  [key: string]: boolean
}

const route = useRoute()
const router = useRouter()
const { openNotify } = useNotify()
const { userInfo } = storeToRefs(useAppStore())
const { updateUserInfo } = useAppStore()
const { isLessThanXs } = storeToRefs(useWindowStore())

/** 社交账号改变 */
const socialDataChanged: ISocialData = {
  facebook: false,
  whatsapp: false,
  telegram: false,
  line: false,
  twitter: false,
  zalo: false,
  viber: false,
  wechat: false,
  qq: false,
}
const paramsData = ref<IUserInfo>({
  uid: '',
  phone: '',
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
  /** 性别 1=男，2=女 */
  sex: 1,
  cpf: '',
})
const socialData = [
  {
    label: 'Facebook',
    img: '/png/settings/social-facebook.png',
    index: 'facebook',
  },
  {
    label: 'WhatsApp',
    img: '/png/settings/social-whatsapp.png',
    index: 'whatsapp',
  },
  {
    label: 'Telegram',
    img: '/png/settings/social-telegram.png',
    index: 'telegram',
  },
  { label: 'Line', img: '/png/settings/social-line.png', index: 'line' },
  { label: 'X', img: '/png/settings/social-x.png', index: 'twitter' },
  { label: 'Zalo', img: '/png/settings/social-zalo.png', index: 'zalo' },
  { label: 'Viber', img: '/png/settings/social-viber.png', index: 'viber' },
  { label: 'WeChat', img: '/png/settings/social-wechat.png', index: 'wechat' },
  // { label: 'QQ', img: '/png/settings/social-qq.png', index: 'qq' },
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
const emailVerified = computed(() => userInfo.value?.email_check_state === 1)

const {
  value: email,
  errorMessage: emailErrormsg,
  validate: emailValidate,
} = useField<string>('email', (value) => {
  if (!emailReg.test(value))
    return '请填写正确的电邮地址'
  return ''
})

const emailSubmit = async function () {
  await emailValidate()
  if (!emailErrormsg.value) {
    runMemberUpdate({ record: { email: email.value }, uid: paramsData.value.uid })
    notifyData.value = {
      type: 'email',
      title: '成功更新电邮地址',
      message: `电邮地址已更新为 ${email.value}`,
    }
    setEmailDisabledBtnTrue()
  }
}
const numberSubmit = function () {
  runMemberUpdate({
    record: {
      phone: paramsData.value.phone,
      area_code: paramsData.value.area_code,
    },
    uid: paramsData.value.uid,
  })
  notifyData.value = {
    type: 'phone',
    title: '成功更新手机号码',
    message: `手机号码已更新为 +${paramsData.value.phone}`,
  }
  setPhoneDisabledBtnTrue()
}
const socialSubmit = function () {
  const { sex, ...rest } = paramsData.value
  runMemberUpdate({ record: { sex: sex.toString(), ...rest }, uid: paramsData.value.uid })
  notifyData.value = { type: 'success', message: '修改成功' }
  setSocialDisabledBtnTrue()
}
const emailCheck = function () {
  runEmailCheckRequest({ email: email.value })
  notifyData.value = {
    type: 'email',
    title: '邮电已发送',
    message: `验证邮电已发送至 +${email.value}`,
  }
}
const emailPaste = function () {
  setTimeout(() => {
    setEmailDisabledBtnFalse()
  }, 0)
}

/** 监听邮箱改变 */
watch(() => email.value, (newValue, oldValue) => {
  if (oldValue && newValue && newValue !== oldValue)
    setEmailDisabledBtnFalse()
  else
    setEmailDisabledBtnTrue()
})
/** 监听手机号码 */
watch(() => [
  paramsData.value.area_code,
  paramsData.value.phone,
], (newValue, oldValue) => {
  if (oldValue[0] && oldValue[1] && newValue[0] && newValue[1] && (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]))
    setPhoneDisabledBtnFalse()
  else
    setPhoneDisabledBtnTrue()
})
/** 监听社交账号改变 */
for (const k in paramsData.value) {
  if (
    ['facebook', 'telegram', 'line',
      'twitter', 'zalo', 'viber', 'wechat', 'qq', 'whatsapp'].includes(k)
  ) {
    const key = k as keyof typeof paramsData.value
    watch(() => paramsData.value[key], (newValue, oldValue) => {
      if (newValue === oldValue)
        socialDataChanged[k] = false
      else
        socialDataChanged[k] = true

      if (
        socialDataChanged.facebook
        || socialDataChanged.whatsapp
        || socialDataChanged.telegram
        || socialDataChanged.line
        || socialDataChanged.twitter
        || socialDataChanged.zalo
        || socialDataChanged.viber
        || socialDataChanged.wechat
        || socialDataChanged.qq
      )
        setSocialDisabledBtnFalse()
      else
        setSocialDisabledBtnTrue()
    })
  }
}
watch(() => userInfo.value, (newValue) => {
  if (newValue) {
    email.value = newValue.email
    paramsData.value = newValue.ext
    setTimeout(() => {
      setSocialDisabledBtnTrue()
    }, 0)
  }
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

onMounted(() => {
  if (userInfo.value?.ext) {
    paramsData.value = userInfo.value.ext
    email.value = userInfo.value?.email
    setTimeout(() => {
      setSocialDisabledBtnTrue()
    }, 0)
  }
})
</script>

<template>
  <div v-if="paramsData" class="tg-settings-general">
    <AppSettingsContentItem
      title="电邮地址"
      :verified="emailVerified || emailDisabledBtn" :badge="emailVerified"
      @submit="emailSubmit"
    >
      <div style="margin-top: 16px;">
        <BaseLabel label="电邮地址" must-small>
          <BaseInput
            v-model="email"
            :disabled="emailVerified"
            :msg="emailErrormsg"
            :class="{ 'general-base-input-background': emailVerified }"
            :style="
              {
                '--tg-base-input-style-background-color': emailVerified
                  ? 'var(--tg-secondary-main)' : '',
              }
            "
            msg-after-touched
            @paste="emailPaste"
          />
        </BaseLabel>
      </div>
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
          style="--tg-base-select-style-padding-x: var(--tg-spacing-6);
          --tg-base-select-style-padding-y: var(--tg-spacing-7);"
        />
      </BaseLabel>
      <BaseLabel label="手机号码" must-small>
        <BaseInput
          v-model="paramsData.phone"
          type="number"
        />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      title="社交账号"
      :verified="socialDisabledBtn"
      last-one
      style="--tg-app-settings-content-item-style-max-width: 100%;"
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
