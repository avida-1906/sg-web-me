<script setup lang='ts'>
const chatStore = useChatStore()

const { openNotify } = useNotify()

const { openReceiveBonusDialog } = useDialogReceiveBonus()

const imageUrl: Ref<string[]> = ref([])
const textLength = ref(0)
const tab = ref(1)
const placeholder = '您的任何意见对我们都很重要，凡事有价值意见都将被采纳，一旦采纳将视重要程度给予不同现金奖励，欢迎您畅所欲言！'

const {
  value: feedbackText,
  errorMessage: feedbackTextError,
  validate: feedbackTextValidate,
} = useField<string>('feedbackText', (value) => {
  if (!value)
    return '请输入反馈内容'
  return ''
})

const {
  run: runFeedbackInsert,
  loading: feedbackInsertLoading,
} = useRequest(ApiMemberFeedbackInsert, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '反馈提交成功！',
    })
  },
})
const {
  run: runFeedbackList,
  data: feedbackList,
} = useRequest(ApiMemberFeedbackList)
const {
  run: runFeedbackBonusDraw,
} = useRequest(ApiMemberFeedbackBonusDraw, {
  onSuccess() {
    openNotify({
      type: 'success',
      message: '领取成功！',
    })
    runFeedbackList()
  },
})
const { run: runUpdateFeedback } = useRequest(ApiMemberFeedbackUpdate)
const { run: getTotalBonus, data: totalBonus } = useRequest(ApiMemberFeedbackBonusAll)

const amountTotal = computed(() => {
  return totalBonus.value ? +totalBonus.value : 0
  // return feedbackList?.value?.d?.reduce((total, item) => {
  //   return total + Number(item.amount)
  // }, 0) ?? 0
})

async function submitFeedback() {
  await feedbackTextValidate()
  if (!feedbackTextError.value)
    runFeedbackInsert({ images: imageUrl.value.length ? JSON.stringify(imageUrl.value) : '', description: feedbackText.value })
}

function getAmount() {
  if (+amountTotal.value > 0)
    runFeedbackBonusDraw({ feed_id: '' })
}

function textInput() {
  textLength.value = feedbackText.value?.length
}

function feedbackItemClick(item: any) {
  if (item.newest_m > 0)
    runUpdateFeedback({ id: item.id })

  chatStore.setFeedbackItem({ ...item, feed_id: item.id })
  chatStore.setFeedbackChatTrue()
}

function seeFeedback() {
  tab.value = 2
  runFeedbackList()
  getTotalBonus()
}

function openTotalBonus() {
  if (totalBonus.value && +totalBonus.value > 0)
    openReceiveBonusDialog({ totalBonus: totalBonus.value })
}

onActivated(() => {
  runFeedbackList()
  getTotalBonus()
})
</script>

<template>
  <div class="scroll-y app-feedback scrollable scroll-contain notice-scroll">
    <div class="feedback-tab-wrap">
      <div class="tab-left">
        <BaseButton
          :bg-style="tab === 1 ? 'primary' : undefined"
          :type="tab !== 1 ? 'line' : undefined"
          style="
          --tg-base-button-padding-y: var(--tg-spacing-6);
           --tg-base-button-padding-x: var(--tg-spacing-10);"
          custom-padding
          @click="tab = 1"
        >
          创建反馈
        </BaseButton>
        <BaseButton
          :bg-style="tab === 2 ? 'primary' : undefined"
          :type="tab !== 2 ? 'line' : undefined"
          style="
          --tg-base-button-padding-y: var(--tg-spacing-6);
           --tg-base-button-padding-x: var(--tg-spacing-10);"
          custom-padding
          @click="seeFeedback"
        >
          我的反馈
        </BaseButton>
      </div>
      <div class="tab-right">
        <p>{{ amountTotal }}USDT</p>
        <BaseButton
          bg-style="primary" style="
          --tg-base-button-padding-y: var(--tg-spacing-6);
           --tg-base-button-padding-x: var(--tg-spacing-10);"
          custom-padding
          :disabled="!(+amountTotal > 0)"
          @click="getAmount"
        >
          一键领取
        </BaseButton>
      </div>
    </div>
    <div class="content-wrap">
      <div v-if="tab === 1" class="create-feedback">
        <div class="text">
          <p class="label">
            反馈内容<span>（你提我改）</span>
          </p>
          <textarea
            v-model="feedbackText"
            maxlength="200"
            cols="30"
            rows="8"
            :placeholder="placeholder"
            @input="textInput"
          />
          <p class="length">
            <span class="error">{{ feedbackTextError }}</span>
            <span>{{ textLength }}/200</span>
          </p>
        </div>
        <div class="img-video">
          <p class="label">
            图片
          </p>
          <div class="file">
            <BaseUpload v-model="imageUrl" :much="5" img-type="common" />
          </div>
          <div class="tips">
            仅能上传：png/jpg格式，最多上传5张，单张最大100M
          </div>
        </div>
        <div class="rule">
          <p class="label">
            奖励规则
          </p>
          <div class="rule-text">
            我们已经设置了巨额奖金，专门收集反馈意见，以便我们优化系统和功能，给您带来更好的体验！一旦被采纳，将根据重要程度给予奖励（未采纳除外）
          </div>
        </div>
        <div class="buts">
          <BaseButton type="line" style="border-color: var(--tg-text-blue);">
            取消
          </BaseButton>
          <BaseButton
            bg-style="primary"
            :loading="feedbackInsertLoading"
            @click="submitFeedback"
          >
            提交
          </BaseButton>
        </div>
      </div>
      <div v-else class="feedback-list">
        <div
          class="total-bonus"
          @click="openTotalBonus"
        >
          <span>待领取奖金：</span>
          <span class="money">{{ totalBonus }}USDT</span>
          <BaseIcon name="chess-proms" />
        </div>
        <template v-if="feedbackList?.d?.length">
          <div
            v-for="item, index in feedbackList?.d"
            :key="index"
            class="msg-item"
            @click="feedbackItemClick(item)"
          >
            <div class="line">
              <div>
                反馈状态：<span
                  :style="{
                    color: item.state === 1
                      ? 'var(--tg-text-warn)'
                      : 'var(--tg-text-white)',
                  }"
                >
                  {{ item.state === 1 ? '处理中' : '已完成' }}
                </span>
              </div>
              <div
                class="unread"
                :style="{
                  color: item.newest_m !== 0
                    ? 'var(--tg-text-lightgrey)'
                    : 'var(--tg-text-white)',
                }"
              >
                {{ item.newest_m !== 0 ? '有消息未读' : '已读' }}
                <div v-if="item.newest_m !== 0" />
              </div>
            </div>
            <div class="line">
              <div class="text-overflow-hide">
                反馈ID: {{ item.id }}
              </div>
              <div class="text-overflow-hide color-grey">
                {{ application.timestampToTime(item.created_at * 1000) }}
              </div>
            </div>
            <div class="text-overflow-hide">
              内容: {{ item.description }}
            </div>
          </div>
        </template>
        <template v-else>
          <BaseEmpty
            description="暂无内容"
            icon="navbar-user-bet"
            style="padding-top: 100px;"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.total-bonus {
  cursor: pointer;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.5;
  margin-top: var(--tg-spacing-16);
  display: inline-block;
  .money {
    color: var(--tg-text-warn);
  }
  svg {
    margin-left: var(--tg-spacing-12);
    vertical-align: middle;
  }
}
.app-feedback {
  white-space: pre-line;
  padding: var(--tg-spacing-11) var(--tg-spacing-16);
  .feedback-tab-wrap {
    display: flex;
    justify-content: space-between;
    line-height: 28px;
    min-height:28px;
    .tab-left, .tab-right{
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tab-right{
      p:nth-child(1){
        color: var(--tg-text-green);
      }
    }
    .tab-btn{
      padding: var(--tg-spacing-6) var(--tg-spacing-10) !important;
      border-radius: 100px;
      width: 78px;
    }
  }
  .content-wrap{
    .create-feedback{
      .text, .img-video, .rule{
        .label{
          font-size: var(--tg-font-size-base);
          color: var(--tg-text-white);
          span{
            color: var(--tg-text-lightgrey);
          }
          margin-bottom: var(--tg-spacing-8);
          margin-top: var(--tg-spacing-16);
        }
        textarea{
          width: 100%;
          background: var(--tg-primary-main);
          padding: var(--tg-spacing-12);
          border-radius: var(--tg-radius-default);
          font-size: var(--tg-font-size-xs);
          color: var(--tg-text-lightgrey);
          border: var(--tg-border-width-sm) solid var(--tg-border-color-main);
          transition: var(--tg-transition);
          &:hover{
            border-color: var(--tg-border-color-deep-grey);
          }
          &:focus{
            outline: none;
          }
        }
        .length{
          width: 100%;
          color: var(--tg-text-lightgrey);
          display: flex;
          align-items: center;
          justify-content: space-between;
          .error{
            color: var(--tg-text-error);
            font-size: var(--tg-font-size-xs);
          }
        }
        // .file{
        //   width: 80px;
        //   height: 80px;
        // }
        .tips{
          margin-top: var(--tg-spacing-8);
          font-size: var(--tg-font-size-default);
          color: var(--tg-text-white);
          opacity: 0.5;
        }
        .rule-text{
          font-size: var(--tg-font-size-xs);
          line-height: 17px;
          color: var(--tg-text-white);
          opacity: 0.5;
        }
      }
      .buts{
        margin-top: 16px;
        display: flex;
        gap: var(--tg-spacing-12);
        button {
          flex: 1;
        }
      }
    }
    .feedback-list{
      color: var(--tg-text-white);
      .msg-item{
        display: flex;
        flex-direction: column;
        gap: var(--tg-spacing-12);
        padding: var(--tg-spacing-12);
        background: var(--tg-secondary-main);
        margin-top: 16px;
        border-radius: var(--tg-radius-default);
        font-size: var(--tg-font-size-default);
        cursor: pointer;
        .line{
          display: flex;
          justify-content: space-between;
        }
        .state{
          color: var(--tg-text-warn);
        }
        .unread{
          position: relative;
          div{
            width: 6px;
            height: 6px;
            border-radius: 50%;
            z-index: 1;
            background: var(--tg-primary-success);
            animation: OnlineFlash .2s ease-out;
            position: absolute;
            transform: translate(-50%,-50%);
            margin-left: -6px;
            top: 50%;
            left: 0;
          }
        }
        .text-overflow-hide{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .color-grey{
          color: var(--tg-text-lightgrey);
        }
      }
    }
  }
}
</style>
