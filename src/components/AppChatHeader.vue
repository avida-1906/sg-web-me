<script lang="ts" setup>
interface Room {
  icon: string
  label: string
  value: string
}

const { closeRightSidebar } = useRightSidebar()

const chatRoomList = reactive<Array<Room>>([
  { icon: 'cn', label: '中文', value: 'cn' },
  { icon: 'vn', label: 'Tiếng Việt', value: 'vn' },
  { icon: 'kr', label: '한국어', value: 'kr' },
  { icon: 'br', label: 'Português', value: 'br' },
  { icon: 'gb', label: 'English', value: 'gb' },
  { icon: 'in', label: 'हिन्दी', value: 'in' },
])
const room = ref(chatRoomList[0])

function chooseRoom(item: Room) {
  room.value = item
}

function close() {
  closeRightSidebar()
}

function openChat() {
  window.open('/chat', '_blank', 'popup,width=370,height=720')
}
</script>

<template>
  <section class="app-chat-header">
    <div>
      <VDropdown
        :distance="14"
      >
        <div class="chat-room-choose">
          <BaseIcon :name="room.icon" />
          <span>SFake: {{ room.label }} </span>
          <BaseIcon class="arrow-down" name="uni-arrow-down" />
        </div>
        <template #popper="{ hide }">
          <div class="scroll-y chat-room-list dropdown-scroll-content">
            <a
              v-for="item in chatRoomList"
              :key="item.icon"
              class="item dropdown-option"
              :class="{ active: room.value === item.value }"
              @click="hide();chooseRoom(item)"
            >
              <BaseIcon :name="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </div>
        </template>
      </VDropdown>
    </div>
    <div v-if="$route.path !== '/chat'" class="right-header">
      <VTooltip placement="bottom">
        <div class="item hoverable">
          <BaseButton type="text" @click="openChat">
            <BaseIcon name="uni-jump-page" />
          </BaseButton>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            弹出式聊天室
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
            折叠侧边栏
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
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
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
      transform: scale(0.8);
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
