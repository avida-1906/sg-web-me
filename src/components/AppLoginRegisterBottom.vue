<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  type: 'login',
})

const { t } = useI18n()

interface Props {
  type?: string
}
</script>

<template>
  <div class="app-bottom">
    <BaseDivider class="divider" title-placement="center">
      {{ t('or_use') }}
    </BaseDivider>
    <div class="app-bottom-icon">
      <div class="item-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16" fill="none">
          <g clip-path="url(#clip0_1031_6176)">
            <path d="M5.31915 8L5.31702 16H2.12766V8H0V5.243L2.12766 5.242L2.12447 3.618C2.12394 1.3685 2.77287 0 5.59149 0H7.9383V2.7575H6.47181C5.37447 2.7575 5.32128 3.1425 5.32128 3.862L5.31702 5.242H7.95479L7.64362 7.999L5.31915 8Z" fill="#D5DCEC" />
          </g>
          <defs>
            <clipPath id="clip0_1031_6176">
              <rect width="8" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="item-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clip-path="url(#clip0_1031_6181)">
            <path d="M11.1533 4.29147L13.4923 1.99315C12.0672 0.772275 10.2401 0.0180664 8.19385 0.0180664C5.01663 0.0180664 2.28565 1.80595 0.977773 4.41874L3.68464 6.45241C4.30776 4.58978 6.08464 3.25039 8.19385 3.25039C9.32618 3.25039 10.3493 3.645 11.1533 4.29147ZM3.6029 6.53322L0.897371 4.49955C0.353786 5.58539 0.0715019 6.78435 0.0732503 7.99988C0.0732503 9.2578 0.369398 10.4443 0.896031 11.4975L3.60022 9.46049C3.44254 8.98981 3.36198 8.49652 3.36169 7.99988C3.36169 7.48675 3.44879 6.9945 3.6029 6.53322ZM8.19385 15.9817C10.1543 15.9817 12.0263 15.2969 13.432 14.0127L10.8632 12.0585C10.1389 12.5076 9.22635 12.7494 8.19318 12.7494C6.0833 12.7494 4.30709 11.41 3.6833 9.54736L0.977773 11.581C2.28498 14.1938 5.01596 15.9817 8.19385 15.9817ZM12.5858 9.61605C12.3707 10.6571 11.7838 11.4571 10.9443 11.9777L13.5124 13.9319C14.9885 12.5837 15.9486 10.5756 15.9486 7.99988C15.9486 7.53322 15.8749 7.03019 15.7657 6.62615H8.28096V9.61605H12.5858Z" fill="#D5DCEC" />
          </g>
          <defs>
            <clipPath id="clip0_1031_6181">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="item-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
          <g clip-path="url(#clip0_1031_6186)">
            <path d="M12.4738 6.51605H13.7169C13.9566 6.52541 14.146 6.71867 14.146 6.9539C14.146 7.18912 13.9566 7.38238 13.7169 7.39174H12.4738V8.17299H13.7169C13.7228 8.17276 13.7287 8.17265 13.7347 8.17265C13.9811 8.17265 14.1809 8.36852 14.1809 8.61015C14.1809 8.85177 13.9811 9.04765 13.7347 9.04765C13.7287 9.04765 13.7228 9.04753 13.7169 9.0473H12.0268C11.7816 9.04578 11.5834 8.85088 11.5827 8.61049V5.2973C11.5827 5.05771 11.7824 4.8598 12.0289 4.8598H13.719C13.965 4.86037 14.1642 5.05608 14.1642 5.2973C14.1642 5.53892 13.9644 5.7348 13.7179 5.7348L13.7169 5.7348H12.4738V6.51605ZM10.9862 5.2973V8.61049C10.9851 8.85157 10.7852 9.0463 10.5393 9.04591C10.3973 9.04893 10.2626 8.9842 10.178 8.8723L8.44758 6.56883V8.61049C8.43141 8.83986 8.23691 9.01782 8.0024 9.01782C7.76788 9.01782 7.57338 8.83986 7.55721 8.61049V5.2973C7.55682 5.05736 7.75448 4.86233 7.99921 4.86119C8.13733 4.86119 8.26483 4.93341 8.34983 5.03758L10.0938 7.35008V5.2973C10.0938 5.05771 10.2935 4.8598 10.54 4.8598C10.7844 4.8598 10.9862 5.05771 10.9862 5.2973ZM6.91971 5.2973V8.61049C6.91854 8.8518 6.71889 9.04692 6.47275 9.0473C6.22756 9.04578 6.0294 8.85088 6.02863 8.61049V5.2973C6.02863 5.05771 6.22837 4.8598 6.47487 4.8598C6.71996 4.8598 6.91971 5.05771 6.91971 5.2973ZM5.60143 8.61015C5.60143 8.84499 5.41231 9.03794 5.17296 9.0473H3.48288C3.23734 9.04579 3.03856 8.85122 3.03662 8.61049V5.2973C3.03662 5.05771 3.2385 4.8598 3.48288 4.8598C3.72938 4.8598 3.92913 5.05771 3.92913 5.2973V8.17299H5.17296C5.41231 8.18235 5.60143 8.3753 5.60143 8.61015ZM15.1952 10.9737C16.4163 9.66188 17 8.31813 17 6.82924C17 3.09938 13.1856 0.0639648 8.5 0.0639648C3.81437 0.0639648 0 3.09938 0 6.82924C0 10.1702 3.02458 12.9695 7.10813 13.5015C7.38508 13.5584 7.76192 13.6806 7.85754 13.9112C7.94254 14.1202 7.9135 14.4431 7.88446 14.6612L7.76829 15.3695C7.73642 15.5785 7.59829 16.1931 8.51133 15.8174C9.42579 15.4431 13.4102 12.9855 15.1952 10.9737Z" fill="#D5DCEC" />
          </g>
          <defs>
            <clipPath id="clip0_1031_6186">
              <rect width="17" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="item-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
          <g clip-path="url(#clip0_1031_6191)">
            <path d="M6.13604 4.16713H7.5V8.33426H6.13604V4.16713ZM9.87881 4.16713H11.2428V8.33426H9.87881V4.16713ZM7.5 11.463H11.2428L13.6228 9.02489V1.39232H2.39326V11.463H5.45947V13.5459L7.5 11.463ZM14.988 0H14.9868V9.72535L10.9045 13.8925H7.83828L5.79775 15.9754H3.75722V13.8925H0V2.77481L1.04013 0H14.988Z" fill="#D5DCEC" />
          </g>
          <defs>
            <clipPath id="clip0_1031_6191">
              <rect width="15" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
    <div class="app-bottom-text">
      <div v-if="props.type === 'login'" class="text-white">
        {{ t('forgot_password') }}
      </div>

      <div v-if="props.type === 'login'" class="user-text">
        {{ t('no_account_yet') }}<span class="text-white">{{ t('register_account') }}</span>
      </div>
      <div v-else class="user-text">
        {{ t('have_account') }}<span class="text-white">{{ t('login') }}</span>
      </div>

      <div class="stake-text">
        {{ t('stake_hCaptcha') }} <span>{{ t('privacy_policy') }}</span> {{ t('and') }} <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-bottom {
  .divider {
    margin: 12px 0;
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    .item-svg {
      width: 70px;
      height: 40px;
      margin: 0 2.5px;
      cursor: pointer;
      flex-shrink: 0;
      border-radius: var(--tg-radius-default);
      display: flex;
      justify-content: center;
      align-items: center;
      background:var(--tg-secondary-main);
    }
  }
  &-text {
    text-align: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    line-height: 1.5;
    .text-white {
      color: var(--tg-text-white) !important;
    }
    .user-text {
      margin: var(--tg-spacing-12) 0;
    }
    .stake-text {
      font-size: var(--tg-font-size-xs);
      padding-bottom: var(--tg-font-size-lg);
    }
  }
}
</style>
