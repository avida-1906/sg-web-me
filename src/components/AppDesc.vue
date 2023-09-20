<script setup lang="ts">
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])

// 内容展开
const { bool: showContent, toggle } = useBoolean(true)

const tab = ref('4')
const tabList = [
  { value: '1', label: '大赢家' },
  { value: '2', label: '幸运赢家' },
  { value: '3', label: '挑战' },
  { value: '4', label: '描述' },
]
interface ITabItem {
  label: string
  link: string
}
// 标签
const tagList = ref<ITabItem[]>([
  { label: '购买奖励回合', link: '#' },
  { label: 'Hacksaw Gaming', link: '#' },
  { label: '海盗', link: '#' },
  { label: '推荐游戏', link: '#' },
  { label: '海洋', link: '#' },
  { label: '老虎机', link: '#' },
  { label: '切换波动性', link: '#' },
])

interface Column {
  title?: string
  width?: number | string
  dataIndex: string
  slot?: string
  align?: 'left' | 'center' | 'right'
}
// 大赢家-幸运赢家 head
const columns = ref<Column[]>([
  {
    title: '排名',
    width: 100,
    dataIndex: 'rank',
    slot: 'rank',
    align: 'left',
  },
  {
    title: '玩家',
    width: 100,
    dataIndex: 'player',
    slot: 'player',
    align: 'center',
  },
  {
    title: '日期',
    width: 150,
    dataIndex: 'date',
    slot: 'date',
    align: 'center',
  },
  {
    title: '投注',
    width: 100,
    dataIndex: 'bet',
    slot: 'bet',
    align: 'center',
  },
  {
    title: '乘数',
    width: 100,
    dataIndex: 'multiple',
    slot: 'multiple',
    align: 'center',
  },
  {
    title: '支付额',
    width: 150,
    dataIndex: 'payAmount',
    slot: 'payAmount',
    align: 'right',
  },
])

const { bool: loading, setFalse } = useBoolean(true)
const tableData: any = ref([])
onMounted(() => {
  setTimeout(() => {
    tableData.value = [
      {
        rank: 'uni-rank1',
        player: 'zhangsan',
        date: '2023-10-1',
        bet: '0.00000000',
        multiple: '66,666x',
        payAmount: '257.00000000',
        currencyType: EnumCurrency.BTC,
      },
      {
        rank: 'uni-rank2',
        player: 'lisi',
        date: '2023-10-1',
        bet: '0.00000000',
        multiple: '66,666x',
        payAmount: '257.00000000',
        currencyType: EnumCurrency.BTC,
      },
      {
        rank: 'uni-rank3',
        player: 'wangwu',
        date: '2023-10-1',
        bet: '0.00000000',
        multiple: '66,666x',
        payAmount: '257.00000000',
        currencyType: EnumCurrency.BTC,
      },
    ]
    setFalse()
  }, 3000)
})

const {
  isMobile,
} = storeToRefs(useWindowStore())
</script>

<template>
  <div class="app-desc home-container margin-auto">
    <div class="desc-title">
      <div class="title-left">
        Goat Getter <span class="l-start-gm"><a href="#">Push Gaming</a></span>
      </div>
      <div class="title-right">
        <div v-if="!isMobile" class="r-status">
          <BaseIcon name="uni-cup1" />
          66,666.00x
          <VMenu placement="top">
            <div class="cursor-help">
              <BaseIcon name="uni-hidden" />
              <span>隐身</span>
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                此玩家启用了私密功能
              </div>
            </template>
          </VMenu>
        </div>
        <div class="r-arrow" :class="[showContent ? 'down' : 'left']" @click="toggle">
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
    </div>
    <!-- 包裹过渡 -->
    <div v-show="showContent" class="wrap">
      <div class="desc-tab">
        <BaseTab v-model="tab" :list="tabList" style="--tg-tab-style-wrap-bg-color: var(--tg-primary-main);" />
      </div>
      <!-- 描述内容 -->
      <div v-if="tab === '4'" class="desc-content">
        <div class="c-img" :class="{ 'float-left': !isMobile }">
          <BaseImage
            url="http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg"
            fit="cover"
            style="--tg-base-img-style-radius: var(--tg-radius-xs);"
          />
        </div>
        <div class="c-text">
          <div class="text-tags">
            <p><a href="#">庄稼优势：<span>3.78%</span></a></p>
          </div>
          <div class="text-tags">
            <p v-for="item, index in tagList" :key="index">
              <a :href="item.link">{{ item.label }}</a>
            </p>
          </div>
          <div class="text">
            <p>
              Shiver me timbers! It’s time to hoist the mainsail and look for treasure in this ghostly pirate-themed
              slot.
            </p>
            <p>
              The action takes place on a 5x4 grid with a pirate ship lurking in the background, serving up a maximum win
              of 12,500x to lucky players.
            </p>
            <p>
              With multiplier values and some quirky bonus features, slot fans will relish the opportunity to play the
              Cursed Seas slot at Stake Casino.
            </p>
            <p>
              The grid matrix in Cursed Seas is in a 5x4 format with 26 paylines on which you can form winning
              combinations by matching symbols on the leftmost reel to the right.
            </p>
          </div>
        </div>
      </div>
      <!-- 赢家 -->
      <div v-else-if="tab === '1' || tab === '2'" class="scroll-x winner-content">
        <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
          <template #rank="{ record }">
            <div class="rank-icon">
              <BaseIcon :name="record.rank" />
            </div>
          </template>
          <template #player>
            <VMenu placement="top">
              <div class="cursor-help">
                <BaseIcon name="uni-hidden" /> <span>隐身</span>
              </div>
              <template #popper>
                <div class="tiny-menu-item-title">
                  此玩家启用了私密功能
                </div>
              </template>
            </VMenu>
          </template>
          <template #bet="{ record }">
            <div class="img-text-align img-text-align-center">
              <AppAmount :amount="record.bet" :currency-type="record.currencyType" />
            </div>
          </template>
          <template #payAmount="{ record }">
            <div class="img-text-align img-text-align-right">
              <AppAmount :amount="record.payAmount" :currency-type="record.currencyType" />
            </div>
          </template>
        </BaseTable>
      </div>
      <!-- 挑战 -->
      <div v-else-if="tab === '3'" class="challenge-content">
        <BaseEmpty description="暂无数据" icon="navbar-user-bet" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-desc {
  background-color: var(--tg-secondary-dark);
  color: var(--tg-text-white);
  padding: var(--tg-spacing-24);
  border-radius: var(--tg-radius-default);
  margin-top: var(--tg-spacing-32);

  .desc-title {
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-left {

      .l-start-gm {
        color: var(--tg-text-grey);

        &:hover {
          color: var(--tg-text-white);
        }
      }
    }

    .title-right {
      display: flex;
      justify-content: right;
      align-items: center;
      max-width: 200px;

      .r-status {
        background-color: var(--tg-secondary-main);
        color: var(--tg-text-lightgrey);
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 168px;
        height: 32px;
        font-size: var(--tg-font-size-xs);
        border-radius: var(--tg-radius-3xl);
        padding: 0 var(--tg-spacing-16);
        margin-right: var(--tg-spacing-10);
      }

      .r-arrow {
        font-size: var(--tg-font-size-xs);

        cursor: pointer;

        >svg {
          transition: all 200ms linear;
        }

        &.left {
          svg {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  .wrap {
    animation: down 0.2s linear;
    overflow: hidden;

    @keyframes down {
      0% {
        transform: translateY(-10px);
        opacity: 0;
      }

      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }

    .desc-tab {
      max-width: 360px;
      margin-top: var(--tg-spacing-12);
    }

    .desc-content {
      margin-top: var(--tg-spacing-16);

      .c-img {
        width: 150px;
        height: 200px;

        &.float-left {
          float: left;
          margin-right: var(--tg-spacing-16);
        }

        margin: 0 auto var(--tg-spacing-20);
      }

      .c-text {
        .text-tags {
          display: flex;
          flex-wrap: wrap;

          p {
            background-color: var(--tg-secondary-main);
            color: var(--tg-text-lightgrey);
            padding: var(--tg-spacing-2) var(--tg-spacing-8);
            margin: var(--tg-spacing-8) var(--tg-spacing-8) 0 0;
            border-radius: var(--tg-radius-lg);

            a:hover {
              color: var(--tg-text-white);
            }

            span {
              color: var(--tg-text-white);
            }
          }

          &:nth-child(1) {
            font-size: var(--tg-font-size-xs);

            p {
              margin-top: 0;
            }
          }

          &:nth-child(2) {
            margin: var(--tg-spacing-8) 0 var(--tg-spacing-20);
            font-size: var(--tg-font-size-default);
            font-weight: var(--tg-font-weight-semibold);
          }
        }
      }

      .text {
        p {
          color: var(--tg-text-lightgrey);
          margin-bottom: var(--tg-spacing-12);
          line-height: var(--tg-spacing-24);
        }
      }
    }

    .winner-content {
      margin-top: var(--tg-spacing-12);

      .rank-icon {
        >svg {
          font-size: var(--tg-font-size-xl);
        }
      }

      .img-text-align {
        display: flex;
        align-items: center;

        >svg {
          margin: 0 var(--tg-spacing-4);
        }
      }

      .img-text-align-center {
        justify-content: center;
      }

      .img-text-align-right {
        justify-content: right;
      }
    }

    .challenge-content {
      margin-top: var(--tg-spacing-12);
    }
  }

  .cursor-help {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: help;
    span {
      font-size: var(--tg-font-size-default);
      margin-left: var(--tg-spacing-4);
    }
  }
}
</style>
