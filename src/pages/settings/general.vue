<script lang="ts" setup>
import type { notifyType } from '~/composables/useNotify'
import type { IUserInfo } from '~/apis/types'

interface INotifyData {
  type: notifyType
  title?: string
  message: string
}
interface ISocialData {
  [key: string]: boolean
}

const { t } = useI18n()
const route = useRoute()
const router = useLocalRouter()
const { openNotify } = useNotify()
const appStore = useAppStore()
const { userInfo } = storeToRefs(appStore)
const { updateUserInfo } = useAppStore()
const { isLessThanXs } = storeToRefs(useWindowStore())
const { AllLanguages, userLanguage } = storeToRefs(useLanguageStore())

usePageTitle({ prefix: t('set_general') })

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
  message: t('success_edit'),
})

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
    appStore.updateUserInfo()
  },
})

const areaCodeOptions = computed(() => {
  return areaCodeData.value?.map((item) => {
    return { label: `${item.attr} ${item.name}`, value: item.id }
  })
})

const phoneErrorMsg = computed(() => {
  if (!paramsData.value.phone)
    return ''
  return numberReg.test(paramsData.value.phone) ? '' : t('phone_invalid')
})

function numberSubmit() {
  runMemberUpdate({
    record: {
      phone: paramsData.value.phone,
      area_code: paramsData.value.area_code,
    },
    uid: paramsData.value.uid,
  })
  notifyData.value = {
    type: 'phone',
    title: t('success_update_phone'),
    message: `${t('phone_update_to')} +${paramsData.value.phone}`,
  }
  setPhoneDisabledBtnTrue()
}
function socialSubmit() {
  const { sex, ...rest } = paramsData.value
  runMemberUpdate({ record: { sex: sex.toString(), ...rest }, uid: paramsData.value.uid })
  notifyData.value = { type: 'success', message: t('success_edit') }
  setSocialDisabledBtnTrue()
}

/** 监听手机号码 */
watch(() => [
  paramsData.value.area_code,
  paramsData.value.phone,
], (newValue, oldValue) => {
  if (oldValue[0] && oldValue[1] && newValue[0] && newValue[1]
  && (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1])) {
    if (!phoneErrorMsg.value)
      setPhoneDisabledBtnFalse()
    else
      setPhoneDisabledBtnTrue()
  }
  else { setPhoneDisabledBtnTrue() }
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
    // email.value = newValue.email
    paramsData.value = {
      ...newValue.ext,
      area_code: newValue.ext.area_code === ''
      || newValue.ext.area_code === undefined
      || newValue.ext.area_code === null
        ? paramsData.value.area_code
        : newValue.ext.area_code,
    }
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
        openNotify({ type: 'email', title: t('success_verify'), message: t('congratulate_email_success') })
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

watch(userLanguage, (val) => {
  paramsData.value.area_code = AllLanguages.value.filter(a => a.value === val)[0].phoneId
}, { immediate: true })

onMounted(() => {
  if (userInfo.value?.ext) {
    paramsData.value = {
      ...userInfo.value.ext,
      area_code: userInfo.value.ext.area_code === ''
      || userInfo.value.ext.area_code === undefined
      || userInfo.value.ext.area_code === null
        ? paramsData.value.area_code
        : userInfo.value.ext.area_code,
    }
    setTimeout(() => {
      setSocialDisabledBtnTrue()
    }, 0)
  }
})
</script>

<template>
  <div v-if="paramsData" class="tg-settings-general">
    <AppEmailVerify />
    <!-- <AppSettingsContentItem
      :title="t('email_address')"
      :verified="emailVerified || emailDisabledBtn"
      :badge="emailVerified"
      @submit="emailSubmit"
    >
      <div style="margin-top: 16px;">
        <BaseLabel :label="t('email_address')" must-small>
          <div v-if="emailVerified" class="email-erified-box cursor-pointer">
            {{ email }}
          </div>
          <BaseInput
            v-else
            v-model="email"
            :disabled="emailVerified"
            :msg="emailErrormsg"
            :msg-after-touched="msgAfterTouched"
            style="--tg-base-input-style-pad-left: 0.5em"
            @blur="setMsgAfterTouchedFalse"
            @focus="setMsgAfterTouchedTrue"
            @paste="emailPaste"
          />
        </BaseLabel>
      </div>
      <template #btm-left>
        <div v-if="email?.includes('@gmail.com')">
          <BaseButton bg-style="primary" @click="goGmail">
            <div class="open-gmail">
              打开 Gmail <BaseIcon name="uni-jump-page" />
            </div>
          </BaseButton>
        </div>
      </template>
      <template #btm-right>
        <BaseButton
          type="text"
          :disabled="emailVerified"
          :loading="loadingEmailCheckRequest"
          size="none"
          @click="emailCheck"
        >
          <span :class="{ 'not-verified-span': !emailVerified }">
            {{ t('resend_email') }}
          </span>
        </BaseButton>
      </template>
    </AppSettingsContentItem> -->
    <AppSettingsContentItem
      :title="t('phone')"
      :verified="phoneDisabledBtn"
      :btn-text="t('submit')"
      @submit="numberSubmit"
    >
      <template #top-desc>
        {{ t('tip_phone') }}
      </template>
      <BaseLabel :label="t('intl_phone_pre')" must-small>
        <BaseSelect
          v-model="paramsData.area_code"
          :options="areaCodeOptions || []"
          style="--tg-base-select-style-padding-x: var(--tg-spacing-6);
          --tg-base-select-style-padding-y: var(--tg-spacing-7);
          --tg-base-select-style-color: var(--tg-text-white)"
        />
      </BaseLabel>
      <BaseLabel :label="t('phone')" must-small>
        <BaseInput
          v-model="paramsData.phone"
          style="--tg-base-input-style-pad-x: var(--tg-spacing-6);"
          type="text" :msg="phoneErrorMsg"
        />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem
      :title="t('social_account')"
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
</route>
