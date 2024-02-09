<script lang="ts" setup>
interface Props {
  mode: string
}
const props = withDefaults(defineProps<Props>(), {
  mode: '',
})

enum EnumPage {tz, znx, gg, pmd, fk }
const pageCurrent = ref(1)
const pageSize = 10
const pageTotal = ref(0)

const { t } = useI18n()
// 投注详情
const { openBetSlipDialog } = useDialogBetSlip()
// 存款详情
// const { openDepositDetailDialog } = useDialogDepositDetail()
// 公告
const { openNoticeDialog } = useDialogNotice()
// 站内信
const { openMessageDialog: openMessageZnxDialog } = useDialogMessage(t('site_message'))
// 跑马灯
const { openMessageDialog: openMessagePmdDialog } = useDialogMessage(t('marquee'))
const { bool: loading, setBool: setLoadingBool } = useBoolean(true)
// 公告&跑马灯
const {
  data: noticeList,
  run: runMemberNoticeList,
  // loading: memberNoticeListLoading,
} = useRequest(ApiMemberNoticeList, {
  onSuccess() {
    pageTotal.value = noticeList.value?.length ?? 0
  },
})
// 站内信
const {
  data: stationInfoList,
  run: runMemberStationInfoList,
  // loading: memberNoticeListLoading,
} = useRequest(ApiMemberStationInfoList, {
  onSuccess() {
    pageTotal.value = stationInfoList.value?.length ?? 0
  },
})
// 标记已读
const {
  run: runStationInfoDetailUpdateState,
} = useRequest(ApiMemberStationInfoDetailUpdateState, {
  onSuccess(data, params) {
    const item = stationInfoList.value?.find(item => item.id === params[0].id)
    item && (item.state = 1)
    stationInfoList.value = [...(stationInfoList.value ?? [])]
  },
})

const isFinished = computed(() => {
  return (pageCurrent.value * pageSize) >= pageTotal.value
})
const isState = computed(() => {
  return props.mode === EnumPage[0] || props.mode === EnumPage[1]
})
const getList: ComputedRef<any[] | undefined> = computed(() => {
  switch (props.mode) {
    case EnumPage[0]: return []
    case EnumPage[1]: return stationInfoList.value
    case EnumPage[2]:
    case EnumPage[3]: return noticeList.value
  }
})
const getIcon = computed(() => {
  switch (props.mode) {
    case EnumPage[0]: return 'navbar-wallet'
    case EnumPage[1]: return 'uni-notice-znx'
    case EnumPage[2]:return 'uni-notice-gg'
    case EnumPage[3]: return 'uni-notice-pmd'
    default: return ''
  }
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
    case EnumPage[1]:
      runStationInfoDetailUpdateState({ id: item.id })
      openMessageZnxDialog(item)
      return
    case EnumPage[2]: return openNoticeDialog(item)
    case EnumPage[3]: return openMessagePmdDialog(item)
  }
}
function pageInit() {
  switch (props.mode) {
    case EnumPage[0]: break
    case EnumPage[1]: runMemberStationInfoList()
      break
    case EnumPage[2]: runMemberNoticeList({ types: '1' }) // runMemberNoticeAllList({ types: '1' })
      break
    case EnumPage[3]: runMemberNoticeList({ types: '2' }) // runMemberNoticeAllList({ types: '2' })
      break
  }
}

pageInit()
</script>

<template>
  <BaseList
    v-if="getList && getList.length > 0"
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
        v-for="item of getList"
        :key="item.id"
        class="contain-item cursor-pointer"
        @click="openDialogDetail(item)"
      >
        <div class="center item-left">
          <BaseIcon :name="getIcon" />
        </div>
        <div class="item-right">
          <div class="right-state">
            <!-- <div style="white-space: break-spaces;line-height: 1.43;">
              {{ item.title }}
            </div> -->
            <BaseBadge
              v-if="isState && item.state === 2"
              class="state-text" :max="99999"
              status="success" :text="timeToFromNow(item.start_time ?? item.created_at)"
            />
            <span
              v-else
              class="state-text"
            >{{ timeToFromNow(item.start_time ?? item.created_at) }}</span>
          </div>
          <!-- 通知 -->
          <div v-if="mode === EnumPage[0]" class="content-text">
            您含有3项赛事的复式投注赢得了100.00000000
            <AppCurrencyIcon
              style="display: inline-flex;vertical-align: middle;" currency-type="BTC"
            />
          </div>
          <!-- 站内信 -->
          <template v-else-if="mode === EnumPage[1]">
            <div class="content-text">
              {{ item.content[getCurrentLanguageForBackend()] }}
            </div>
          </template>
          <!-- 公告 -->
          <div
            v-else-if="mode === EnumPage[2]"
            class="content-text"
            v-html="item.content[getCurrentLanguageForBackend()]"
          />
          <!-- 跑马灯 -->
          <div
            v-else
            class="content-text"
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
              width: 100%;
              display: flex;
              color: var(--tg-text-white);
              font-size: var(--tg-font-size-default);
              font-weight: 500;
              justify-content: space-between;
              align-items: center;
              .state-text{
                flex: 1;
                text-align: right;
              }
            }
            .content-text{
              white-space: normal;
              line-height: 1.43;
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
