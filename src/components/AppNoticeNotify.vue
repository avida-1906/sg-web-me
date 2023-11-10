<script lang="ts" setup>
interface Props {
  mode: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: '',
})

const { openBetSlipDialog } = useDialogBetSlip()
const { openDepositDetailDialog } = useDialogDepositDetail()
const { openNoticeDialog } = useDialogNotice()
const { openMessageDialog } = useDialogMessage()
const { bool: loading, setBool: setLoadingBool } = useBoolean(false)

const pageCurrent = ref(0)
const pageSize = 10
const pageTotal = 3
const noticeList = [{}]

const isFinished = computed(() => {
  return pageCurrent.value >= pageTotal
})

function handleLoad() {
  setLoadingBool(true)
  setTimeout(() => {
    pageCurrent.value++
    setLoadingBool(false)
  }, 1200)
}
function openDialogDetail() {
  switch (props.mode) {
    case 'tz': return openBetSlipDialog({
      type: 'sports',
      data: {
        betType: 'single',
      },
    })
    case 'znx': return openDepositDetailDialog()
    case 'gg': return openNoticeDialog()
    case 'pmd': return openMessageDialog()
  }
}
</script>

<template>
  <BaseList
    v-if="noticeList.length > 0"
    :finished="isFinished"
    :loading="loading"
    @load="handleLoad"
  >
    <div class="notice-scroll">
      <div class="contain-top">
        <span>新推出</span>
        <span>标记全部为已读</span>
      </div>
      <div
        v-for="i in pageCurrent * pageSize"
        :key="i"
        class="contain-item cursor-pointer"
        @click="openDialogDetail"
      >
        <div class="center item-left">
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </div>
        <div class="item-right">
          <div class="right-state">
            <span>复式投注已结算{{ i }}</span>
            <BaseBadge
              status="success" style="color: var(--tg-secondary-light);
                    font-size: var(--tg-font-size-xs);
                    font-weight: var(--tg-font-weight-normal);" text="1天前"
            />
          </div>
          <!-- 通知 -->
          <div v-if="mode === 'tz'" style="white-space:normal;line-height: 1.43;">
            您含有3项赛事的复式投注赢得了100.00000000
            <AppCurrencyIcon
              style="display: inline-flex;vertical-align: middle;" currency-type="BTC"
            />
          </div>
          <!-- 站内信 -->
          <template v-else-if="mode === 'znx'">
            <div>您的代存订单：2023123456789</div>
            <div>金额：10000.0000 USDT</div>
            <div>状态：成功</div>
          </template>
          <!-- 公告 -->
          <div v-else-if="mode === 'gg'" style="white-space:normal;line-height: 1.43;">
            尊敬的客户：亚洲顶级真人品牌，开创行业最高奖金赛事,“百家乐争霸赛”火热进行中，
            9月16日至11月26日的每周六/周日20:00定时开赛，22场比赛，超大奖圈，百万奖金等您来拿！
          </div>
          <!-- 跑马灯 -->
          <div v-else style="white-space:normal;line-height: 1.43;">
            尊敬的客户：11月1日至11月30日，每日使用USDT进行取款，
            当日累计成功提款金额≥2,000元，点击【立即申请】即有几率获得随机幸运礼金，最高1,000元彩金！
          </div>
        </div>
      </div>
    </div>
  </BaseList>
  <div v-else class="empty-notice">
    <BaseEmpty>
      <template #icon>
        <BaseIcon font-size="62" name="notice-empty" />
      </template>
      <template #description>
        <div class="empty-text">
          暂无通知
        </div>
        <div>您的互动将在此处显示</div>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--tg-font-size-default);
        font-weight: 500;

        span:hover {
            cursor: pointer;
        }
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
