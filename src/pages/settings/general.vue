<script lang="ts" setup>
import type { IMemberDetail } from '~/apis'

const { openNotify } = useNotify()

const areaCodeValue = ref('')
const paramsData = ref<IMemberDetail>({
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
  email_check_state: 2,
  sex: 1,
})
const socialData = [
  { label: 'Facebook', img: '/img/settings/social-facebook.png', index: 'facebook' },
  { label: 'WhatsApp', img: '/img/settings/social-whatsapp.png', index: 'whatsapp' },
  { label: 'Telegram', img: '/img/settings/social-telegram.png', index: 'telegram' },
  { label: 'Line', img: '/img/settings/social-line.png', index: 'line' },
  { label: 'X', img: '/img/settings/social-x.png', index: 'twitter' },
  { label: 'Zalo', img: '/img/settings/social-zalo.png', index: 'zalo' },
  { label: 'Viber', img: '/img/settings/social-viber.png', index: 'viber' },
  { label: 'WeChat', img: '/img/settings/social-wechat.png', index: 'wechat' },
  { label: 'QQ', img: '/img/settings/social-qq.png', index: 'qq' },
]
const { bool: disabledBtn, setTrue: setDisabledBtnTrue, setFalse: setDisabledBtnFalse } = useBoolean(false)

const { data: areaCodeData } = useApiMemberTreeList('011')
const { run: runMemberUpdate } = useRequest(ApiMemberUpdate, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '修改成功',
    })
  },
})
const { runAsync: runAsyncDetail } = useRequest(ApiMemberDetail, {
  onSuccess(data) {
    paramsData.value = data
  },
})

const areaCodeOptions = computed(() => {
  return areaCodeData.value?.map((item) => {
    const temp = {
      label: item.name,
      value: item.id,
    }
    return temp
  })
})
const emailVerified = computed(() => paramsData.value.email_check_state === 1)

const emailSubmit = function () {
  runMemberUpdate(paramsData.value)
}
const numberSubmit = function () {
  runMemberUpdate(paramsData.value)
}
const socialSubmit = function () {
  runMemberUpdate(paramsData.value)
}

watch(() => paramsData.value.phone, (newValue, oldValue) => {
  console.log(oldValue)
  if (!oldValue)
    setDisabledBtnTrue()
  else if (newValue !== oldValue)
    setDisabledBtnFalse()
})

await application.allSettled([runAsyncDetail()])
</script>

<template>
  <div class="tg-settings-general">
    <AppSettingsContentItem title="电邮地址" :verified="emailVerified" @submit="emailSubmit">
      <BaseLabel label="用户名" must-small>
        <BaseInput v-model="paramsData.email" placeholder="请绑定邮箱" :disabled="emailVerified" :class="{ 'general-base-input-background': emailVerified }" />
      </BaseLabel>
      <template #btm-right>
        <BaseButton type="text" :disabled="emailVerified">
          重新发送电邮
        </BaseButton>
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="手机号码" :verified="disabledBtn" @submit="numberSubmit">
      <template #top-desc>
        我们只服务国际电话区号列表中所列有的区域。
      </template>
      <BaseLabel label="国际电话区号" must-small>
        <BaseSelect v-model="areaCodeValue" :options="areaCodeOptions || []" class="general-base-select" />
      </BaseLabel>
      <BaseLabel label="手机号码" must-small>
        <BaseInput v-model="paramsData.phone" placeholder="请绑定手机号码" />
      </BaseLabel>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="社交账号" last-one class="general-app-settings-content-item" @submit="socialSubmit">
      <div class="social-wrap">
        <div v-for="item, index in socialData" :key="index" class="social-item">
          <BaseImage :url="item.img" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData[item.index as keyof typeof paramsData]" :label="item.label" />
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
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 设置常规 – Stake.com
</route>
