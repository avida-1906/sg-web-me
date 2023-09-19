<script setup lang='ts'>
interface IVipProgressData {
  percent: number // 进度条百分比
  currentLevel: number // 当前等级
}
interface Props {
  vipProgressData?: IVipProgressData
}
const props = withDefaults(defineProps<Props>(), {
  vipProgressData: () => { // vip进度条
    return {
      percent: 60,
      currentLevel: 3,
    }
  },
})
// const emit = defineEmits(['update:modelValue'])

const tab = ref('1')
const tabList = [
  { label: '进展程度', value: '1' },
  { label: '福利', value: '2' },
]
const showContent = function () {
  console.log('点击')
}
const welfareList = [
  {
    title: '铜',
    icon: 'chat-star-green',
    contents: [
      '支持人员将按照您所选的货币发送奖金',
      '启用返水功能',
      '周度奖金',
      '月度奖金',
      'VIP Telegram 频道访问权',
    ],
  },
  {
    title: '银',
    icon: 'chat-star-grey',
    contents: [
      '支持人员将按照您所选的货币发送奖金',
      '周度和月度奖金增加',
    ],
  },
  {
    title: '金',
    icon: 'chat-star-orange',
    contents: [
      '支持人员将按照您所选的货币发送奖金',
      '周度和月度奖金增加',
    ],
  },
  {
    title: '铂金 I – III',
    icon: 'chat-star1',
    contents: [
      '支持人员将按照您所选的货币发送奖金',
      '周度和月度奖金增加',
      '14–42 天，每日奖金（充值奖金）',
    ],
  },
  {
    title: '铂金 IV – VI',
    icon: 'chat-star4',
    contents: [
      '专属 VIP 服务代表',
      'VIP 服务代表将按照您所选的货币发送奖金',
      '每日和周度奖金增加',
      '月度奖金',
    ],
  },
  {
    title: '钻石',
    icon: 'chat-diamond',
    contents: [
      'VIP 服务代表将按照您所选的货币发送奖金',
      '专属定制福利',
      '每日和周度奖金增加',
      '月度奖金',
    ],
  },

]
const { bool: showDialog } = useBoolean(true)
</script>

<template>
  <div class="app-vip-dialog scroll-y">
    <BaseDialog v-model:show="showDialog" icon="uni-checklist" title="VIP">
      <div class="vip-tab">
        <BaseTab v-model="tab" :list="tabList" />
      </div>
      <div class="scroll-y vip-content">
        <div v-if="tab === '1'" class="vip-progress">
          <div class="vip-image">
            <BaseImage url="https://mediumrare.imgix.net/vip-modal.png?&dpr=2&format=auto&auto=format&q=50" />
          </div>
          <AppVipProgress :vip-progress-data="props.vipProgressData" />
          <div class="progress-text">
            您的进度是通过您在娱乐城和体育博彩中的总投注额累积起来的。只要您的级别上升，就表示能获得更大的奖励和独家 VIP 待遇。
          </div>
          <div class="progress-tips">
            <BaseIcon name="uni-tips" />
            <p>
              所有已结算的体育投注将回报加快 3 倍的进展速度。结算为无效的赌注并不包括在内。
            </p>
          </div>
        </div>
        <div v-else-if="tab === '2'" class="vip-welfare">
          <div v-for="item, index in welfareList" :key="index" class="vip-level-column">
            <BaseCollapse :title="item.title" :icon="item.icon" @click-head="showContent()">
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
          了解更多有关成为 Stake VIP 的消息
        </a>
      </div>
    </BaseDialog>
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
