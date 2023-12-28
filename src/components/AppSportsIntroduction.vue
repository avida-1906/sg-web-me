<script setup lang='ts'>
const { t } = useI18n()
const { isLogin, companyData } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const location = useBrowserLocation()
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)

const btnText = computed(() => showMore.value ? t('view_less') : t('view_more_2'))

const hostSite = computed(() => (
  {
    host: location.value.hostname?.replace('www.', '').toUpperCase(),
    site: companyData.value?.name.toUpperCase(),
  }
))

const onShowMore = function () {
  toggleShowMore()
}
</script>

<template>
  <!-- 公司介绍 -->
  <div v-if="!isLogin" class="index-introduction" :class="{ 'max-height': showMore }">
    <div class="introduction-content" :class="[isMobile ? 'h5-mobile' : 'column-count']">
      <h2>{{ t('sport_new_intro_1', hostSite) }}</h2>
      <div class="p">
        {{ t('sport_new_intro_2', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_3', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_4', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_5', hostSite) }}
      </div>
      <h2>{{ t('sport_new_intro_6') }}</h2>
      <div class="p">
        {{ t('sport_new_intro_7', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_8') }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_9') }}
      </div>
      <ul>
        <li>
          {{ t('sport_new_intro_10') }}
        </li>
        <li>
          {{ t('sport_new_intro_11') }}
        </li>
        <li>
          {{ t('sport_new_intro_12') }}
        </li>
        <li>
          {{ t('sport_new_intro_13') }}
        </li>
        <li>{{ t('sport_new_intro_14') }}</li>
        <li>{{ t('sport_new_intro_15') }}</li>
        <li>
          {{ t('sport_new_intro_16') }}
        </li>
        <li>{{ t('sport_new_intro_17') }}</li>
      </ul>
      <div class="p">
        {{ t('sport_new_intro_18') }}
      </div>
      <h2>{{ t('sport_new_intro_19', hostSite) }}</h2>
      <div class="p">
        {{ t('sport_new_intro_20', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_21', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_22', hostSite) }}
      </div>
      <h2>{{ t('sport_new_intro_23', hostSite) }}</h2>
      <div class="p">
        {{ t('sport_new_intro_24') }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_25') }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_26', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_27', hostSite) }}
      </div>
      <div class="p">
        {{ t('sport_new_intro_28', hostSite) }}
      </div>
    </div>
    <div class="introduction-more">
      <BaseButton size="none" @click="onShowMore">
        {{ btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.index-introduction {
  margin-bottom: var(--tg-spacing-32);
  background: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  width: 100%;
  color: var(--tg-text-lightgrey);
  position: relative;
  max-height: 250px;
  overflow: hidden;
  border-radius: var(--tg-radius-md);

  &.max-height {
    max-height: 100%;

    .introduction-content::before {
      visibility: hidden;
    }

    .introduction-more {
      position: static;
      width: 100%;
      display: flex;
      justify-content: center;

      :deep(button.default.none) {
        padding: 13px 16px;
      }

      --tg-base-button-padding-x: 16px;
      --tg-base-button-padding-y: 13px;
    }
  }

  .introduction-content {
    column-gap: 1.5rem;

    &.column-count {
      column-count: 2;
    }

    &::before {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg,
          var(--tg-secondary-dark) 0%, rgba(15, 33, 46, 0) 100%);
    }
  }

  .h5-mobile {
    column-count: 1;

    h2 {
      font-size: var(--tg-font-size-lg);
    }
  }

  .introduction-more {
    position: absolute;
    z-index: 2;
    bottom: var(--tg-spacing-24);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    margin-top: var(--tg-spacing-16);

    :deep(button.default.none) {
      padding: 13px 16px;
    }

    --tg-base-button-padding-x: 16px;
    --tg-base-button-padding-y: 13px;
  }

  h2 {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-lg);
    margin-bottom: var(--tg-spacing-8);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 1.3;
  }

  h3 {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-base);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .p {
    margin-bottom: var(--tg-spacing-20);
    line-height: 24px;
  }

  a {
    font-weight: var(--tg-font-weight-semibold);

    &:hover {
      color: var(--tg-text-white);
    }
  }

  ul {
    list-style-type: disc;
    padding-left: var(--tg-spacing-32);
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 24px;

    .p {
      margin: 0;
    }

    li {
      margin: var(--tg-spacing-4) 0;
    }
  }
}
@media only screen and (min-width:1280px) {
  .index-introduction{
    h2{
      font-size: var(--tg-font-size-xl);
    }
  }
}
</style>
