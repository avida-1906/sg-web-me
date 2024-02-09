<script setup lang='ts'>
interface IVipProgressData {
  percent: number // 进度条百分比
  currentLevel: number // 当前等级
}
interface Props {
  vipProgressData?: IVipProgressData
}

const props = withDefaults(defineProps<Props>(), {
  vipProgressData: () => {
    return {
      percent: 60,
      currentLevel: 3,
    }
  },
})

const { companyData } = storeToRefs(useAppStore())
const { t } = useI18n()

const tab = ref('1')
const tabList = [
  { label: t('progress_level'), value: '1' },
  { label: t('promo'), value: '2' },
]
const welfareList = [
  {
    title: t('copper'),
    icon: 'chat-star-bronze',
    contents: [
      t('send_currency_bonus'),
      t('turn_on_rebate'),
      t('weekly_bonus'),
      t('monthly_bonus'),
      t('vip_tg_right'),
    ],
  },
  {
    title: t('silver'),
    icon: 'chat-star-silver',
    contents: [
      t('send_currency_bonus'),
      t('week_monthly_bonus_up'),
    ],
  },
  {
    title: t('gold'),
    icon: 'chat-star-gold',
    contents: [
      t('send_currency_bonus'),
      t('week_monthly_bonus_up'),
    ],
  },
  {
    title: `${t('platinum')} I – III`,
    icon: 'chat-star-1',
    contents: [
      t('send_currency_bonus'),
      t('week_monthly_bonus_up'),
      '14–42 天，每日奖金（充值奖金）',
    ],
  },
  {
    title: `${t('platinum')} IV – VI`,
    icon: 'chat-star-4',
    contents: [
      t('dedicated_vip_servicer'),
      t('vip_send_currency_bonus'),
      t('day_week_bonus_up'),
      t('monthly_bonus'),
    ],
  },
  {
    title: t('diamond'),
    icon: 'chat-star-diamond',
    contents: [
      t('vip_send_currency_bonus'),
      t('special_promo'),
      t('day_week_bonus_up'),
      t('monthly_bonus'),
    ],
  },

]

const showContent = function () {
  console.log('点击')
}
</script>

<template>
  <div class="scroll-y app-vip-dialog">
    <div class="vip-tab">
      <BaseTab v-model="tab" :list="tabList" />
    </div>
    <div class="scroll-y vip-content">
      <div v-if="tab === '1'" class="vip-progress">
        <div class="vip-image">
          <BaseImage url="/png/vip-club/vip_modal.png" />
        </div>
        <AppVipProgress :vip-progress-data="props.vipProgressData" />
        <div class="progress-text">
          {{ t('vip_up_tip') }}
        </div>
        <div class="progress-tips">
          <BaseIcon name="uni-tips" />
          <p>
            {{ t('vip_up_tip_2') }}
          </p>
        </div>
      </div>
      <div v-else-if="tab === '2'" class="vip-welfare">
        <div v-for="item, index in welfareList" :key="index" class="vip-level-column">
          <BaseCollapse :title="item.title" :icon="item.icon" @click-show="showContent()">
            <template #content>
              <ul>
                <li v-for="c, i in item.contents" :key="i">
                  {{ c }}
                </li>
              </ul>
            </template>
          </BaseCollapse>
        </div>
      </div>
    </div>
    <div class="vip-footer-more">
      <a href="#">
        {{ t('learn_more_vip', { site: companyData?.name }) }}
      </a>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-vip-dialog{
  .vip-tab{
    max-width: 185px;
    margin: 0 auto;
  }
  .vip-content{
    padding: var(--tg-spacing-16);
    padding-top: 0;
    .vip-progress{
      .vip-image{
        width: 280px;
        height: 138px;
        margin: var(--tg-spacing-10) auto;
      }
      .progress-text{
        margin-top: var(--tg-spacing-16);
        color: var(--tg-text-lightgrey);
        line-height: 21px;
      }
      .progress-tips{
        margin-top: var(--tg-spacing-16);
        display: flex;
        background-color: var(--tg-secondary-dark);
        padding: var(--tg-spacing-12);
        gap: var(--tg-spacing-12);
        border: var(--tg-spacing-2) dashed;
        border-radius: var(--tg-radius-xs);
        color: var(--tg-text-lightgrey);
        line-height: 21px;
        > svg {
          margin-top: var(--tg-spacing-3);
        }
      }
    }
  }
  .vip-welfare{
    .vip-level-column{
      margin-top: var(--tg-spacing-12);
      ul{
        list-style-type: disc;
        padding: var(--tg-spacing-12) var(--tg-spacing-16);
        li {
          margin: var(--tg-spacing-8) var(--tg-spacing-14);
        }
      }
    }
  }
  .vip-footer-more{
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-lightgrey);
    padding: var(--tg-spacing-20) var(--tg-spacing-16);
    text-align: center;
    background-color: var(--tg-secondary-dark);
    > a:hover{
      color: var(--tg-text-white);
    }
  }
}
</style>
