<script setup lang='ts'>
interface Props {
  /** 标题 */
  title: string
  /** 是否展示徽章  */
  badge?: boolean
  /** 最后一行 */
  lastOne?: boolean
  /** 按钮loading状态 */
  btnLoading?: boolean
  /** 是否验证 */
  verified?: boolean
  /** 按钮文字 */
  btnText?: string
  /** 依赖数据变化 disabled */
  dependsDisabled?: any[]
  showHr?: boolean
  /** 是否在dialog弹框中使用 */
  dialogBox?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lastOne: false,
  verified: false,
  badge: false,
  btnText: 'save',
  showHr: true,
})
const emit = defineEmits(['submit'])

const initDisabled = ref(Boolean(props.dependsDisabled !== undefined
&& props.dependsDisabled && props.dependsDisabled.length))
const dependsData = computed(() =>
  props.dependsDisabled ? [...props.dependsDisabled] : [])

const onSubmit = function () {
  emit('submit')
  setTimeout(() => {
    if (props.dependsDisabled && props.dependsDisabled.length)
      initDisabled.value = true
  }, 150)
}

watch(() => dependsData.value, (val, old) => {
  if (val.length && old.length) {
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== old[i]) {
        if (initDisabled.value)
          initDisabled.value = false
        break
      }
    }
  }
})
</script>

<template>
  <div
    class="settings-content-box settings-content-item"
    :class="{ 'not-last-one': !lastOne }"
  >
    <div class="content-top">
      <div class="top-title">
        <span>{{ props.title }}</span>
        <span v-if="props.badge" class="badge">{{ $t('verified') }}</span>
      </div>
      <div class="top-desc">
        <slot name="top-desc" />
      </div>
    </div>
    <div class="content-mid">
      <hr v-if="showHr">
      <div class="mid-form">
        <slot />
      </div>
    </div>
    <div class="content-btm">
      <div class="btm-left">
        <slot name="btm-left" />
      </div>
      <div class="btm-right">
        <slot name="btm-right" />
        <BaseButton
          bg-style="secondary"
          size="md"
          class="btn-width"
          :loading="btnLoading"
          :disabled="props.verified || initDisabled"
          @click="onSubmit"
        >
          {{ $t(btnText) }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style>
:root{
  --tg-app-settings-content-item-style-max-width: 420px;
}
</style>

<style lang='scss' scoped>
.settings-content-box{
  .content-btm{
    padding: var(--tg-spacing-16);
    border-top: 1px solid var(--tg-secondary-main);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .btm-left {
      line-height: 21px;
      color: var(--tg-secondary-light);
    }
    .btm-right{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      .btn-width{
        max-width: 100%;
        min-width: 12ch;
      }
    }
  }
}
  .settings-content-item{
    width: 100%;
    height: auto;
    background-color: var(--tg-primary-main);
    border-radius: .5rem;
    border: 1px solid var(--tg-secondary-main);
    padding-top: var(--tg-spacing-28);
    &.not-last-one{
      margin-bottom: var(--tg-spacing-32);
    }
    .content-top{
      padding: 0 var(--tg-spacing-24);
      .top-desc{
        margin-top: var(--tg-spacing-20);
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-normal);
        line-height: 1.5;
      }
      .top-title{
        font-size: var(--tg-font-size-lg);
        font-weight: var(--tg-font-weight-semibold);
        color: var(--tg-text-white);
        display: flex;
        align-items: center;
        gap: .5rem;
        .badge{
          font-size: var(--tg-font-size-xs);
          background-color: var(--tg-text-green);
          color: var(--tg-text-secondary-main);
          padding: 0 var(--tg-spacing-6);
          border-radius: 2em;
          line-height: 18px;
        }
      }
    }
    .content-mid{
      margin-top: var(--tg-spacing-20);
      padding: 0 var(--tg-spacing-24);
      hr{
        height: 1px;
        width: 100;
        background-color: var(--tg-secondary-main);
      }
      .mid-form{
        width: 100%;
        max-width: var(--tg-app-settings-content-item-style-max-width);
        padding: var(--tg-spacing-16) 0 var(--tg-spacing-16);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
</style>
