<script lang="ts" setup>
import AppFeedbackChat from './AppFeedbackChat.vue'
import AppFeedback from './AppFeedback.vue'

enum EnumPage { tz, znx, gg, pmd, fk }
const { showFeedbackChat } = storeToRefs(useChatStore())
const { closeRightSidebar } = useRightSidebar()
const { t } = useI18n()

// const { isMobile } = storeToRefs(useWindowStore())

// const A = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const B = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const C = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
// const D = defineAsyncComponent(() => import('./AppNoticeNotify.vue'))
const tab = ref(EnumPage[0])
const tabList = [
  // { label: t('notification'), value: EnumPage[0] },
  { label: t('site_message'), value: EnumPage[1] },
  { label: t('notice'), value: EnumPage[2] },
  // { label: t('marquee'), value: EnumPage[3] },
  { label: t('reward_feedback'), value: EnumPage[4] },
]

const getComponent = computed(() => {
  switch (tab.value) {
    // case EnumPage[0]: return A
    case EnumPage[1]: return B
    case EnumPage[2]: return C
    // case EnumPage[3]: return D
    case EnumPage[4]: return showFeedbackChat.value ? AppFeedbackChat : AppFeedback
  }
})
</script>

<template>
  <div class="app-notice">
    <div class="notice-head">
      <div class="center head-title">
        <BaseIcon class="title-icon" name="navbar-notice" />
        <span>{{ t('message_center') }}</span>
      </div>
      <VTooltip placement="bottom">
        <div class="item hoverable">
          <BaseButton type="text" @click="closeRightSidebar">
            <BaseIcon name="uni-close" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ t('chat_close_side') }}
          </div>
        </template>
      </VTooltip>
    </div>
    <div class="tab-box">
      <BaseTab
        v-model="tab"
        :list="tabList"
        :center="false"
        full
        need-scroll-into-view
      />
    </div>
    <div class="notice-content">
      <keep-alive>
        <component :is="getComponent" :mode="tab" />
      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-notice {
  // --tg-tab-style-color: var(--tg-text-lightgrey);
  // --tg-tab-style-line-active-text-color: var(--tg-text-white);
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
  .tab-box{
    padding: var(--tg-spacing-24) var(--tg-spacing-16) 0;
    --tg-tab-style-wrap-bg-color:#1A2C38;
    --tg-tab-style-inner-padding-x: var(--tg-spacing-16);
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
