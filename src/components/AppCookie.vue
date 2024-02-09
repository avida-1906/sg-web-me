<script setup lang='ts'>
const { VITE_ACCEPT_COOKIE_KEY } = getEnv()
const { isMobile } = storeToRefs(useWindowStore())
const { t } = useI18n()
const { set, get } = useCookies()
const { push } = useLocalRouter()
function accept() {
  set(VITE_ACCEPT_COOKIE_KEY, '1', { expires: new Date(dayjs().add(1, 'year')) })
}
</script>

<template>
  <div
    v-if="!get(VITE_ACCEPT_COOKIE_KEY)"
    class="app-cookie" :class="{ 'is-h5': isMobile }"
  >
    <div class="wrap">
      <p>
        <BaseButton type="text" size="none" @click="push('/policies/cookies')">
          <span class="btn">🍪 {{ t('we_use_cookie') }}</span>
        </BaseButton>
        {{ t('cookie_purposes') }}
      </p>
      <BaseButton size="sm" bg-style="primary" @click="accept">
        {{ t('accept') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-cookie {
  position: fixed;
  color: var(--tg-text-grey-light);
  width: max-content;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  background-color: var(--tg-secondary-main);
  border-radius: var(--tg-radius-default);
  padding: var(--tg-spacing-12) var(--tg-spacing-16);
  margin: var(--tg-spacing-16) 0;
  box-shadow: var(--tg-header-shadow);
  max-width: calc(100% - 2em);
  z-index: var(--tg-z-index-secondary);
  .wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--tg-spacing-16);
    line-height: 1.5;
    p{
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      .btn{
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-semibold);
      }
    }
  }
  &.is-h5{
    bottom: var(--tg-spacing-60);
    .wrap{
      flex-direction: column;
      align-items: normal;
    }
  }
}
</style>
