<script lang="ts" setup>
interface Props {
  msg: string
  title?: string
  label?: string
  copyTip?: string
}

withDefaults(defineProps<Props>(), {})

const docBtn = ref()
const timer = ref()

const { bool: isCopySuccess, setFalse: setCFalse, setTrue: setCTrue } = useBoolean(false)

const { copy } = useClipboard()

function copyClick(msg: string) {
  if (isCopySuccess.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  copy(msg)
  setCTrue()
  nextTick(() => {
    docBtn.value?.click()
  })
  timer.value = setTimeout(() => {
    setCFalse()
  }, 3000)
}
</script>

<template>
  <div class="app-copy-line wrapper">
    <div class="link">
      <span v-if="title" class="title">{{ title }}</span>
      <div class="wrap">
        <label class="stacked">
          <div class="input-wrap">
            <div class="input-content square-right-border">
              <input
                :value="msg"
                autocomplete="on"
                readonly
                class="input spacing-expanded"
                type="text"
                tooltipvisible="false"
              >
            </div>
            <div class="input-button-wrap">
              <VTooltip
                v-if="isCopySuccess"
                :triggers="['click']"
                placement="top"
                :hide-triggers="(triggers: any) => ['click']"
              >
                <a ref="docBtn" class="doc-btn">
                  <BaseButton>
                    <BaseIcon name="uni-doc" />
                  </BaseButton>
                </a>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    {{ copyTip !== undefined ? copyTip : $t('copy_success') }}！
                  </div>
                </template>
              </VTooltip>
              <BaseButton v-else @click="copyClick(msg)">
                <BaseIcon name="uni-doc" />
              </BaseButton>
            </div>
          </div>
          <span class="label-content">
            <div v-if="label" class="label-left-wrapper">{{ label }}</div>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
  --tg-icon-color: var(--tg-text-white);

  .link {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 1.5;

    .title {
      display: inline-flex;
      align-items: center;
      text-align: left;
      justify-content: flex-start;
      line-height: 2;
      color: var(--tg-text-white);
    }

    .wrap {
      display: flex;
      width: 100%;
      position: relative;

      >label {
        flex-grow: 1;
        display: inline-flex;
        flex-direction: row-reverse;
        align-items: center;
        position: relative;
      }

      label.stacked {
        flex-direction: column-reverse;
        align-items: flex-start;
      }

      .input-wrap {
        width: 100%;
        display: flex;
        flex-shrink: 0;
        box-shadow: var(--tg-box-shadow);
        border-radius: var(--tg-radius-default);

        .input-content {
          position: relative;
          flex-grow: 1;
          width: 100%;
          display: flex;

          input {
            width: 100%;
            color: var(--tg-text-white);
            background: var(--tg-secondary-main);
            border: 2px solid var(--tg-secondary-main);
            border-radius: var(--tg-radius-default);
            letter-spacing: 0;
            font-weight: var(--tg-font-weight-semibold);
            transition: all .25s;
            outline: 0;
            margin: 0;
            cursor: text;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            font-size: var(--tg-font-size-default);
            box-shadow: none;

            &:hover {
              border-color: var(--tg-text-grey);
            }
          }

          &.square-right-border input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .input.spacing-expanded {
            padding: var(--tg-spacing-7);
          }
        }

        .input-button-wrap {
          display: inline-flex;
          --tg-base-button-style-bg: var(--tg-secondary-main);
          --tg-base-button-style-bg-hover: var(--tg-text-grey);
          a.doc-btn {
            display: block;
            height: 100%;
          }
          button:last-child {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            padding-right: 16px;
          }
          button {
            height: 100%;
          }
        }
      }

      .label-content {
        display: inline-flex;
        align-items: center;
        font-size: var(--tg-font-size-default);
        font-weight: var(--tg-font-weight-semibold);
        color: var(--tg-secondary-light);
        transition: all 0.2s;
        letter-spacing: 0;
        padding: 0 0 var(--spacing-0-25);
        justify-content: space-between;

        .label-left-wrapper {
          display: inline-flex;
          width: 100%;
          line-height: 14px;
          padding-bottom: 4px;
        }
      }
    }
  }
}
</style>
