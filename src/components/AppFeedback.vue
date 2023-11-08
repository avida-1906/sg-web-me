<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
const text = ref('')
const textLength = ref(0)
const tab = ref(1)
const placeholder = '我们已经设置了巨额奖金，专门收集反馈意见，以便我们优化系统和功能，给您带来更好的体验！一旦被采纳，将根据重要程度给予奖励（未采纳除外）'

function textInput() {
  textLength.value = text.value.length
}
</script>

<template>
  <div class="app-feedback scroll-y scrollable scroll-contain notice-scroll">
    <div class="feedback-tab-wrap">
      <div class="tab-left">
        <BaseButton
          :bg-style="tab === 1 ? 'primary' : undefined"
          :type="tab !== 1 ? 'line' : undefined"
          class="tab-btn"
          @click="tab = 1"
        >
          创建反馈
        </BaseButton>
        <BaseButton
          :bg-style="tab === 2 ? 'primary' : undefined"
          :type="tab !== 2 ? 'line' : undefined"
          class="tab-btn"
          @click="tab = 2"
        >
          我的反馈
        </BaseButton>
      </div>
      <div class="tab-right">
        <p>100.00$</p>
        <BaseButton bg-style="primary" class="tab-btn">
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
            v-model="text"
            maxlength="200"
            cols="30"
            rows="8"
            :placeholder="placeholder"
            @input="textInput"
          />
          <p class="length">
            {{ textLength }}/200
          </p>
        </div>
        <div class="img-video">
          <p class="label">
            图片
          </p>
          <div class="file">
            <BaseUpload img-type="common" />
          </div>
          <div class="tips">
            支持图片与视频上传，大小不得超过50M
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
          <BaseButton bg-style="primary">
            提交
          </BaseButton>
        </div>
      </div>
      <div v-else class="feedback-list">
        <div class="msg-item">
          <div class="line">
            <div>
              反馈状态：<span class="state">处理中</span>
            </div>
            <div class="unread color-grey">
              有未读消息
              <div />
            </div>
          </div>
          <div class="line">
            <div>
              反馈ID: 1231313
            </div>
            <div class="color-grey">
              12:12:12-10/10/2023
            </div>
          </div>
          <div class="text-overflow-hide">
            内容: 内容：问我为啥的服务问嗯是的卫计委猥琐大叔的猥琐大叔的猥琐大叔的
          </div>
        </div>
        <div class="msg-item">
          <div class="line">
            <div>
              反馈状态：<span class="state">处理中</span>
            </div>
            <div class="unread color-grey">
              有未读消息
              <div />
            </div>
          </div>
          <div class="line">
            <div>
              反馈ID: 1231313
            </div>
            <div class="color-grey">
              12:12:12-10/10/2023
            </div>
          </div>
          <div class="text-overflow-hide">
            内容: 内容：问我为啥的服务问嗯是的卫计委猥琐大叔的猥琐大叔的猥琐大叔的
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-feedback {
  white-space: pre-line;
  padding: var(--tg-spacing-11) var(--tg-spacing-16);
  .feedback-tab-wrap {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
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
          background: var(--tg-secondary-main);
          padding: var(--tg-spacing-12);
          border-radius: var(--tg-radius-default);
          font-size: var(--tg-font-size-xs);
          &:focus{
            outline: none;
          }
        }
        .length{
          width: 100%;
          text-align: right;
        }
        .file{
          width: 80px;
          height: 80px;
        }
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
