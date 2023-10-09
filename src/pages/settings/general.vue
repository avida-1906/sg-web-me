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

await application.allSettled([runAsyncDetail()])
</script>

<template>
  <div class="tg-settings-general">
    <AppSettingsContentItem title="电邮地址" :verified="emailVerified" @submit="emailSubmit">
      <BaseLabel label="用户名" must-small>
        <BaseInput v-model="paramsData.email" placeholder="请绑定邮箱" />
      </BaseLabel>
      <template #btm-right>
        <BaseButton type="text" :disabled="emailVerified">
          重新发送电邮
        </BaseButton>
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="手机号码" @submit="numberSubmit">
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
        <div class="social-item">
          <BaseImage url="/img/settings/social-facebook.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.facebook" label="Facebook" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-whatsapp.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.whatsapp" label="WhatsApp" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-telegram.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.telegram" label="Telegram" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-line.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.line" label="Line" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-x.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.twitter" label="X" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-zalo.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.zalo" label="Zalo" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-viber.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.viber" label="Viber" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-wechat.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.wechat" label="WeChat" />
        </div>
        <div class="social-item">
          <BaseImage url="/img/settings/social-qq.png" width="50px" height="50px" class="general-base-image" />
          <BaseInput v-model="paramsData.qq" label="QQ" />
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
