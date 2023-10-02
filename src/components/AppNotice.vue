<script lang="ts" setup>
const { closeRightSidebar } = useRightSidebar()

const noticeList = [{}]
</script>

<template>
  <div class="app-notice">
    <div class="notice-head">
      <div class="center head-title">
        <BaseIcon class="title-icon" name="navbar-notice" />
        <span>通知</span>
      </div>
      <BaseButton class="close-btn" type="text" size="md" @click="closeRightSidebar">
        <BaseIcon class="close-icon" name="uni-close" />
      </BaseButton>
    </div>
    <div class="notice-list">
      <div class="scrollable scroll-y scroll-contain notice-scroll">
        <template v-if="noticeList.length > 0">
          <div class="contain-top">
            <span>新推出</span>
            <span>标记全部为已读</span>
          </div>
          <div v-for="i in 12" :key="i" class="contain-item">
            <div class="center item-left">
              <BaseIcon name="navbar-wallet" class="icon-size" />
            </div>
            <div class="item-right">
              <div class="right-state">
                <span>存款待定中{{ i }}</span>
                <BaseBadge status="success" style="color: var(--tg-secondary-light);font-size: var(--tg-font-size-xs);font-weight: var(--tg-font-weight-normal);" text="1天前" />
              </div>
              <div>已登机您 100.00000000 <AppCurrencyIcon style="display: inline;vertical-align: middle;" :currency-type="EnumCurrency.BTC" /> 的存款</div>
              <div>待确认</div>
            </div>
          </div>
        </template>
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-notice {
  height: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  .notice-head{
    height: var(--tg-header-height);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--tg-secondary-dark);
    position: relative;
    box-shadow: var(--tg-box-shadow-lg);
    flex-shrink: 0;
    touch-action: none;
    // padding-right: var(--scrollbar-size);
    .head-title{
      color:var(--tg-text-white);
      display: inline-flex;
      padding: 8px 16px;
      font-size: var(--tg-font-size-default);
      .title-icon{
        font-size: var(--tg-font-size-base);
        margin-right: 8px;
      }
    }
    .close-btn{
      &:hover{
        --tg-icon-color:var(--tg-text-white);
      }
      .close-icon{
        font-size: var(--tg-font-size-xs);
      }
    }

  }
  .notice-list{
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    background: var(--tg-secondary-dark);
    .notice-scroll{
      padding: 12px 16px;
      gap: 12px;
      color: var(--tg-secondary-light);
      .contain-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--tg-font-size-default);
        font-weight: 500;
        span:hover{
          cursor: pointer;
        }
      }
      .contain-item{
        display: flex;
        height: 80px;
        min-height: 80px;
        max-height: 80px;
        width: 100%;
        overflow: hidden;
        .item-left{
          width: 60px;
          height: 100%;
          font-size: var(--tg-font-size-lg);
          --tg-icon-color:var(--tg-primary-success);
          background: var(--tg-secondary-grey);
          border-radius: var(--tg-radius-default) var(--tg-radius-none) var(--tg-radius-none) var(--tg-radius-default);
        }
        .item-right{
          display: flex;
          flex: 1;
          height: 100%;
          padding: 9px 12px;
          font-size: var(--tg-font-size-default);
          flex-direction: column;
          justify-content: space-between;
          background: var(--tg-secondary-main);
          border-radius: var(--tg-radius-none) var(--tg-radius-default) var(--tg-radius-default) var(--tg-radius-none);
          .right-state{
            display: flex;
            color:var(--tg-text-white);
            font-size: var(--tg-font-size-default);
            font-weight: 500;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
      .empty-notice{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px;
        color: var(--tg-secondary-light);
        font-size: var(--tg-font-size-default);
        .empty-text{
          color:var(--tg-text-white);
          font-weight: var(--tg-font-weight-semibold);
          margin: 36px auto 8px;
        }
      }
    }
  }
}
</style>
