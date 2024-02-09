<script lang="ts" setup name="base-notify">
import type { notifyType } from '~/composables/useNotify'

interface Props {
  type?: notifyType
  icon?: ''
  title?: string
  message?: string
  showClose?: boolean
  funcCall?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  showClose: true,
})

const emit = defineEmits(['close', 'notifyClick'])

const iconObj = {
  set: 'uni-set',
  user: 'uni-user-blue',
  email: 'uni-green-email',
  error: 'uni-warning',
  success: 'uni-confirmed',
  insurance: 'navbar-cart',
  statistics: 'uni-trend',
  phone: 'settings-phone',
  wallet: 'navbar-wallet-notify',
}

const { t } = useI18n()
const { bool: show, setTrue: setNTrue, setFalse: setNFalse } = useBoolean(false)

const timer = ref()
const stayTime = ref(4000)
const startTime = ref(0)
const endTime = ref(0)

const iconName = computed(() => {
  if (props.icon)
    return props.icon
  else
    return iconObj[props.type]
})

const _title = computed(() => {
  if (props.title)
    return undefined
  switch (props.type) {
    case 'error':
      return t('notify_title_error')
    case 'success':
      return t('notify_title_success')
    case 'user':
      return t('welcome_guest')
    default:
      return undefined
  }
})

function close() {
  setNFalse()
  setTimeout(() => {
    emit('close', props.funcCall)
  }, 800)
}

function overMove() {
  clearTimeout(timer.value)
}

function leaveEnd() {
  startCount()
}

function startCount() {
  stayTime.value = stayTime.value - (endTime.value - startTime.value)
  startTime.value = new Date().getTime()
  timer.value = setTimeout(() => {
    close()
  }, stayTime.value)
}

function enterStart() {
  clearTimeout(timer.value)
  endTime.value = new Date().getTime()
}

function handClose() {
  close()
}

function contentClick() {
  emit('notifyClick')
}

onMounted(() => {
  setNTrue()
  startCount()
})
</script>

<template>
  <Transition name="notify-slide-fade">
    <!-- @touchmove.passive="overMove"
      @touchstart.passive="enterStart"
      @touchend="leaveEnd" -->
    <section
      v-if="show"
      class="tg-base-notify"
      @mouseover="overMove"
      @mouseleave="leaveEnd"
      @mouseenter="enterStart"
    >
      <div v-if="iconName" class="left">
        <BaseIcon :name="iconName" />
      </div>
      <div class="right" @click.stop="contentClick">
        <slot>
          <div>
            <slot name="title">
              <h3 v-if="title" class="title" v-html="title" />
              <h3 v-if="!title && _title" class="title">
                {{ _title }}
              </h3>
            </slot>
            <slot name="message">
              <p v-if="message" class="message" v-html="message" />
            </slot>
          </div>
        </slot>
      </div>
      <div v-if="showClose" class="close" @click="handClose">
        <BaseIcon name="uni-close" />
      </div>
      <div class="timer" />
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
@keyframes countDown {
    0% {
        transform: scaleX(1)
    }

    to {
        transform: scaleX(0)
    }
}
.timer {
  height: 3px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--tg-text-grey); // #557086
  transform-origin: left;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-name: countDown;
  animation-duration: 4s;
  border-bottom-left-radius: var(--tg-radius-default); //
}
.notify-slide-fade-enter-active {
  transition: all 0.15s ease-out;
  opacity: 1;
}

.notify-slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 1;
}

.notify-slide-fade-enter-from {
  transform: translateX(-200px);
  opacity: 0;
}
.notify-slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
.tg-base-notify {
  position: relative;
  font-size: var(--tg-font-size-xl);
  background: var(--tg-secondary-main);
  box-shadow: 0px 3px 5px 0px #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.35)};
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: fit-content;
  .left {
    padding: var(--tg-spacing-27) var(--tg-spacing-19);
    background: var(--tg-secondary-grey);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);
    text-align: left;
    padding: var(--tg-spacing-16) var(--tg-spacing-16) var(--tg-spacing-16) var(--tg-spacing-24);
    h3 {
      font-weight: var(--tg-font-weight-semibold);
      line-height: var(--tg-spacing-20);
    }
    p {
      line-height: var(--tg-spacing-22);
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-normal);
      padding-top: var(--tg-spacing-4);
    }
    .message{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .close {
    font-size: var(--tg-font-size-default);
    padding: 0 var(--tg-spacing-14) 0 var(--tg-spacing-8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    .timer {
      animation-play-state: paused;
    }
  }
}
</style>
