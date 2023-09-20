<script lang="ts" setup>
</script>

<template>
  <section class="tg-app-group-filter flex-center-bet">
    <div class="flex-center-bet left">
      <div class="flex-center-bet title">
        <BaseIcon name="uni-bars" />
        <span class="txt">筛选依据</span>
      </div>
      <div>
        <BaseCheckPop>
          <BaseButton size="md">
            <div class="btn-arrow-down">
              <span>游戏提供商</span>
              <BaseBadge :count="2" />
              <BaseIcon name="uni-arrow-down" />
            </div>
          </BaseButton>
        </BaseCheckPop>
      </div>
    </div>
    <div class="flex-center-bet right">
      <div class="title flex-center-bet">
        <BaseIcon name="uni-bars" />
        <span class="txt">排序依据</span>
      </div>
      <div>
        <BaseGameSortPop>
          <BaseButton size="md">
            <div class="btn-arrow-down">
              <span>热门</span>
              <BaseIcon name="uni-arrow-down" />
            </div>
          </BaseButton>
        </BaseGameSortPop>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flex-center-bet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tg-app-group-filter {
  width: 100%;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  line-height: 1.5;
  color: var(--tg-text-white);
  .left, .right {
    gap: var(--tg-spacing-16);

    .title {
      gap: var(--tg-spacing-input-padding-vertical);
    }
  }
}
.btn-arrow-down {
  font-size: var(--tg-font-size-default);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-8);
  .app-svg-icon {
    font-size: var(--tg-font-size-xs);
  }
}
</style>
