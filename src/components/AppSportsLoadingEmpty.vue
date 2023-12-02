<script setup lang='ts'>
defineProps<{
  loading?: boolean
  list: any[]
  settle?: number
}>()
const emit = defineEmits(['goLobby'])

const { t } = useI18n()
const router = useRouter()

function goToBet() {
  router.push(`/sports/${getSportsPlatId()}`)
  emit('goLobby')
}
</script>

<template>
  <div v-show="loading" class="wrapper">
    <BaseLoading />
  </div>
  <div v-if="!loading && (list.length === 0 || !list)" class="wrapper">
    <BaseEmpty>
      <template #icon>
        <BaseIcon
          style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-24);
                "
          name="uni-empty-betslip"
        />
      </template>
      <template #description>
        <span>{{ settle === 0 ? t('empty_unsettle_bet') : t('empty_settle_bet') }}</span>
      </template>
      <template #default>
        <BaseButton
          type="text"
          size="none"
          style=" --tg-base-button-text-default-color:var(--tg-text-white)"
          @click="goToBet"
        >
          {{ t('sports_betting_now') }}
        </BaseButton>
      </template>
    </BaseEmpty>
  </div>
</template>

<style lang='scss' scoped>
.wrapper{
  width: 100%;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
