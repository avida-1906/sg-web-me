<script setup lang='ts'>
const { t } = useI18n()
const chatStore = useChatStore()
const { userLanguage } = storeToRefs(useLanguageStore())

const { openNotify } = useNotify()

const { openReceiveBonusDialog, closeReceiveBonusDialog } = useDialogReceiveBonus(() => {
  seeFeedback()
  closeReceiveBonusDialog()
})

const state: any = {
  1: t('deal_pend'),
  2: t('feedback_status_done'),
  3: t('feedback_status_done'),
}

const imageUrl: Ref<string[]> = ref([])
const tab = ref(1)
const placeholder = t('feedback_placeholder')
const tabList = [
  { label: t('create_feedback'), value: 1 },
  { label: t('user_feedback'), value: 2 },
]

const {
  value: feedbackText,
  errorMessage: feedbackTextError,
  validate: feedbackTextValidate,
  meta: feedbacTextMeta,
  handleBlur,
  resetField,
} = useField<string>('feedbackText', (value) => {
  if (!value)
    return t('input_feedback')
  return ''
})

const textLength = computed(() => feedbackText.value?.length ?? 0)

const {
  run: runFeedbackInsert,
  loading: feedbackInsertLoading,
} = useRequest(ApiMemberFeedbackInsert, {
  onSuccess() {
    feedbackText.value = ''
    imageUrl.value = []
    resetField()
    openNotify({
      type: 'success',
      message: t('success_submit_feedback'),
    })
  },
})
const {
  run: runFeedbackList,
  data: feedbackList,
} = useRequest(ApiMemberFeedbackList)
const { run: runUpdateFeedback } = useRequest(ApiMemberFeedbackUpdate)
const { run: getTotalBonus, data: totalBonus } = useRequest(ApiMemberFeedbackBonusAll)

async function submitFeedback() {
  handleBlur()
  await feedbackTextValidate()
  if (!feedbackTextError.value)
    runFeedbackInsert({ images: imageUrl.value.length ? JSON.stringify(imageUrl.value) : '', description: feedbackText.value })
}

function feedbackItemClick(item: any) {
  if (item.newest_m > 0)
    runUpdateFeedback({ id: item.id })

  chatStore.setFeedbackItem({ ...item, feed_id: item.id })
  chatStore.setFeedbackChatTrue()
}

function seeFeedback() {
  runFeedbackList()
  getTotalBonus()
}
function tabChange() {
  tab.value === 2 && seeFeedback()
}

function openTotalBonus() {
  if (totalBonus.value && +totalBonus.value > 0)
    openReceiveBonusDialog({ totalBonus: totalBonus.value })
}

function getStatusText(s: number) {
  return state[s]
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
        <BaseTab
          v-model="tab"
          :list="tabList"
          :center="false"
          line-style
          need-scroll-into-view
          @change="tabChange"
        />
      </div>
      <!-- <div class="tab-right">
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
      </div> -->
    </div>
    <div class="content-wrap">
      <div v-if="tab === 1" class="create-feedback">
        <div class="text">
          <p class="label">
            {{ t('feedback_content') }}<span class="error-text">*</span>
          </p>
          <BaseTextarea
            v-model="feedbackText" :placeholder="placeholder"
            @blur="handleBlur"
          />
          <p class="length">
            <span
              class="error"
              :class="{ show: feedbacTextMeta.touched }"
            >{{ feedbackTextError }}</span>
            <span>{{ textLength }}/200</span>
          </p>
        </div>
        <div class="img-video">
          <p class="label">
            {{ t('image') }}
          </p>
          <div class="file">
            <BaseUpload
              v-model="imageUrl"
              :much="5"
              img-type="common"
              is-webp
            />
          </div>
          <div class="tips">
            {{ t('image_upload_tip') }}
          </div>
        </div>
        <div class="rule">
          <p class="label">
            {{ t('bonus_rule') }}
          </p>
          <div class="rule-text">
            {{ t('feedback_bonus_tip') }}
          </div>
        </div>
        <div class="buts">
          <BaseButton type="line" style="border-color: var(--tg-text-blue);">
            {{ t('cancel') }}
          </BaseButton>
          <BaseButton
            bg-style="primary"
            :loading="feedbackInsertLoading"
            @click="submitFeedback"
          >
            {{ t('submit') }}
          </BaseButton>
        </div>
      </div>
      <div v-else class="feedback-list">
        <div
          class="total-bonus"
        >
          <span>{{ t('bonus_not_apply') }}：</span>
          <span class="money">{{ totalBonus }}<BaseIcon name="coin-usdt" /></span>
          <!-- <BaseIcon name="chess-proms" /> -->
          <BaseButton
            bg-style="primary" style="
          --tg-base-button-padding-y: var(--tg-spacing-6);
           --tg-base-button-padding-x: var(--tg-spacing-10);"
            custom-padding
            round
            :disabled="!totalBonus || !(+totalBonus > 0)"
            @click="openTotalBonus"
          >
            {{ t('receive') }}
          </BaseButton>
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
                {{ t('feedback_status') }}：<span
                  :style="{
                    color: item.state === 1
                      ? 'var(--tg-text-warn)'
                      : 'var(--tg-text-white)',
                  }"
                >
                  {{ getStatusText(item.state) }}
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
                {{ item.newest_m !== 0 ? t('message_has_unseen') : t('message_seen') }}
                <div v-if="item.newest_m !== 0" />
              </div>
            </div>
            <div class="line">
              <div class="text-overflow-hide">
                {{ t('feedback') }}ID: {{ item.id }}
              </div>
              <div class="text-overflow-hide color-grey">
                {{ application.timestampToTime(item.created_at * 1000, userLanguage) }}
              </div>
            </div>
            <div class="text-overflow-hide">
              {{ t('content_text') }}: {{ item.description }}
            </div>
          </div>
        </template>
        <template v-else>
          <BaseEmpty
            :description="t('no_content')"
            icon="navbar-user-bet"
            style="padding-top: 100px;"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.error-text {
  font-size: var(--tg-font-size-xl);
  color: var(--tg-text-error) !important;
  line-height: 0;
  vertical-align: middle;
}
.total-bonus {
  cursor: pointer;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  margin-top: var(--tg-spacing-16);
  display: inline-flex;
  align-items: center;
  .money {
    color: var(--tg-text-warn);
  }
  svg, button {
    margin-left: var(--tg-spacing-12);
    vertical-align: middle;
  }
  button {
    margin-left: var(--tg-spacing-12);
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
      --tg-tab-style-color: var(--tg-text-lightgrey);
      --tg-tab-style-line-active-text-color: var(--tg-text-white);
      --tg-tab-style-inner-padding-y: var(--tg-spacing-1);
      --tg-tab-style-box-padding:0;
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
            opacity: 0;
            &.show {
              opacity: 1;
            }
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
