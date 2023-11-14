<script lang="ts" setup>
import AppFeedbackChat from './AppFeedbackChat.vue'
import AppFeedback from './AppFeedback.vue'

const { showFeedbackChat } = storeToRefs(useChatStore())

const { closeRightSidebar } = useRightSidebar()

const { isMobile } = storeToRefs(useWindowStore())

const A = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const B = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const C = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const D = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const tab = ref('tz')
const tabList = [
  { label: '通知', value: 'tz' },
  { label: '站内信', value: 'znx' },
  { label: '公告', value: 'gg' },
  { label: '跑马灯', value: 'pmd' },
  { label: '有奖反馈', value: 'fk' },
]

const getComponent = computed(() => {
  switch (tab.value) {
    case 'tz': return A
    case 'znx': return B
    case 'gg': return C
    case 'pmd': return D
    case 'fk': return showFeedbackChat.value ? AppFeedbackChat : AppFeedback
  }
})
</script>

<template>
  <div class="app-notice">
    <div class="notice-head">
      <div class="center head-title">
        <BaseIcon class="title-icon" name="navbar-notice" />
        <span>消息中心</span>
      </div>
      <VTooltip placement="bottom">
        <div class="item hoverable">
          <BaseButton type="text" @click="closeRightSidebar">
            <BaseIcon name="uni-close" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            折叠侧边栏
          </div>
        </template>
      </VTooltip>
    </div>
    <BaseTab
      v-model="tab"
      :list="tabList"
      :center="false"
      style="padding-top: var(--tg-spacing-8);"
      line-style
      :full="isMobile"
      need-scroll-into-view
    />
    <div class="notice-content">
      <keep-alive>
        <component :is="getComponent" :mode="tab" />
      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-notice {
  --tg-tab-style-color: var(--tg-text-lightgrey);
  --tg-tab-style-line-active-text-color: var(--tg-text-white);
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
    box-shadow: var(--tg-header-shadow);
    flex-shrink: 0;
    touch-action: none;
    .head-title{
      color:var(--tg-text-white);
      display: inline-flex;
      padding: var(--tg-spacing-8) var(--tg-spacing-16);
      font-size: var(--tg-font-size-default);
      > span {
        font-weight: var(--tg-font-weight-semibold);
      }
      .title-icon{
        font-size: var(--tg-font-size-base);
        margin-right: var(--tg-spacing-8);
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
    .hoverable {
      padding: var(--tg-spacing-1) var(--tg-spacing-4);
      border-radius: 50%;
      transition: var(--tg-transition);
      background-color: transparent;
      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
  .notice-content{
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    background: var(--tg-secondary-dark);
  }
}
</style>
