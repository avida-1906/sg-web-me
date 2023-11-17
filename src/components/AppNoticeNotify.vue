<script lang="ts" setup>
import { getCurrentLanguageForBackend } from '~/modules/i18n'

interface Props {
  mode: string
}
const props = withDefaults(defineProps<Props>(), {
  mode: '',
})

enum EnumPage {tz, znx, gg, pmd, fk }

const { t } = useI18n()
const { openBetSlipDialog } = useDialogBetSlip()
const { openDepositDetailDialog } = useDialogDepositDetail()
const { openNoticeDialog } = useDialogNotice()
const { openMessageDialog } = useDialogMessage()
const { bool: loading, setBool: setLoadingBool } = useBoolean(true)
// 公告&跑马灯
const {
  data: noticeList,
  run: runMemberNoticeList,
  // loading: memberNoticeListLoading,
} = useRequest(ApiMemberNoticeList, {
  onSuccess() {

  },
})

const pageCurrent = ref(0)
const pageSize = 10
const pageTotal = 3
// const noticeList = [{}]

const isFinished = computed(() => {
  // return pageCurrent.value >= pageTotal
  return true
})
const isState = computed(() => {
  return props.mode === EnumPage[0] || props.mode === EnumPage[1]
})

function handleLoad() {
  setLoadingBool(true)
  setTimeout(() => {
    pageCurrent.value++
    setLoadingBool(false)
  }, 1200)
}
function openDialogDetail(item: any) {
  switch (props.mode) {
    case EnumPage[0]: return openBetSlipDialog({
      type: 'sports',
      data: {
        betType: 'single',
      },
    })
    case EnumPage[1]: return openDepositDetailDialog()
    case EnumPage[2]: return openNoticeDialog(item)
    case EnumPage[3]: return openMessageDialog(item)
  }
}
function pageInit() {
  switch (props.mode) {
    case EnumPage[0]: break
    case EnumPage[1]: break
    case EnumPage[2]: runMemberNoticeList({ types: '1' }) // runMemberNoticeAllList({ types: '1' })
      break
    case EnumPage[3]: runMemberNoticeList({ types: '2' }) // runMemberNoticeAllList({ types: '2' })
      break
  }
}
function getIntervalDay(start: number) {
  const time = new Date().getTime() / 1000
  // if (time > start && time < end) { return '正在进行' }
  // else {
  const hour = (time - start) / (60 * 60)
  return hour < 24
    ? `${t('time_hour_ago', { delta: Math.floor(hour) })}`
    : `${t('time_day_ago', { delta: Math.floor(hour / 24) })}`
  // }
}

pageInit()
</script>

<template>
  <BaseList
    v-if="noticeList && noticeList.length > 0"
    :finished="isFinished"
    :loading="loading"
    @load="handleLoad"
  >
    <div class="notice-scroll">
      <div v-if="isState" class="contain-top">
        <!-- <span>标记全部为已读</span> -->
        <BaseButton type="text" size="none">
          {{ t('mark_all_read') }}
        </BaseButton>
      </div>
      <div
        v-for="item of noticeList"
        :key="item.id"
        class="contain-item cursor-pointer"
        @click="openDialogDetail(item)"
      >
        <div class="center item-left">
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </div>
        <div class="item-right">
          <div class="right-state">
            <span>{{ item.title }}</span>
            <BaseBadge
              v-if="isState"
              class="state-text"
              status="success" :text="getIntervalDay(item.start_time)"
            />
            <span
              v-else
              class="state-text"
            >{{ getIntervalDay(item.start_time) }}</span>
          </div>
          <!-- 通知 -->
          <div v-if="mode === EnumPage[0]" style="white-space:normal;line-height: 1.43;">
            您含有3项赛事的复式投注赢得了100.00000000
            <AppCurrencyIcon
              style="display: inline-flex;vertical-align: middle;" currency-type="BTC"
            />
          </div>
          <!-- 站内信 -->
          <template v-else-if="mode === EnumPage[1]">
            <div>您的代存订单：2023123456789</div>
            <div>金额：10000.0000 USDT</div>
            <div>状态：成功</div>
          </template>
          <!-- 公告 -->
          <div
            v-else-if="mode === EnumPage[2]"
            style="white-space:normal;line-height: 1.43;"
            v-html="item.content[getCurrentLanguageForBackend()]"
          />
          <!-- 跑马灯 -->
          <div
            v-else
            style="white-space:normal;line-height: 1.43;"
            v-html="item.content[getCurrentLanguageForBackend()]"
          />
        </div>
      </div>
    </div>
  </BaseList>
  <div v-else class="empty-notice">
    <BaseEmpty>
      <template #icon>
        <BaseIcon font-size="62px" name="notice-empty" />
      </template>
      <template #description>
        <div class="empty-text">
          {{ t('empty_notify') }}
        </div>
        <div>{{ t('tip_show_action') }}</div>
      </template>
    </BaseEmpty>
  </div>
</template>

<style lang="scss" scoped>
.notice-scroll {
    display: flex;
    flex-direction: column;
    padding: 12px 16px 0;
    gap: 12px;
    color: var(--tg-secondary-light);

    .contain-top {
        font-size: var(--tg-font-size-default);
        font-weight: 500;
        margin: 4px 0;
        text-align: right;
        span:hover {
          cursor: pointer;
        }
    }
    .state-text{
      color: var(--tg-secondary-light);
      font-size: var(--tg-font-size-xs);
      font-weight: var(--tg-font-weight-normal);
    }
    .contain-item {
        display: flex;
        min-height: 60px;
        width: 100%;
        overflow: hidden;

        .item-left {
            width: 56px;
            min-height: 100%;
            font-size: var(--tg-font-size-lg);
            --tg-icon-color: var(--tg-primary-success);
            background: var(--tg-secondary-grey);
            border-radius:
                var(--tg-radius-default) var(--tg-radius-none) var(--tg-radius-none) var(--tg-radius-default);
        }

        .item-right {
            display: flex;
            flex: 1;
            gap: 6px;
            min-height: 100%;
            padding: 9px 12px;
            font-size: var(--tg-font-size-default);
            flex-direction: column;
            justify-content: space-between;
            background: var(--tg-secondary-main);
            border-radius:
                var(--tg-radius-none) var(--tg-radius-default) var(--tg-radius-default) var(--tg-radius-none);

            .right-state {
                display: flex;
                color: var(--tg-text-white);
                font-size: var(--tg-font-size-default);
                font-weight: 500;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}

.empty-notice {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-default);

    .empty-text {
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-semibold);
        margin: 36px auto 8px;
    }
}
</style>
