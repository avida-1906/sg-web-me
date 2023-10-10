<script setup lang='ts'>
interface Props {
  /** 标题 */
  title: string
  /** 是否展示徽章  */
  badge: boolean
  /** 最后一行 */
  lastOne?: boolean
  /** 按钮loading状态 */
  btnLoading?: boolean
  /** 是否验证 */
  verified?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lastOne: false,
  verified: false,
  badge: false,
})
const emit = defineEmits(['submit'])

const onSubmit = function () {
  emit('submit')
}
</script>

<template>
  <div class="settings-content-item" :class="{ 'not-last-one': !lastOne }">
    <div class="content-top">
      <div class="top-title">
        <span>{{ props.title }}</span>
        <span v-if="props.badge" class="badge">已验证</span>
      </div>
      <div class="top-desc">
        <slot name="top-desc" />
      </div>
    </div>
    <div class="content-mid">
      <hr>
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
        <BaseButton bg-style="secondary" size="md" class="btn-width" :loading="btnLoading" :disabled="props.verified" @click="onSubmit">
          保存
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
        padding: var(--tg-spacing-16) 0 var(--tg-spacing-10);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
    .content-btm{
      padding: var(--tg-spacing-16);
      border-top: 1px solid var(--tg-secondary-main);
      display: flex;
      align-items: center;
      justify-content: space-between;
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
</style>
