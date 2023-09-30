<script setup lang='ts'>
// 123
</script>

<template>
  <div class="app-sports-bet-slip">
    <div class="header">
      <div class="fixture-name">
        <div class="status">
          滚球
        </div>
        <span>深圳市足球俱乐部 - 长春亚泰</span>
      </div>
      <BaseButton type="text" padding0>
        <BaseIcon name="uni-close" />
      </BaseButton>
    </div>
    <div class="content">
      123
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-slip {
  position: relative;
  color: var(--tg-text-lightgrey);
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--tg-primary-main);
  border-radius: var(--tg-radius-default);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);

  .header {
    position: relative;
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--tg-secondary-main);
    padding: var(--tg-spacing-8) var(--tg-spacing-12);
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;

    .fixture-name {
      display: flex;
      align-items: center;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    height: 6px;
    width: 100%;
    bottom: -4px;
    background: radial-gradient(circle, transparent, transparent 50%, var(--tg-secondary-grey) 50%, var(--tg-secondary-grey) 100%) 0px 1px/0.7rem 0.7rem repeat-x;
  }
}
</style>
