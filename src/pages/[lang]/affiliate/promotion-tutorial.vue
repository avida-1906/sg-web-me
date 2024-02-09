<script setup lang='ts'>
const { isMobile } = storeToRefs(useWindowStore())

const getUrl = computed(() => {
  return `/png/${isMobile.value
    ? 'h5'
: 'pc'}/tutorial/${getCurrentLanguageForBackend()}.png`
})
</script>

<template>
  <div class="promotion_tutorial">
    <div class="relation-chart">
      <BaseImage :url="getUrl" />
    </div>
    <div class="des">
      <div class="p">
        <div class="title">
          {{ $t('for_example') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          <div>{{ $t('promotion_tutorial_example_desc') }}</div>
        </div>
      </div>
      <div class="p">
        <div class="content">
          <div>{{ $t('promotion_tutorial_example_desc1') }}</div>
        </div>
      </div>
      <div class="p">
        <div class="content">
          <div>{{ $t('promotion_tutorial_example_desc2') }}</div>
        </div>
      </div>
      <div class="p">
        <div class="title">
          {{ $t('direct_team') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_example_desc3') }}
        </div>
        <div class="content">
          {{ $t('promotion_tutorial_direct_team_1') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_direct_team_2') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_direct_team_3') }}
        </div>
      </div>
      <div class="p">
        <div class="title">
          {{ $t('other_team') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_other_team_1') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_other_team_2') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_other_team_3') }}
        </div>
      </div>
      <div class="p">
        <div class="title">
          {{ $t('summary') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_summary_1') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_summary_2') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_summary_3') }}
        </div>
      </div>
      <div class="p">
        <div class="content">
          {{ $t('promotion_tutorial_summary_4') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.promotion_tutorial {
  position: relative;
  font-size: var(--tg-font-size-xs);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-white);
  line-height: 1.5;
}

.relation-chart {
  min-height: 400px;
  background: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
  // padding: var(--tg-spacing-12);
}

.des {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-20);
  background: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
  margin-top: var(--tg-spacing-10);
  padding: var(--tg-spacing-12);
  .p{
    .title {
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-lg);
    }
    .content{
      font-weight: var(--tg-font-weight-normal);
      color: var(--tg-text-lightgrey);
      font-size: var(--tg-font-size-base);
    }
  }
}
@media only screen and (min-width:1280px) {
  .des{
    .p{
      .title{
      font-size: var(--tg-font-size-xl);
    }
    }
  }
}
</style>
