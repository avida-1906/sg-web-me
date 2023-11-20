<script setup lang='ts'>
interface Props {
  onPage?: boolean
}
defineProps<Props>()

const { t } = useI18n()

const currentType = ref(0)
const typeOptions = [
  { label: t('sports_active'), value: 0 },
  { label: t('sports_settled'), value: 1 },
]
</script>

<template>
  <div class="sports-my-bets">
    <div v-if="onPage" class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-user-bet" />
        <h6>{{ t('my_bets') }}</h6>
      </div>
      <div class="right">
        <BaseSelect
          v-model="currentType"
          style="
          --tg-base-select-popper-style-padding-y:var(--tg-spacing-13);
          --tg-base-select-popper-style-padding-x:var(--tg-spacing-16)"
          :options="typeOptions" popper
        />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.sports-my-bets{

}
</style>
