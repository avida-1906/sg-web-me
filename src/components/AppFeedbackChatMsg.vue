<script lang="ts" setup>
interface Props {
  message: {
    images?: string
    description?: string
    content: string
    created_at: number
    feed_id: string
    uid: string
    id: string
  }

}

const props = defineProps<Props>()

const { userInfo } = storeToRefs(useAppStore())

const { bool: showFixedImage, setTrue: setFITrue } = useBoolean(false)

const curImage = ref('')

const isOwn = computed(() => props.message.uid === userInfo.value?.uid)

const messageImages = computed(() =>
  props.message.images && props.message.images.length ? JSON.parse(props.message.images) : [])

function seeImage(s: string) {
  curImage.value = s
  setFITrue()
}
</script>

<template>
  <div class="app-feedback-chat-msg" :class="{ 'is-own': isOwn }">
    <!-- <div class="avatar">
      <BaseImage url="/png/avatar.png" />
    </div> -->
    <div class="content" :class="{ 'is-own': isOwn }">
      <div
        v-if="!isOwn"
        class="name"
      >
        {{ $t('official_service') }}
      </div>
      <slot>
        <div class="text message">
          <span>{{ message.content }}</span>
          <div
            v-if="messageImages.length"
            class="message-images"
            :class="[
              `images-num-${messageImages.length}`,
              messageImages.length > 2 ? 'images-num-more-than-3' : '',
            ]"
          >
            <BaseImage
              v-for="item in messageImages"
              :key="item"
              :url="item"
              is-network
              @click="seeImage(item)"
            />
          </div>
        </div>
      </slot>
    </div>
  </div>
  <BaseDialog v-model:show="showFixedImage" teleport>
    <BaseImage is-network :url="curImage" />
  </BaseDialog>
</template>

<style lang="scss" scoped>
.app-feedback-chat-msg {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--tg-spacing-8);
  &.is-own {
    flex-direction: row-reverse;
  }
  .avatar {
    width: var(--tg-spacing-32);
    height: var(--tg-spacing-32);
    border-radius: 50%;
    overflow: hidden;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 80%;
    &.is-own {
      flex-direction: row-reverse;
    }
    .name {
      font-size: var(--tg-font-size-xs);
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-grey-secondary);
      margin-bottom: var(--tg-spacing-4);
    }
    .message {
      &.text {
        border-radius: var(--tg-radius-md);
        background: var(--tg-text-white);
        padding: var(--tg-spacing-12);
        font-size: var(--tg-font-size-default);
        font-weight: var(--tg-font-weight-semibold);
        color: var(--tg-text-black-secondary);
        line-height: var(--tg-spacing-20);
        text-align: left;
        white-space: initial;
      }
      .message-images {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 2%;
        >* {
          cursor: pointer;
          width: 76px;
          margin-top: 8px;
          aspect-ratio: 1/1;
        }
        // &.images-num-1 > * {
        //   width: 100%;
        // }
        // &.images-num-2 > * {
        //   width: 48%;
        // }
        // &.images-num-more-than-3 > * {
        //   width: 32%;
        // }
      }
    }
  }
}
</style>
