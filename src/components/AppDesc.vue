<script setup lang="ts">
import type { CurrencyCode } from '~/composables/useCurrencyData'

interface ITabItem {
  label: string
  link: string
}
interface Props {
  name: string
  platName: string
  pid: string
}
defineProps<Props>()

const { isMobile } = storeToRefs(useWindowStore())
const { companyData } = storeToRefs(useAppStore())
const { t } = useI18n()
const { push } = useLocalRouter()
const { query } = useRoute()
const { bool: showContent, toggle: toggleShowContent } = useBoolean(true)
const {
  widthBoundaryXs,
  appContentWidth,
} = storeToRefs(useWindowStore())
const betList = ref<any>([])
const tab = ref('1')
const {
  list,
  runAsync: runAsyncMemberBetList,
  loading: loadBet,
  // prev, next, hasMore, page,
} = useList(ApiMemberBetList, { }, { page_size: 3 })

const luckyWinner = ref('')
const tabList = [
  { value: '1', label: t('big_winner') },
  { value: '0', label: t('lucky_winner') },
  // { value: '4', label: t('description') },
]
const tagList = ref<ITabItem[]>([
  { label: t('buy_bonus_round'), link: '#' },
  { label: 'Hacksaw Gaming', link: '#' },
  { label: t('pirate'), link: '#' },
  { label: t('game_type_rec'), link: '#' },
  { label: t('sea'), link: '#' },
  { label: t('game_type_slot_short_name'), link: '#' },
  { label: t('switch_wave'), link: '#' },
])
const columns = ref<Column[]>([
  {
    title: t('ranking'),
    width: 100,
    dataIndex: 'rank',
    slot: 'rank',
    align: 'left',
  },
  {
    title: t('gamer'),
    width: 100,
    dataIndex: 'username',
    slot: 'player',
    align: 'center',
  },
  {
    title: t('date'),
    width: 150,
    dataIndex: 'created_at',
    slot: 'bet_time',
    align: 'center',
  },
  {
    title: t('menu_title_settings_bets'),
    width: 100,
    dataIndex: 'bet_amount',
    slot: 'betMoney',
    align: 'center',
  },
  {
    title: t('multiple_count'),
    width: 100,
    dataIndex: 'factor',
    slot: 'factor',
    align: 'center',
  },
  {
    title: t('sports_payment_amount'),
    width: 150,
    dataIndex: 'payAmount',
    slot: 'payAmount',
    align: 'right',
  },
])

const isXxs = computed(() => appContentWidth.value <= 478)
const isXs = computed(() => appContentWidth.value <= widthBoundaryXs.value)

function getPrefixAmount(currency_id: CurrencyCode, amount: string) {
  const name = getCurrencyConfigByCode(currency_id)?.name
  application.isVirtualCurrency(name)
  return (application.isVirtualCurrency(name) ? '' : currencyConfig[name].prefix) + amount
}

watch(() => tab.value, (newValue) => {
  runAsyncMemberBetList({
    game_code: query.code?.toString(),
    // game_code: '',
    game_class: query.type?.toString(),
    type: newValue,
  }).then(() => {
    if (newValue === '1')
      betList.value = list.value.reverse()
    else
      betList.value = list.value
  })
}, { immediate: true })

setTimeout(() => {
  runAsyncMemberBetList({
    game_code: query.code?.toString(),
    // game_code: '',
    game_class: query.type?.toString(),
    type: '0',
  }).then(() => {
    luckyWinner.value = list.value[0]?.username
  })
}, 500)
</script>

<template>
  <div
    class="app-desc home-container margin-auto"
    :style="{ padding: isMobile ? 'var(--tg-spacing-24) 3vw' : 'var(--tg-spacing-24)' }"
  >
    <div class="desc-title">
      <div class="title-left">
        <span class="game-name">{{ name }}</span>
        <span
          class="plat-name"
          @click="push(`/casino/group/provider?pid=${pid}&name=${platName}`)"
        >
          {{ platName }}
        </span>
      </div>
      <div class="title-right">
        <div v-if="!isXs" class="r-status">
          <BaseIcon name="uni-cup1" />
          <span>{{ application.numberToLocaleString(list[0]?.factor) }}x</span>
          <div v-if="luckyWinner" class="player">
            {{ luckyWinner }}
          </div>
          <VTooltip v-else placement="top">
            <div class="cursor-help">
              <BaseIcon name="uni-hidden" />
              <span>{{ t('hidden_user') }}</span>
            </div>
            <template #popper>
              <div class="tiny-menu-item-title">
                {{ t('user_turn_on_hidden') }}
              </div>
            </template>
          </VTooltip>
        </div>
        <div
          class="r-arrow"
          :class="[showContent ? 'down' : 'left']"
          @click="toggleShowContent"
        >
          <BaseIcon name="uni-arrow-down" />
        </div>
      </div>
    </div>
    <!-- 包裹过渡 -->
    <div v-show="showContent" class="wrap">
      <div class="desc-tab">
        <BaseTab
          v-model="tab"
          :list="tabList"
          :center="false"
          style="--tg-tab-style-wrap-bg-color: var(--tg-primary-main);"
        />
      </div>
      <!-- 描述内容 -->
      <div v-if="tab === '4'" class="desc-content">
        <div class="c-img" :class="{ 'float-left': !isXxs }">
          <BaseImage
            url="
            http://c.hiphotos.baidu.com/image/
            pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg"
            fit="cover"
            style="--tg-base-img-style-radius: var(--tg-radius-xs);"
          />
        </div>
        <div class="c-text">
          <div class="text-tags">
            <p><a href="#">{{ t('house_edge') }}：<span>3.78%</span></a></p>
          </div>
          <div class="text-tags">
            <p v-for="item, index in tagList" :key="index">
              <a :href="item.link">{{ item.label }}</a>
            </p>
          </div>
          <div class="text">
            <p>
              Shiver me timbers! It’s time to hoist the
              mainsail and look for treasure in this ghostly pirate-themed
              slot.
            </p>
            <p>
              The action takes place on a 5x4 grid with
              a pirate ship lurking in the background, serving up a maximum win
              of 12,500x to lucky players.
            </p>
            <p>
              With multiplier values and some quirky
              bonus features, slot fans will relish the opportunity to play the
              Cursed Seas slot at {{ companyData?.name }} Casino.
            </p>
            <p>
              The grid matrix in Cursed Seas is
              in a 5x4 format with 26 paylines on which you can form winning
              combinations by matching symbols on
              the leftmost reel to the right.
            </p>
          </div>
        </div>
      </div>
      <!-- 赢家 -->
      <div
        v-else-if="tab === '1' || tab === '0'"
        class="scroll-x winner-content"
      >
        <BaseTable
          :columns="columns"
          :data-source="betList"
          :loading="loadBet"
          :skeleton-row="3"
        >
          <template #rank="{ index }">
            <div v-if="index < 3" class="rank-icon">
              <BaseIcon :name="`uni-rank${index + 1}`" />
            </div>
            <div v-else>
              {{ index + 1 }}th
            </div>
          </template>
          <template #player="{ record }">
            <VTooltip v-if="!record.username" placement="top">
              <div class="cursor-help">
                <BaseIcon name="uni-hidden" /> <span>{{ t('hidden_user') }}</span>
              </div>
              <template #popper>
                <div class="tiny-menu-item-title">
                  {{ t('user_turn_on_hidden') }}
                </div>
              </template>
            </VTooltip>
            <div v-else class="player">
              {{ record.username }}
            </div>
          </template>
          <template #bet_time="{ record }">
            <div>
              {{ timeToDateFormat(record.created_at) }}
            </div>
          </template>
          <template #betMoney="{ record }">
            <div class="img-text-align img-text-align-center">
              <AppAmount
                :amount="getPrefixAmount(record.currency_id, record.bet_amount)"
                :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
                style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
              />
            </div>
          </template>
          <template #payAmount="{ record }">
            <div class="img-text-align img-text-align-right">
              <AppAmount
                :amount="getPrefixAmount(record.currency_id, record.pay_amount)"
                :currency-type="getCurrencyConfigByCode(record.currency_id)?.name"
                style="--tg-app-amount-font-weight:var(--tg-font-weight-normal);"
              />
            </div>
          </template>
          <template #factor="{ record: { factor } }">
            {{ `${application.numberToLocaleString(factor)}x` }}
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-desc-base-image{
  --tg-base-img-style-radius: var(--tg-radius-xs);
}
.app-desc {
  background-color: var(--tg-secondary-dark);
  color: var(--tg-text-white);
  border-radius: var(--tg-radius-md);
  margin-top: var(--tg-spacing-32);

  .desc-title {
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32.5px;

    .title-left {
      width: 100%;
      overflow: hidden;
      display: flex;
      gap: var(--tg-spacing-8);
      .game-name{
        max-width: 100%;
    display: inline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
      }

      .plat-name {
        max-width: 100%;
    display: inline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
        color: var(--tg-text-lightgrey);

        &:hover {
          color: var(--tg-text-white);
        }
      }
    }

    .title-right {
      display: flex;
      justify-content: right;
      align-items: center;

      .r-status {
        background-color: var(--tg-secondary-main);
        color: var(--tg-text-lightgrey);
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 4px;
        height: 32px;
        font-size: var(--tg-font-size-xs);
        border-radius: var(--tg-radius-3xl);
        padding: 0 var(--tg-spacing-16);
        margin-right: var(--tg-spacing-10);
        > span {
          margin: 0 var(--tg-spacing-4);
        }
      }

      .r-arrow {
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17.5px;
        cursor: pointer;
        >svg {
          transition: var(--tg-transition);
        }
        &:hover{
          --tg-icon-color:var(--tg-text-white);
        }

        &.left {
          svg {
            transform: rotate(90deg);
          }
        }
      }
      .player{
        font-size: var(--tg-font-size-default);
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
            font-weight: var(--tg-font-weight-semibold);

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
      --tg-table-even-background: var(--tg-secondary-grey);
      --tg-table-odd-background: initial;
      .rank-icon {
        display: flex;
        font-size: 21px;
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
      padding: var(--tg-spacing-16);
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
      font-weight: var(--tg-font-weight-semibold);
      white-space: nowrap;
    }
  }
  .player{
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    cursor: pointer;
    &:active{
      transform: scale(0.96);
    }
  }
}
</style>
