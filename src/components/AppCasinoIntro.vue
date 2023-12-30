<script lang="ts" setup>
/* eslint-disable max-len */
interface Props {
  hasMore?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const location = useBrowserLocation()
const { companyData } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { bool: showMore, toggle: toggleShowMore } = useBoolean(props.hasMore !== true)
const hostSite = computed(() => (
  { host: location.value.hostname?.replace('www.', '').toUpperCase(), site: companyData.value?.name.toUpperCase() }
))

const btnText = computed(() => showMore.value ? t('view_less') : t('view_more_2'))

const onShowMore = function () {
  toggleShowMore()
}
</script>

<template>
  <div class="app-introduction" :class="{ 'max-height': showMore }">
    <div class="introduction-content" :class="[isMobile ? 'h5-mobile' : 'column-count']">
      <h2>{{ t('casino_new_intro_1', { hostSite }) }}</h2>
      <div class="p">
        {{ t('casino_new_intro_2') }}
        <span class="white-txt">{{ hostSite.site }}</span>
        {{ t('casino_new_intro_3') }}
      </div>
      <h2>{{ t('casino_new_intro_4') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_5', hostSite) }}
      </div>
      <div class="p">
        {{ t('casino_new_intro_6', hostSite) }}
      </div>
      <h2>{{ t('casino_new_intro_7') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_8') }}{{ t('colon') }}<h3>{{ t('casino_new_intro_9') }}</h3>
      </div>
      <div class="p">
        <span class="bold-txt">{{ t('casino_new_intro_9') }}</span>
        {{ t('casino_new_intro_10', hostSite) }}
      </div>
      <h3>
        {{ t('casino_new_intro_11') }}
      </h3>
      <div class="p">
        {{ t('casino_new_intro_12') }}
      </div>
      <div class="p">
        {{ t('casino_new_intro_13') }}
      </div>
      <h3>{{ t('casino_new_intro_14') }}</h3>
      <div class="p">
        <span class="bold-txt">{{ t('casino_new_intro_14') }}</span>
        {{ t('casino_new_intro_15', hostSite) }}
      </div>
      <div class="p">
        {{ t('casino_new_intro_16', hostSite) }}
      </div>
      <h3>{{ t('casino_new_intro_17') }}</h3>
      <div class="p">
        <span class="bold-txt">{{ t('casino_new_intro_18') }}</span>
        {{ t('casino_new_intro_19', hostSite) }}
      </div>
      <h3>{{ t('casino_new_intro_20') }}</h3>
      <div class="p">
        <span class="bold-txt">{{ t('casino_new_intro_21') }}</span>
        {{ t('casino_new_intro_22', hostSite) }}
      </div>
      <div class="p">
        {{ t('casino_new_intro_23', hostSite) }}
      </div>
      <div class="p">
        {{ t('casino_new_intro_24', hostSite) }}
      </div>
      <h2>{{ t('casino_new_intro_25') }}</h2>
      <div class="p">
        <span class="bold-txt">{{ hostSite.site }} Original</span>
        {{ t('casino_new_intro_26', hostSite) }}
      </div>
      <ul>
        <li>
          <span class="bold-txt">Plinko</span>{{ t('colon') }}
          {{ t('casino_new_intro_27') }}
        </li>
        <li>
          <span class="bold-txt">{{ t('casino_new_intro_28') }}</span>{{ t('colon') }}
          {{ t('casino_new_intro_29', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">Limbo</span>{{ t('colon') }}
          {{ t('casino_new_intro_30', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">Mines</span>{{ t('colon') }}
          {{ t('casino_new_intro_31', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">Crash</span>{{ t('colon') }}
          {{ t('casino_new_intro_32', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">{{ t('casino_new_intro_33') }}</span>{{ t('colon') }}
          {{ t('casino_new_intro_34', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">Hilo</span>{{ t('colon') }}
          {{ t('casino_new_intro_35') }}
        </li>
        <li>
          <span class="bold-txt">{{ t('casino_new_intro_36') }}</span>{{ t('colon') }}
          {{ t('casino_new_intro_37') }}
        </li>
        <li>
          <span class="bold-txt">{{ t('casino_new_intro_38') }}</span>{{ t('colon') }}
          {{ t('casino_new_intro_39') }}
        </li>
        <li>
          <span class="bold-txt">{{ t('casino_new_intro_40') }}</span>{{ t('colon') }}
          {{ t('casino_new_intro_41', hostSite) }}
        </li>
        <li>
          <span class="bold-txt">Diamonds</span>{{ t('colon') }}
          {{ t('casino_new_intro_42', hostSite) }}
        </li>
      </ul>
      <h2>{{ t('casino_new_intro_43') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_44') }}{{ t('colon') }}
      </div>
      <ul>
        <li>{{ t('casino_new_intro_45') }}</li>
        <li>{{ t('casino_new_intro_46') }}</li>
        <li>
          {{ t('casino_new_intro_47', hostSite) }}
        </li>
        <li>{{ t('casino_new_intro_48') }}</li>
      </ul>
      <h2>{{ t('casino_new_intro_49') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_50', hostSite) }}
      </div>
      <h2>{{ t('casino_new_intro_51') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_52', hostSite) }}
      </div>
      <h2>{{ t('casino_new_intro_53') }}</h2>
      <div class="p">
        {{ t('casino_new_intro_54', hostSite) }}
      </div>
      <ul>
        <li>
          {{ t('casino_new_intro_55', hostSite) }}
        </li>
        <li>
          Play’n GO {{ t('de') }}
          Contact
        </li>
        <li>
          Play’n GO {{ t('de') }}
          Cash Pump
        </li>
        <li>
          Play’n GO
          {{ t('de') }}
          Agent Destiny
        </li>
        <li>
          Pragmatic Play
          {{ t('de') }}
          Sugar Twist
        </li>
        <li>
          Pragmatic Play {{ t('de') }}
          Zeus vs Hades Gods of War
        </li>
        <li>
          Hacksaw Gaming {{ t('de') }}
          Mayan Stackways
        </li>
      </ul>
    </div>
    <div v-if="hasMore" class="introduction-more">
      <BaseButton size="none" @click="onShowMore">
        {{ btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<style>
:root {
  --app-policies-terms-pc-column: 2;
}
</style>

<style lang="scss" scoped>
.white-txt {
  font-weight: 600;
  color: var(--tg-text-white);
}
.bold-txt {
  font-weight: 600;
}
.app-introduction {
  margin-bottom: var(--tg-spacing-32);
  background: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  width: 100%;
  color: var(--tg-text-lightgrey);
  position: relative;
  max-height: 250px;
  overflow: hidden;
  border-radius: 8px;

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
      column-count: var(--app-policies-terms-pc-column);
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
    font-size: 20px;
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
    h3 {
      display: inline-block;
    }
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
  .app-introduction {
    h2 {
      font-size: var(--tg-font-size-xl);
    }
  }
}
</style>
