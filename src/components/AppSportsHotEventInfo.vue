<script setup lang='ts'>
// 123
</script>

<template>
  <div class="hot-event-info">
    <div class="header">
      <div class="icon">
        <BaseImage />
      </div>
      <div class="team-name">
        英格兰超级联赛
      </div>
    </div>
    <div class="content">
      <div class="team">
        <div class="icon">
          <BaseImage />
        </div>
        <span>埃弗顿</span>
      </div>
      <div class="time-box">
        <div class="date">
          2023 | 11月16日
        </div>
        <div class="time">
          02：12
        </div>
      </div>
      <div class="team">
        <span>埃弗顿</span>
        <div class="icon">
          <BaseImage />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.hot-event-info {
  width: 100%;
  line-height: 1.5;

  .header {
    width: 100%;
    border-radius: var(--tg-radius-md) var(--tg-radius-md) 0 0;
    padding: var(--tg-spacing-6) var(--tg-spacing-16);
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-4);
    background-color: var(--tg-primary-main);

    .icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      overflow: hidden;
    }

    .team-name {
      font-size: var(--tg-font-size-default);
      font-weight: var(--tg-font-weight-semibold);
      color: var(--tg-text-white);
    }
  }

  .content {
    width: 100%;
    background-color: var(--tg-secondary-grey);
    border-radius: 0 0 var(--tg-radius-md) var(--tg-radius-md);
    padding: var(--tg-spacing-10) var(--tg-spacing-10) var(--tg-spacing-20);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--tg-font-size-xs);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    .team{
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      .icon{
        width: 32px;
        height: 32px;
        overflow: hidden;
      }
    }
  }
  .time-box{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--tg-spacing-12);
    .date{
      border-radius: 0 0 var(--tg-radius-sm) var(--tg-radius-sm);
      background-color: var(--tg-primary-main);
      padding: 0 var(--tg-spacing-5);
      border: 1px solid #{rgba($color: var(--tg-text-white), $alpha: 0.12)};
    }
    .time{
      font-size: var(--tg-font-size-lg);
    }
  }
}
</style>
