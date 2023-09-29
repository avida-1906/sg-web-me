<script lang="ts" setup>
const { closeRightSidebar } = useRightSidebar()
// interface Props {

// }

// withDefaults(defineProps<Props>(), {})
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
      <div class="scrollY notice-scroll">
        <div class="empty-notice">
          <div class="empty-list">
            <div class="large-icon">
              <BaseIcon name="notice-empty" />
            </div>
            <div class="empty-text">
              暂无通知
            </div>
            <div>您的互动将在此处显示</div>
          </div>
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
  word-wrap: break-word;
  .notice-head{
    height: var(--tg-header-height);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--tg-secondary-dark);
    // z-index: 2;
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
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 12px 16px;
      overflow-x: hidden;
      overscroll-behavior: contain;
      gap: 12px;
      .empty-notice{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .empty-list{
        padding: 16px;
        color: var(--tg-secondary-light);
        flex-direction: column;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 8px 0;
        font-size: var(--tg-font-size-default);
        .large-icon{
          font-size: 3.75rem;
          margin-bottom: 24px;
        }
        .empty-text{
          color:var(--tg-text-white);
          font-weight: var(--tg-font-weight-semibold);
        }
      }
    }
  }
}
</style>
