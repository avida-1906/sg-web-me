<script lang="ts" setup>
const { openNoticeDialog } = useDialogNotice()
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
        @click="openNoticeDialog"
      >
        <div class="center item-left">
          <BaseIcon name="navbar-wallet" class="icon-size" />
        </div>
        <div class="item-right">
          <div class="right-state">
            <span>百家乐争霸赛{{ i }}</span>
            <span
              style="color: var(--tg-secondary-light);
                    font-size: var(--tg-font-size-xs);
                    font-weight: var(--tg-font-weight-normal);"
            >2030/10/31 13:35:19</span>
          </div>
          <div style="white-space:normal;line-height: 1.43;">
            尊敬的客户：亚洲顶级真人品牌，开创行业最高奖金赛事,“百家乐争霸赛”火热进行中，
            9月16日至11月26日的每周六/周日20:00定时开赛，22场比赛，超大奖圈，百万奖金等您来拿！
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
            gap: 6px;
            flex: 1;
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
