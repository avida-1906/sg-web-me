<script lang="ts" setup name="base-dialog">
interface Props {
  show: boolean
  title?: string
  icon?: string
  teleport?: boolean
  closeOnClickOverlay?: boolean
  funcCall?: boolean
  maxWidth?: number
  showButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnClickOverlay: true,
  maxWidth: 500,
})

const emit = defineEmits(['update:show', 'close', 'cancel', 'confirm'])

const { bool: _show, setTrue: setBShowTrue, setFalse: setBShowFalse } = useBoolean(false)

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

const scrollTop = ref(0)

function updateShow(value: boolean) {
  if (value) {
    scrollTop.value = document.scrollingElement?.scrollTop
                        || document.documentElement.scrollTop
                        || document.body.scrollTop
  }
  emit('update:show', value)
  if (!value) {
    setTimeout(() => {
      emit('close')
    }, 300)
  }
}

function close() {
  if (props.funcCall)
    _show.value = false
  updateShow(false)
}

function onCancel() {
  emit('cancel')
}

function onConfirm() {
  emit('confirm')
}

provide('closeDialog', close)

watch([() => props.show, () => _show.value], ([show, _show]) => {
  if (show || _show) {
    if (isSafari) {
      document.body.classList.add('tg-popup-parent--hidden--safari')
      document.body.style.top = `${-scrollTop.value}px`
    }
    else {
      document.body.classList.add('tg-popup-parent--hidden')
    }
  }
  else {
    if (isSafari) {
      document.body.classList.remove('tg-popup-parent--hidden--safari')
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop.value
    }
    else {
      document.body.classList.remove('tg-popup-parent--hidden')
    }
  }
})

onMounted(() => {
  if (props.funcCall) {
    setTimeout(() => {
      setBShowTrue()
      updateShow(true)
    }, 0)
  }
})

onUnmounted(() => {
  setBShowFalse()
})
</script>

<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition>
      <section v-if="show || _show" class="tg-base-dialog" @touchmove.stop>
        <div class="overlay" @click="closeOnClickOverlay && close()" />
        <div class="card" :style="`--tg-dialog-style-maxwidth:${maxWidth}px`">
          <div v-if="icon || title" class="header">
            <h2>
              <BaseIcon v-if="icon" :name="icon" />
              <span>{{ title }}</span>
            </h2>
            <div class="close" @click="close">
              <BaseIcon name="uni-close" />
            </div>
          </div>
          <div class="scroll-y scroll-contain">
            <div class="modal-content">
              <Suspense timeout="0">
                <slot />
                <template #fallback>
                  <div class="center dialog-loading-height">
                    <BaseLoading />
                  </div>
                </template>
              </Suspense>
            </div>
          </div>
          <div v-if="showButtons" class="footer-buttons">
            <div class="buttons">
              <BaseButton size="md" @click="onCancel">
                {{ $t('cancel') }}
              </BaseButton>
              <BaseButton bg-style="secondary" size="md" @click="onConfirm">
                {{ $t('confirm') }}
              </BaseButton>
            </div>
          </div>
          <div v-if="!icon && !title" class="close-only" @click="close">
            <BaseIcon name="uni-close" />
          </div>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<style>
:root {
  --tg-dialog-style-maxwidth: 500px;
  --tg-dialog_style-bg: var(--tg-primary-main);
}
</style>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: all .3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  .tg-base-dialog {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--tg-z-index-secondary);
    padding: var(--tg-spacing-12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-default);
    .overlay {
      position: absolute;
      left: 0;
      top: -100px;
      bottom: 0;
      right: 0;
      background: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.7)};
      touch-action: none;
      z-index: var(--tg-z-index-50);
    }
    .card {
      position: relative;
      z-index: var(--tg-z-index-secondary);
      width: 100%;
      min-width: 200px;
      max-width: var(--tg-dialog-style-maxwidth);
      max-height: calc(100% - 4em);
      border-radius: var(--tg-radius-default);
      background: var(--tg-dialog_style-bg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: var(--tg-text-white);
      .header {
        padding: var(--tg-spacing-20) var(--tg-spacing-12) var(--tg-spacing-12);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--tg-spacing-12);
        font-size: var(--tg-font-size-lg);
        touch-action: none;
        h2 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--tg-spacing-6);
          font-size: var(--tg-font-size-base);
          > span {
            font-weight: var(--tg-font-weight-semibold);
          }
        }
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .footer-buttons {
        padding:  0 var(--tg-spacing-16) var(--tg-spacing-16);
        .buttons {
          display: flex;
          gap: var(--tg-spacing-16);
          button {
            flex: 1;
          }
        }
      }
    }
    .close {
      cursor: pointer;
      font-size: var(--tg-font-size-base);
      &:hover {
        --tg-icon-color: var(--tg-text-white);
      }
    }
    .close-only {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
      padding: var(--tg-spacing-button-padding-horizontal-sm) var(--tg-spacing-button-padding-vertical-lg);
      font-size: var(--tg-font-size-base);
      cursor: pointer;
      transition: all 0.2s;
      color: var(--tg-secondary-light);
      &:hover {
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
</style>
