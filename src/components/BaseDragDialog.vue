<script lang="ts" setup name="base-drag-dialog">
interface Props {
  type: 'trend' | 'live'
  url: string
  isLogin: globalThis.Ref<boolean>
  t: (key: string) => string
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { openLoginDialog, closeLoginDialog } = useLoginDialog()
const { openRegisterDialog, closeRegisterDialog } = useRegisterDialog()
const { bool: isFullScreen, toggle: toggleFullScreen } = useBoolean(false)

const dragRef = ref()
let posX: globalThis.Ref<number>, posY: globalThis.Ref<number>

const isTrend = computed(() => props.type === 'trend')
const isLive = computed(() => props.type === 'live')
const title = computed(() =>
  isTrend.value ? props.t('sports_live_trend') : props.t('sports_live_tv'),
)
const computedStyle = computed(() => {
  if (dragRef.value) {
    const { width, height } = dragRef.value.getBoundingClientRect()
    const maxX = window.innerWidth - width
    const maxY = window.innerHeight - height
    const right = posX.value <= 0 ? 0 : (maxX <= posX.value ? maxX : posX.value)
    const bottom = posY.value <= 0 ? 0 : (maxY <= posY.value ? maxY : posY.value)
    return {
      right: `${window.innerWidth - width - right}px`,
      bottom: `${window.innerHeight - height - bottom}px`,
    }
  }
  return {}
})

function handleLoginRegister(type: 'login' | 'register') {
  if (type === 'login') {
    closeRegisterDialog()
    openLoginDialog()
    return
  }
  closeLoginDialog()
  openRegisterDialog()
}
function handleClose() {
  emit('close')
}

onMounted(() => {
  const { x, y } = useDraggable(dragRef, {
    initialValue: {
      x: window.innerWidth - dragRef.value.width - 20,
      y: window.innerHeight - dragRef.value.height - 20,
    },
    preventDefault: true,
  })
  posX = x
  posY = y
})
</script>

<template>
  <section
    ref="dragRef" class="tg-base-drag-dialog"
    :style="{ ...computedStyle, width: isFullScreen ? '40vw' : '400px' }"
  >
    <div class="header select-none">
      <div class="title">
        <BaseIcon v-if="isTrend" name="uni-trend" />
        <BaseIcon v-else name="spt-live" />
        <span>{{ title }}</span>
      </div>
      <div class="right">
        <BaseButton v-if="isLive" type="text" @click="toggleFullScreen">
          <BaseIcon name="uni-full-screen" />
        </BaseButton>
        <BaseButton type="text" @click="handleClose">
          <BaseIcon name="uni-close" />
        </BaseButton>
      </div>
    </div>

    <div class="content">
      <template v-if="isLive">
        <div v-if="!isLogin.value" class="no-login">
          <span>{{ t('sports_live_unlogin_tip') }}。</span>
          <div class="btns">
            <BaseButton
              size="md" type="text"
              style="--tg-base-button-text-default-color:var( --tg-text-white);"
              @click="handleLoginRegister('login')"
            >
              {{ t('login') }}
            </BaseButton>
            <BaseButton
              size="md" bg-style="primary"
              @click="handleLoginRegister('register')"
            >
              {{ t('reg') }}
            </BaseButton>
          </div>
        </div>
        <template v-else>
          <div class="no-live">
            {{ t('live_start_on_event') }}。
          </div>

          <!-- <video
          autoplay controls playsinline disablepictureinpicture
          controlslist="nodownload nofullscreen" class="svelte-sbxwoq"
          src="blob:https://xxx.com/d846ec7a-4197-46bf-85a8-5b0179c8d38e"
        >
          <track kind="captions">
        </video> -->
        </template>
      </template>
    </div>

    <div class="footer">
      马罗兹桑,法比安 - 赫尔卡茨,休伯特
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-base-drag-dialog {
  touch-action: none;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  border-radius: var(--tg-radius-md);
  box-shadow: #{rgba($color: var(--tg-color-grey-rgb), $alpha: 0.2)} 0px 4px 6px -1px,
  #{rgba($color: var(--tg-color-black-rgb), $alpha: 0.12)} 0px 2px 4px -1px;
  background: var(--tg-secondary-grey);
  color: var(--tg-text-white);
  min-width: 280px;
  max-width: 90vw;
  flex-direction: column;
  z-index: var(--tg-z-index-top);
  --tg-icon-color: var(--tg-text-grey-light);

  .header {
    display: flex;
    font-weight: var(--tg-font-weight-semibold);
    white-space: nowrap;
    flex-direction: row;
    justify-content: flex-end;
    background: var(--tg-primary-main);
    border-radius: var(--tg-radius-md) var(--tg-radius-md) 0 0;
    font-size: var(--tg-font-size-default);
    touch-action: none;

    .title {
      touch-action: none;
      cursor: move;
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-button-padding-horizontal-xs);
      padding-left: var(--tg-spacing-button-padding-horizontal-sm);

      svg {
        font-size: var(--tg-font-size-base);
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    .no-live,
    .no-login {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      line-height: 1.5;
      background-color: var(--tg-text-grey-deep);
    }

    .no-login {
      flex-direction: column;
      gap: var(--tg-spacing-8);
    }
  }

  .footer {
    width: 100%;
    background: var(--tg-secondary-main);
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: var(--tg-spacing-8) var(--tg-spacing-16);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-lightgrey);
    border-radius: 0 0 var(--tg-radius-md) var(--tg-radius-md);
  }
}
</style>
