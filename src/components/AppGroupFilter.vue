<script lang="ts" setup>
const groupFilterOuter = ref()
const { appContentWidth } = storeToRefs(useWindowStore())
</script>

<template>
  <section ref="groupFilterOuter" class="tg-app-group-filter flex-center-bet" :class="{ 'less-than-700': appContentWidth < 700 }">
    <div class="flex-center-bet left">
      <div class="flex-center-bet title">
        <BaseIcon name="uni-bars" />
        <span class="txt">{{ $t('casino_filter_label') }}</span>
      </div>
      <div>
        <BaseCheckPop>
          <BaseButton size="md">
            <div class="btn-arrow-down">
              <span>{{ $t('casino_provider') }}</span>
              <BaseBadge :count="2" mode="active" />
              <BaseIcon name="uni-arrow-down" />
            </div>
          </BaseButton>
        </BaseCheckPop>
      </div>
    </div>
    <div class="flex-center-bet right">
      <div class="title flex-center-bet">
        <BaseIcon name="uni-bars" />
        <span class="txt">{{ $t('casino_filter_label_sort') }}</span>
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
  &.less-than-700 {
    .title {
      display: none;
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
