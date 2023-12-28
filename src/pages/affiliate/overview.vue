<script lang="ts" setup>
usePageTitle({ prefix: 'affiliate_overview', isT: true })
const { companyData } = storeToRefs(useAppStore())
</script>

<template>
  <div class="tg-affiliate-overview">
    <video
      class="tg-affiliate-overview-video"
      autoplay="false" controls
      src="https://player.vimeo.com/video/531039335"
      poster="https://i.vimeocdn.com/video/1099128577-5eb60cef9d3a000730614dd90ba15bfc447f5f1fa9cabce1af812db291d7841f-d?mw=1100&mh=620&q=70"
    />
    <p>
      {{ $t('affiliate_overview_desc_1', { name: companyData?.name }) }}
    </p>
    <p>
      {{ $t('affiliate_overview_desc_2', { name: companyData?.name }) }}
    </p>

    <div class="tg-affiliate-overview-bottom">
      <AppCopyLine :label="$t('reco_link')" msg="xxx.com/?c=2b1494b2ca" />
      <BaseButton>
        <span>{{ $t('download_ad') }}</span>
        <BaseIcon name="uni-jump-page" />
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-affiliate-overview {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-14);
  &-video {
    max-width: 550px;
  }
  p {
    font-weight: 400;
    line-height: 1.5;
    // font-size: var(--tg-font-size-default);
    font-size: var(--tg-font-size-base);
    letter-spacing: 0;
  }
  .recommend-link {
    font-weight: var(--tg-font-weight-semibold);
    font-size: var(--tg-font-size-default);
  }
  &-bottom {
    width: 100%;
    max-width: 100%;
    display: grid;
    align-items: flex-end;
    justify-content: space-between;
    grid-template-rows: auto;
    grid-template-columns: .5fr auto;
    .link-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
      border-radius: var(--tg-radius-default);
      background-color: var(--tg-secondary-main);
      padding-left: var(--tg-spacing-12);
      input {
        background-color: var(--tg-secondary-main);
        font-weight: var(--tg-font-weight-semibold);
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-white);
        outline: 0;
        margin: 0;
        cursor: text;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        box-shadow: none;
      }
    }
    span {
      margin-right: var(--tg-spacing-12);
    }
  }
}
</style>

<route lang="yaml">
</route>
