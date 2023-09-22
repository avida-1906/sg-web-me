<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  type: 'login',
})

const { t } = useI18n()

interface Props {
  type?: string
}
const closeDialog = inject('closeDialog', () => {})

const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()

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
</script>

<template>
  <div class="app-bottom">
    <div class="app-bottom-divider">
      <BaseDivider title-placement="center">
        {{ t('or_use') }}
      </BaseDivider>
    </div>
    <div class="app-bottom-icon">
      <BaseButton class="item-svg">
        <BaseIcon name="facebook" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="google" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="line" />
      </BaseButton>
      <BaseButton class="item-svg">
        <BaseIcon name="messenger" />
      </BaseButton>
    </div>
    <div class="app-bottom-text">
      <div v-if="props.type === 'login'" class="text-white">
        {{ t('forgot_password') }}
      </div>

      <div v-if="props.type === 'login'" class="user-text" @click.stop="toRegister()">
        {{ t('no_account_yet') }}<span class="text-white">{{ t('register_account') }}</span>
      </div>
      <div v-else @click.stop="toLogin()">
        {{ t('have_account') }}<span class="text-white">{{ t('login') }}</span>
      </div>

      <div class="stake-text">
        {{ t('stake_hCaptcha') }} <span>{{ t('privacy_policy') }}</span> {{ t('and') }} <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  &-divider {
    width: 60%;
    margin: 0 auto;
    padding-top: var(--tg-spacing-button-padding-vertical-xs);
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--tg-spacing-5);
    .item-svg {
      width: 70px;
      height: 40px;
      cursor: pointer;
      flex-shrink: 0;
      border-radius: var(--tg-radius-default);
      display: flex;
      justify-content: center;
      align-items: center;
      background:var(--tg-secondary-main);
      font-size: var(--tg-font-size-default);
      // -tg-icon-color: var(--tg-text-lightgrey);
    }
  }
  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-12);
    .text-white {
      color: var(--tg-text-white) !important;
    }
    .stake-text {
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-spacing-20);
    }
  }
}
</style>
