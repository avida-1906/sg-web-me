<script lang="ts" setup>
const radioList = [
  { label: '123,456.78', value: 1 },
  { label: '١٢٣٤٥٦٫٧٨', value: 2 },
  { label: '123.456,78', value: 3 },
]

usePageTitle({ prefix: 'menu_title_settings_preferences', isT: true })
const { companyData, currentGlobalCurrency } = storeToRefs(useAppStore())

const { bool: isStealth } = useBoolean(false)
const { bool: hideStatistics } = useBoolean(true)
const { bool: hideContest } = useBoolean(false)
const { bool: isRed } = useBoolean(false)
const { bool: isMarketing } = useBoolean(true)

const numFormat = ref(radioList[0].value)
</script>

<template>
  <div class="tg-settings-preferences">
    <AppSettingsContentItem
      :title="$t('privacy')"
      :depends-disabled="[isStealth, hideStatistics, hideContest]"
    >
      <template #top-desc>
        {{ $t('preferences_tip_1', { site: companyData?.name }) }}
      </template>
      <div class="switch-item">
        <BaseSwitch v-model="isStealth" class="switch" />
        <div class="right">
          <p>{{ $t('turn_on_hide_mode') }}</p>
          <p>{{ $t('preferences_tip_2') }}</p>
        </div>
      </div>
      <div class="switch-item">
        <BaseSwitch v-model="hideStatistics" class="switch" />
        <div class="right">
          <p>{{ $t('hide_all_statistic') }}</p>
          <p>{{ $t('preferences_tip_3') }}</p>
        </div>
      </div>
      <div class="switch-item">
        <BaseSwitch v-model="hideContest" class="switch" />
        <div class="right">
          <p>{{ $t('hide_all_competition_record') }}</p>
          <p>{{ $t('preferences_tip_4') }}</p>
        </div>
      </div>
      <template #btm-left>
        {{ $t('preferences_tip_5') }}
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem :title="$t('community')" :depends-disabled="[isRed]">
      <div class="switch-item">
        <BaseSwitch v-model="isRed" class="switch" />
        <div class="right">
          <p>{{ $t('refuse_rain') }}</p>
          <p>{{ $t('preferences_tip_6') }}</p>
        </div>
      </div>
      <template #btm-left>
        {{ $t('preferences_tip_5') }}
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem :title="$t('marketing')" :depends-disabled="[isMarketing]">
      <div class="switch-item">
        <BaseSwitch v-model="isMarketing" class="switch" />
        <div class="right">
          <p>{{ $t('receive_market_email') }}</p>
          <p>{{ $t('preferences_tip_7') }}</p>
        </div>
      </div>
    </AppSettingsContentItem>
    <AppSettingsContentItem :title="$t('official_number')" last-one btn-text="submit">
      <template #top-desc>
        <div v-if="currentGlobalCurrency === 'INR'" class="tip">
          {{ $t('official_num_tip', { currencyName: 'INR' }) }}
        </div>
      </template>
      <div>
        <BaseRadioGroup v-model="numFormat">
          <div class="official-num">
            <BaseRadio v-for="item in radioList" :key="item.value" :value="item.value">
              <span class="bold">{{ item.label }}</span>
            </BaseRadio>
          </div>
        </BaseRadioGroup>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.bold {
  font-weight: var(--tg-font-weight-semibold);
}
.tip {
  color: var(--tg-text-warn-sub);
}
.official-num {
  display: flex;
  gap: var(--tg-spacing-16);
  flex-direction: column;
  --tg-base-radio-style-width: var(--tg-spacing-24);
  --tg-base-radio-style-dot-bg: var(--tg-text-grey-secondary);
}
.tg-settings-preferences {
  font-size: var(--tg-font-size-default);
  .switch-item{
    display: flex;
    justify-content: flex-start;
    .right {
      flex: 1;
    }
    .switch{
      margin-right: var(--tg-spacing-16);
      // #00b801
      --tg-base-switch-style-bg: var(--tg-text-green)
    }
    div{
      p:nth-child(1){
        line-height: 21px;
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
      }
      p:nth-child(2){
        color: var(--tg-text-grey);
        margin-top: var(--tg-spacing-4);
      }
    }
  }
}
</style>

<route lang="yaml">
</route>
