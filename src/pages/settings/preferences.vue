<script lang="ts" setup>
usePageTitle({ prefix: 'menu_title_settings_preferences', isT: true })
const { VITE_SITE_NAME } = getEnv()

const { bool: isStealth } = useBoolean(false)
const { bool: hideStatistics } = useBoolean(true)
const { bool: hideContest } = useBoolean(false)
const { bool: isRed } = useBoolean(false)
const { bool: isMarketing } = useBoolean(true)
</script>

<template>
  <div class="tg-settings-preferences">
    <AppSettingsContentItem title="隐私">
      <template #top-desc>
        {{ $t('preferences_tip_1', { site: VITE_SITE_NAME }) }}
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
    <AppSettingsContentItem title="社区">
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
    <AppSettingsContentItem :title="$t('marketing')" last-one>
      <div class="switch-item">
        <BaseSwitch v-model="isMarketing" class="switch" />
        <div class="right">
          <p>{{ $t('receive_market_email') }}</p>
          <p>{{ $t('preferences_tip_7') }}</p>
        </div>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-preferences {
  font-size: var(--tg-font-size-default);
  .switch-item{
    display: flex;
    justify-content: start;
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
