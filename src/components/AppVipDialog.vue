<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
const tab = ref('1')
const tabList = [
  { label: '进展程度', value: '1' },
  { label: '福利', value: '2' },
]

const percent = ref(40)
const { bool: showDialog } = useBoolean(true)
const menuInfo = ref({
  title: '铜',
  icon: 'chat-star-orange',
  list: [
    { title: '足球', icon: 'chess-sponsorship', id: 1 },
    { title: '篮球', icon: 'chess-sponsorship', id: 2 },
    { title: '网球', icon: 'chess-sponsorship', id: 3 },
    { title: '棒球', icon: 'chess-sponsorship', id: 4 },
    { title: '篮球', icon: 'chess-sponsorship', id: 5 },
    { title: '橄榄球', icon: 'chess-sponsorship', id: 6 },
  ],
})
</script>

<template>
  <div class="app-vip-dialog">
    <BaseDialog v-model:show="showDialog" icon="uni-checklist" title="VIP">
      <div class="vip-tab">
        <BaseTab v-model="tab" :list="tabList" />
      </div>
      <div class="vip-content">
        <div v-if="tab === '1'" class="vip-progress">
          <div class="vip-image">
            <BaseImage url="https://mediumrare.imgix.net/vip-modal.png?&dpr=2&format=auto&auto=format&q=50" />
          </div>
          <div class="progress-percent">
            <div class="percent-top">
              <p>您的<span>VIP</span>进度</p>
              <p>0.00%</p>
            </div>
            <div class="percent-mid">
              <BaseProgress width="100%" :percent="percent" :show-info="false" :stroke-width="14" />
            </div>
            <div class="percent-btm">
              <div>
                <BaseIcon name="chat-star-grey" /> <span>暂无级别</span>
              </div>
              <div>
                <BaseIcon name="chat-star-orange" /> <span>铜</span>
              </div>
            </div>
          </div>
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
          <div class="vip-level-column">
            <div class="">
              11
            </div>
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
      .progress-percent{
        .percent-top{
          color: var(--tg-text-white);
          font-weight: var(--tg-font-weight-semibold);
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--tg-spacing-5);
        }
        .percent-btm{
          display: flex;
          justify-content: space-between;
          margin-top: var(--tg-spacing-2);
          > div{
            display: flex;
            justify-content: center;
            align-items: center;
            > span {
              margin-left: var(--tg-spacing-3);
              color: var(--tg-text-lightgrey);
              font-weight: var(--tg-font-weight-semibold);
            }
          }
        }
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
          margin-top: 3px;
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
