<script lang="ts" setup>
const { t } = useI18n()

const sortedOptions = [
  { label: t('finance_funds_transfer_sort_available'), value: '0' },
  { label: t('finance_funds_transfer_sort_commission'), value: '1' },
  { label: t('finance_funds_transfer_sort_withdrawn'), value: '2' },
]

const sortedBy = ref(sortedOptions[0].value)

// const columns = [
//   { title: t('finance_funds_transfer_sort_available'), dataIndex: 'available' },
//   { label: t('finance_funds_transfer_sort_commission'), dataIndex: 'commission' },
//   { label: t('finance_funds_transfer_sort_withdrawn'), dataIndex: 'withdrawn' },
// ]
</script>

<template>
  <div class="tg-affiliate-funds">
    <div class="layout-spacing">
      <div class="select-sort">
        <BaseSelect v-model="sortedBy" label="排序依据" :options="sortedOptions" />
      </div>
      <div class="table-data">
        <!-- <BaseTable :columns="columns" /> -->
      </div>
      <div class="footer-btn">
        <div>
          <BaseButton bg-style="secondary" size="lg" disabled>
            {{ t('finance_funds_transfer_commission_withdraw') }}
          </BaseButton>
        </div>
        <div>{{ t('finance_funds_transfer_commission_txt') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-btn {
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  line-height: 1.5;
  > div {
    margin-top: var(--tg-spacing-16);
    text-align: center;
    button {
      width: 300px;
      height: 52px;
      font-size: var(--tg-font-size-base);
    }
  }
}
.select-sort {
  display: flex;
  --tg-base-select-style-padding-x: var(--tg-spacing-7);
  --tg-base-select-style-padding-y: var(--tg-spacing-7);
  --tg-base-select-style-padding-right: var(--tg-spacing-28);
}
.tg-affiliate-funds {

}
</style>
