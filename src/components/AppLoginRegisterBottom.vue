<script setup lang='ts'>
interface Props {
  type?: string
  showDesc?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'login',
  showDesc: true,
})
const closeDialog = inject('closeDialog', () => {})

const { companyData } = storeToRefs(useAppStore())
const { t } = useI18n()
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const { openForgetPasswordDialog } = useForgetPasswordDialog()

async function toRegister() {
  closeDialog()
  await nextTick()
  openRegisterDialog()
}
async function toLogin() {
  closeDialog()
  await nextTick()
  openLoginDialog()
}
async function toForgetPassword() {
  closeDialog()
  await nextTick()
  openForgetPasswordDialog()
}
</script>

<template>
  <div class="app-bottoms">
    <AppAuthLogin />
    <div class="app-bottoms-text">
      <div v-if="props.type === 'login'" class="text-white" @click="toForgetPassword">
        {{ t('forgot_password') }}
      </div>

      <div
        v-if="props.type === 'login'"
        class="user-text"
        @click.stop="toRegister()"
      >
        {{ t('no_account_yet') }}
        <span class="text-white">{{ t('register_account') }}</span>
      </div>
      <div v-else @click.stop="toLogin()">
        {{ t('have_account') }}<span class="text-white">{{ t('login') }}</span>
      </div>

      <div v-if="showDesc" class="stake-text">
        {{ t('stake_hCaptcha', { site: companyData?.name }) }}
        <span class="semibold" style="color: var(--tg-secondary-light);">
          {{ t('privacy_policy') }}
        </span> {{ t('and') }}
        <span class="semibold" style="color: var(--tg-secondary-light);">
          {{ t('terms_of_service') }}
        </span> {{ t('applicable') }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-bottoms {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding-top: var(--tg-spacing-16);
  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
    .text-white {
      cursor: pointer;
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }
    .stake-text {
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-spacing-20);
      cursor: pointer;
      span:hover {
        color: var(--tg-text-white);
      }
    }
  }
}
</style>
