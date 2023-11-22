<script setup lang='ts'>
defineProps<{
  data: {
    ci: string
    cn: string
    ei: string
    htn: string
    atn: string
    pgid: string
    ed: number
    path: string
    date: string
    time: string
  }
}>()
</script>

<template>
  <div class="hot-event-info" @click="$router.push(data.path)">
    <div class="header">
      <div class="icon">
        <BaseImage url="" />
      </div>
      <div class="team-name">
        {{ data.cn }}
      </div>
    </div>
    <div class="content">
      <div class="team">
        <div class="icon">
          <BaseImage url="" />
        </div>
        <span>{{ data.htn }}</span>
      </div>
      <div class="time-box">
        <div class="date">
          {{ data.date }}
        </div>
        <div class="time">
          {{ data.time }}
        </div>
      </div>
      <div class="team">
        <span>{{ data.atn }}</span>
        <div class="icon">
          <BaseImage url="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.hot-event-info {
  width: 100%;
  line-height: 1.5;
  cursor: pointer;
  transition: var(--tg-transition);

  &:active {
    transform: scale(0.96);
  }

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
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

    .team {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      width: 100%;
      max-width: 113px;

      .icon {
        width: 32px;
        height: 32px;
        overflow: hidden;
      }
      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .time-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--tg-spacing-12);
    flex-shrink: 0;

    .date {
      border-radius: 0 0 var(--tg-radius-sm) var(--tg-radius-sm);
      background-color: var(--tg-primary-main);
      padding: 0 var(--tg-spacing-5);
      border: 1px solid #{rgba($color: var(--tg-text-white), $alpha: 0.12)};
    }

    .time {
      font-size: var(--tg-font-size-lg);
    }
  }
}
</style>
