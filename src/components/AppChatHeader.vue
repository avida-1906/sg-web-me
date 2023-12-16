<script lang="ts" setup>
import type { Room } from '~/types'

const emit = defineEmits(['change', 'toggleChatWin'])

const { companyData } = storeToRefs(useAppStore())
const chatStore = useChatStore()
const { chatRoomList, room, topic, hideChat } = storeToRefs(chatStore)
const { closeRightSidebar } = useRightSidebar()
const { isGreaterThanMd } = storeToRefs(useWindowStore())
const { bool: isUp, setBool: setUBool } = useBoolean(false)

const mqttConnectSuccessEvent = useEventBus(MQTT_CONNECT_SUCCESS_BUS)

const chatWin = ref()

emit('change', room.value.value)

function chooseRoom(item: Room) {
  socketClient.removeSubscribe(topic.value)

  chatStore.setRoom(item)
  emit('change', item.value)

  setTimeout(() => {
    socketClient.addSubscribe(topic.value)
  }, 0)
}

function close() {
  closeRightSidebar()
}

function openChat() {
  chatWin.value = window.open('/chat', '_blank', 'popup,width=370,height=720')
  chatStore.toggleChat()
}

function onMqttConnectSuc() {
  setTimeout(() => {
    socketClient.addSubscribe(topic.value)
  }, 0)
}

function roomLabel(hide: () => void, item: any) {
  hide()
  chooseRoom(item)
}

function popShow() {
  setUBool(true)
}

function popHide() {
  setUBool(false)
}

watch(hideChat, (val) => {
  if (val) {
    socketClient.removeSubscribe(topic.value)
  }
  else {
    chatWin.value.close()
    setTimeout(() => {
      socketClient.addSubscribe(topic.value)
    }, 0)
  }
})

onMounted(() => {
  mqttConnectSuccessEvent.on(onMqttConnectSuc)
  setTimeout(() => {
    socketClient.addSubscribe(topic.value)
  }, 0)
})

onUnmounted(() => {
  socketClient.removeSubscribe(topic.value)
  mqttConnectSuccessEvent.off(onMqttConnectSuc)
})
</script>

<template>
  <section class="app-chat-header">
    <div>
      <VDropdown
        :distance="10"
        @show="popShow"
        @hide="popHide"
      >
        <div class="chat-room-choose">
          <BaseIcon :name="room.icon" />
          <span>{{ companyData?.name }}: {{ room.label }} </span>
          <BaseIcon class="arrow-down" :class="{ 'is-up': isUp }" name="uni-arrow-down" />
        </div>
        <template #popper="{ hide }">
          <div class="scroll-y chat-room-list dropdown-scroll-content">
            <a
              v-for="item in chatRoomList"
              :key="item.icon"
              class="item dropdown-option"
              :class="{ active: room.value === item.value }"
              @click="() => roomLabel(hide, item)"
            >
              <BaseIcon :name="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </div>
        </template>
      </VDropdown>
    </div>
    <div v-if="$route.path !== '/chat'" class="right-header">
      <VTooltip v-if="!hideChat && isGreaterThanMd" placement="bottom">
        <div class="item hoverable">
          <BaseButton type="text" @click="openChat">
            <BaseIcon name="uni-jump-page" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ $t('chat_new_window') }}
          </div>
        </template>
      </VTooltip>
      <VTooltip placement="bottom">
        <div class="hoverable item">
          <BaseButton type="text" @click="close">
            <BaseIcon name="uni-close" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ $t('chat_close_side') }}
          </div>
        </template>
      </VTooltip>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chat-room-list {
  .dropdown-option {
    color: var(--tg-popper-color-default);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding:
    var(--tg-spacing-button-padding-vertical-xs)
    var(--tg-spacing-button-padding-horizontal-xs);
    gap: var(--tg-spacing-8);
    cursor: pointer;
    &:hover {
      // background-color: var(--tg-secondary-light);
      color: var(--tg-popper-hover-color-default);
    }
    &.active {
      color: var(--tg-popper-hover-color-default);
    }
  }
}
.app-chat-header {
  width: 100%;
  height: var(--tg-header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: var(--tg-scrollbar-size);
  padding-left: var(--tg-spacing-16);
  color: var(--tg-text-white);
  .chat-room-choose {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    gap: var(--tg-spacing-8);
    .arrow-down {
      transition: none;
      &.is-up {
        color: white;
        transform: rotate(180deg);
      }
      &::hover {
        color: white;
        --tg-icon-color: white;
      }
    }
    &:active {
      transform: scale(0.96);
    }
    &:hover {
      .arrow-down {
        color: white;
      }
    }
  }
  .right-header {
    display: flex;
    align-items: center;
    .item {
      padding: var(--tg-spacing-1) var(--tg-spacing-4);
      border-radius: 50%;
      transition: all ease .25s;
      background-color: transparent;
      &:hover {
        background-color: var(--tg-secondary-deepdark);
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
}
</style>
