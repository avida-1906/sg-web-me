<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  type: 'login',
})

const { t } = useI18n()

interface Props {
  type?: string
}
</script>

<template>
  <div class="app-bottom">
    <!-- <BaseDivider title-placement="center">
      {{ t('or_use') }}
    </BaseDivider>
    <div class="app-bottom-icon">
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
      <BaseIcon font-size="58" name="navbar-user-bet" />
    </div> -->
    <div class="app-bottom-text">
      <div class="text-white">
        {{ t('forgot_password') }}
      </div>

      <div v-if="props.type === 'login'" class="user-text">
        {{ t('no_account_yet') }}<span class="text-white">{{ t('register_account') }}</span>
      </div>
      <div v-else class="user-text">
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
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    .text-white {
      color: var(--tg-text-white) !important;
    }
    .user-text {
      margin: var(--tg-spacing-12) 0;
    }
    .stake-text {
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-font-size-lg);
    }
  }
}
</style>
