<script setup lang='ts'>
interface Props {
  showMore?: boolean
}

defineProps<Props>()

const closeDialog = inject('closeDialog', () => { })

const { t } = useI18n()
const { push } = useLocalRouter()

// 获取安全验证配置
const { isOpenVerify, isSetAuth } = useBrandBaseDetail()
const { isEmailVerify } = useUserVerify()
</script>

<template>
  <div v-if="isEmailVerify && isOpenVerify && !isSetAuth" class="safe-bottom" :style="{ 'padding-bottom': showMore ? '0' : '16px' }">
    <div>
      {{ t('improve_safe_level') }}
    </div>
    <BaseButton
      bg-style="primary" size="md"
      @click="push('/settings/security-safe-check'); closeDialog()"
    >
      {{ t('turn_on_double_check') }}
    </BaseButton>
  </div>
  <div v-if="showMore" class="center show-more">
    <BaseButton
      size="none" type="text" style="margin-top: var(--tg-spacing-4);"
      @click="push('/blog/vault-description'); closeDialog()"
    >
      {{ t('vault_info') }}
    </BaseButton>
  </div>
</template>

<style lang='scss' scoped>
  .safe-bottom {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #0f212e;
    padding: 20px 16px;
    gap: var(--tg-spacing-14);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
  }
  .show-more{
    background-color: #0f212e;
    padding: 20px 16px;
  }
</style>
