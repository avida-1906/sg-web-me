<script setup lang='ts'>
const { t } = useI18n()
const { vip, progress, currentLevel, nextLevel, isMaxLevel } = useVipInfo()
</script>

<template>
  <slot name="title" />
  <div class="app-vip-progress">
    <div class="percent-top">
      <slot><p>{{ t('yours') }}<span> VIP </span>{{ t('progress') }}</p></slot>
      <p class="percent">
        {{ toFixed(progress > 100 ? 100 : progress) }}%
      </p>
    </div>
    <div class="percent-mid">
      <BaseProgress
        width="100%"
        :percent="progress"
        :show-info="false"
        :stroke-width="14"
        stroke-color="var(--tg-primary-success)"
      />
    </div>
    <div class="percent-btm">
      <div>
        <BaseIcon :name="`vip${vip}`" /> <span>{{ `VIP${currentLevel?.level}` }}</span>
      </div>
      <div v-if="!isMaxLevel">
        <BaseIcon :name="`vip${nextLevel?.level}`" />
        <span style="color:var(--tg-text-white)">{{ `VIP${nextLevel?.level}` }}</span>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tg-vip-style-icon-size: var(--tg-font-size-default);
}
</style>

<style lang='scss' scoped>
.app-vip-progress{
  .percent-top{
    color: var(--tg-text-white);
    font-weight: var(--tg-font-weight-semibold);
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--tg-spacing-5);
    .percent {
      line-height: 1.5;
    }
  }
  .percent-btm{
    display: flex;
    justify-content: space-between;
    margin-top: var(--tg-spacing-5);
    > div{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--tg-vip-style-icon-size);
      > span {
        margin-left: var(--tg-spacing-6);
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
        font-size: var(--tg-font-size-base);
      }
    }
    svg {
      font-size: var(--tg-font-size-xl);
    }
  }
}
</style>

<style lang='scss' scoped>
.app-vip-progress{
  .percent-mid{
    --tg-base-progress-inner-bg: var(--tg-secondary-main);
    .m-progress-inner{
      background-color: var(--tg-secondary-main);
    }
  }
}
</style>
